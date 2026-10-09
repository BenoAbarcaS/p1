declare module 'page-flip' {
  interface FlipEvent {
    data: number;
  }

  interface FlipSettings {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    autoSize?: boolean;
    showCover?: boolean;
    usePortrait?: boolean;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: FlipSettings);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    on(event: 'flip', callback: (event: FlipEvent) => void): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    getCurrentPageIndex(): number;
    destroy(): void;
  }

  const pageFlip: { PageFlip: typeof PageFlip };
  export default pageFlip;
}