import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles, issues, socialPosts, videos } from './demo';
import type { Article, Issue } from './demo';
import { isSanityConfigured, sanityClient } from './sanity';
import { withBasePath } from './paths';

const localIssuePdfDirectory = fileURLToPath(new URL('../../public/ediciones/', import.meta.url));

function withLocalIssuePdfs(issueList: Issue[]): Issue[] {
  return issueList.map((issue) => {
    if (issue.pdfUrl) return issue;

    const filename = `${issue.slug}.pdf`;
    return existsSync(join(localIssuePdfDirectory, filename))
      ? { ...issue, pdfUrl: withBasePath(`/ediciones/${encodeURIComponent(filename)}`) }
      : issue;
  });
}

export async function getArticles(): Promise<Article[]> {
  if (!isSanityConfigured()) {
    return articles;
  }

  try {
    const articleData = await sanityClient.fetch(`*[_type == "article" && status == "published"]|order(publishedAt desc){
      title,
      "slug": slug.current,
      subtitle,
      excerpt,
      "category": category->slug.current,
      "categoryName": category->name,
      "image": image.asset->url,
      "author": author->name,
      "authorSlug": author->slug.current,
      publishedAt,
      updatedAt,
      readingTime,
      "type": coalesce(type, "Artículo"),
      body[]{..., _type == "image" => {..., "asset": asset->{url}}}
    }`);

    return articleData?.length ? articleData : articles;
  } catch {
    return articles;
  }
}

export async function getIssues(): Promise<Issue[]> {
  if (!isSanityConfigured()) {
    return withLocalIssuePdfs(issues);
  }

  try {
    const issueData = await sanityClient.fetch(`*[_type == "issue" && status == "published"]|order(publishedAt desc){
      title,
      "slug": slug.current,
      number,
      "cover": cover.asset->url,
      "publishDate": publishedAt,
      description,
      summary,
      body,
      "pdfUrl": coalesce(pdf.asset->url, pdfUrl)
    }`);

    return withLocalIssuePdfs(issueData?.length ? issueData : issues);
  } catch {
    return withLocalIssuePdfs(issues);
  }
}

export async function getEditorialHome() {
  if (!isSanityConfigured()) {
    return {
      articles,
      issues,
      videos,
      socialPosts,
    };
  }

  try {
    const [articleData, issueData, videoData, socialData] = await Promise.all([
      sanityClient.fetch(`*[_type == "article"]|order(publishedAt desc)[0..5]{ title, slug, subtitle, excerpt, category->{name, slug}, image, author->{name, slug}, publishedAt, readingTime, type }`),
      sanityClient.fetch(`*[_type == "issue"]|order(publishedAt desc)[0..3]{ title, slug, number, cover, publishedAt, description, summary }`),
      sanityClient.fetch(`*[_type == "video"]|order(publishedAt desc)[0..3]{ title, "slug": slug.current, description, youtubeUrl, "thumbnail": thumbnail.asset->url, publishedAt, duration }`),
      sanityClient.fetch(`*[_type == "socialPost"]|order(publishedAt desc)[0..3]{ title, description, image, alt, platform, href, publishedAt }`),
    ]);

    return {
      articles: articleData ?? articles,
      issues: issueData ?? issues,
      videos: videoData ?? videos,
      socialPosts: socialData ?? socialPosts,
    };
  } catch {
    return {
      articles,
      issues,
      videos,
      socialPosts,
    };
  }
}
