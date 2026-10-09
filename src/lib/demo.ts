export type Category = {
  name: string;
  slug: string;
  description: string;
};

export type Author = {
  name: string;
  slug: string;
  role: string;
  bio: string;
  image: string;
};

export type Article = {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  authorSlug: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  body?: unknown[];
  categoryName?: string;
  featured?: boolean;
  type: 'Artículo' | 'Ensayo' | 'Reportaje';
};

export type Issue = {
  title: string;
  slug: string;
  number: string;
  cover: string;
  publishDate: string;
  description: string;
  summary: string;
  body?: string;
  pdfUrl?: string;
};

export type Video = {
  title: string;
  slug: string;
  description: string;
  youtubeId?: string;
  youtubeUrl?: string;
  thumbnail?: string;
  publishedAt: string;
  duration: string;
  featured?: boolean;
};

export function getYouTubeVideoId(video: Pick<Video, 'youtubeId' | 'youtubeUrl'>) {
  if (video.youtubeId) {
    return video.youtubeId;
  }

  if (!video.youtubeUrl) {
    return undefined;
  }

  try {
    const url = new URL(video.youtubeUrl);
    const host = url.hostname.replace(/^www\./, '');
    const pathParts = url.pathname.split('/').filter(Boolean);
    const videoId = host === 'youtu.be'
      ? pathParts[0]
      : host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com'
        ? url.pathname === '/watch'
          ? url.searchParams.get('v') ?? undefined
          : ['embed', 'shorts', 'live'].includes(pathParts[0] ?? '')
            ? pathParts[1]
            : undefined
        : undefined;

    return videoId && /^[\w-]{11}$/.test(videoId) ? videoId : undefined;
  } catch {
    return undefined;
  }
}

export function getYouTubeThumbnail(video: Pick<Video, 'youtubeId' | 'youtubeUrl' | 'thumbnail'>) {
  const videoId = getYouTubeVideoId(video);
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : video.thumbnail ?? '';
}

export function getYouTubeVideoUrl(video: Pick<Video, 'youtubeId' | 'youtubeUrl'>) {
  const videoId = getYouTubeVideoId(video);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : video.youtubeUrl;
}

export type SocialPost = {
  title: string;
  description: string;
  image: string;
  alt: string;
  platform: 'Instagram' | 'YouTube';
  href: string;
  publishedAt: string;
  featured?: boolean;
};

export const siteConfig = {
  name: 'Revista Praxis',
  tagline: 'Instrumento teórico y político del proletariado.',
  description:
    'Plataforma editorial para revista impresa y digital con artículos, ensayos, reportajes, vídeos y contenido social.',
  email: 'redaccion@revistapraxis.com',
  phone: '+56 9 8888 8888',
  location: 'Valparaíso, Chile',
  socialLinks: {
    instagram: 'https://instagram.com/mpmr_bp',
    youtube: 'https://youtube.com/@mpmr_bp',
    x: 'https://x.com/mpmr_bp',
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Revista', href: '/revista' },
    { label: 'Artículos', href: '/articulos' },
    { label: 'Vídeos', href: '/videos' },
    { label: 'Instagram', href: '/#redes' },
    { label: 'Nosotros', href: '/nosotros' },
  ],
};

export const categories: Category[] = [
  { name: 'Política', slug: 'politica', description: 'Análisis del poder y la sociedad.' },
  { name: 'Ciencia', slug: 'ciencia', description: 'Investigación, conocimiento y futuro.' },
  { name: 'Cultura', slug: 'cultura', description: 'Pensamiento, arte y memoria.' },
  { name: 'Sociedad', slug: 'sociedad', description: 'Cambios sociales y vida cotidiana.' },
];

function articleBody(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', marks: [], text }],
  }));
}

function articleHeading(text: string) {
  return {
    _type: 'block',
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', marks: [], text }],
  };
}

function articleTable(headers: string[], rows: string[][]) {
  return {
    _type: 'table',
    headers,
    rows: rows.map((cells) => ({ cells })),
  };
}

export const authors: Author[] = [
  {
    name: 'MPMR Brigada Puerto',
    slug: 'mpmr-bp',
    role: 'Director de contenido',
    bio: 'MPMR Brigada Puerto. Coordina la línea editorial y la producción de contenidos.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tomás Vega',
    slug: 'tomas-vega',
    role: 'Reportero de investigación',
    bio: 'Analiza tecnología, datos y nuevas formas de poder.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lucía Beltrán',
    slug: 'lucia-beltran',
    role: 'Escritora y ensayista',
    bio: 'Trabaja en las intersecciones entre memoria, cultura y ciudad.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Iker Solana',
    slug: 'iker-solana',
    role: 'Editor audiovisual',
    bio: 'Diseña narrativas visuales para la revista y sus formatos digitales.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
];

export const articles: Article[] = [
  {
    title: 'Yemen y la Dialéctica del Bloqueo',
    slug: 'yemen-dialectica-del-bloqueo',
    subtitle: 'Cuando la periferia golpea el centro.',
    excerpt:
      '"Es inaceptable que Arabia Saudita siga exportando petróleo mientras Yemen permanece bajo bloqueo".',
    category: 'sociedad',
    image:
      'https://static01.nyt.com/images/2026/10/04/multimedia/04int-yemen-saudi-01-zkgt/04int-yemen-saudi-01-zkgt-verticalTwoByThree735.jpg?auto=webp&quality=30&disable=upscale&format=pjpg',
    author: 'MPMR Brigada Puerto',
    authorSlug: 'mpmr-bp',
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-18',
    readingTime: '7 min',
    featured: true,
    type: 'Ensayo',
    body: articleBody([
      '"Es inaceptable que Arabia Saudita siga exportando petróleo mientras Yemen permanece bajo bloqueo", declaró un alto funcionario hutí. No se quedó en la palabra: la respondió con hechos.',
      '1. La contradicción principal. Desde 2015, una coalición encabezada por Arabia Saudita, una monarquía absoluta, cliente regional del imperialismo estadounidense, y respaldada por Washington, Londres y París, libra una guerra de agresión contra el país más pobre del mundo árabe. La "restauración del gobierno legítimo" fue siempre la máscara ideológica de una operación con un objetivo material concreto: impedir que un pueblo periférico escapara del control de las petromonarquías del Golfo y sus patrocinadores. El resultado no fue una guerra convencional: fue un genocidio silencioso, muertos por cientos de miles, hambruna inducida, epidemias, bloqueo naval y aéreo, sostenido por el silencio funcional de los organismos internacionales, cuya función real no es evitar estas guerras, sino administrar la legitimidad del orden que las produce.',
      '2. El sujeto histórico: de guerrilla a fuerza que disputa hegemonía. El movimiento Ansar Allah (los hutíes) protagoniza aquí el tránsito que Lenin describía como condición de toda lucha antiimperialista seria: de la resistencia local dispersa a la organización con capacidad de golpear la infraestructura material del enemigo. Desarrollaron producción propia de misiles balísticos y drones. Golpearon refinerías, aeropuertos y pozos petroleros sauditas. Y cuando la contradicción entre Irán y Estados Unidos se agudizó, cerraron el estrecho de Bab el-Mandeb, corredor por el que transita una porción decisiva del comercio marítimo mundial, convirtiendo un frente militar regional en una crisis de la economía-mundo capitalista. La lógica es simple y es, en el fondo, la lógica de toda guerra de bloqueo: si Yemen no puede exportar ni importar, tampoco lo hace, con total libertad, quien lo bloquea.',
      '3. Los hechos: la periferia arma su respuesta material. El 20 de julio los hutíes declararon un bloqueo naval contra Arabia Saudita, en respuesta a lo que describieron como un asedio saudí sobre Yemen. El 23 de julio reivindicaron ataques contra los petroleros Encelia y Layla, que ardieron en el mar Rojo. Los días siguientes el estrecho quedó prácticamente cerrado para naves saudíes, y varias embarcaciones más debieron abandonar sus rutas. Días después llegaron los golpes a la infraestructura energética misma: la planta de gas de Berri en Al Jubail, la refinería de Jizan alcanzada por misiles balísticos, un dron sobre la zona industrial de Jebel Ali en Dubái. Pero el episodio más significativo, el que marca el límite del poder naval imperialista, ocurrió antes: las Fuerzas Armadas de Yemen atacaron con misiles de crucero y drones al portaaviones USS Harry S. Truman y otros buques de guerra estadounidenses, forzando su retirada de la región norte del mar Rojo. Poco después, y en medio de pérdidas operativas para la flotilla estadounidense, Washington anunció el cese del bombardeo contra los hutíes, lo que derivó en un acuerdo de alto el fuego entre ambas partes. El símbolo más caro del poderío militar de la primera potencia mundial, la que gasta más en defensa que los diez países siguientes juntos, tuvo que sentarse a negociar con lo que ella misma califica de "grupo terrorista".',
      '4. La crisis se traslada al mercado: el imperialismo cosecha su propia guerra económica. El Brent avanzó un 3,8% hasta rozar los 98 dólares por barril, acumulando un alza cercana al 30% desde principios de julio, cuando se intensificó la escalada entre Estados Unidos e Irán. La guerra económica que el bloque imperialista desplegó contra sus adversarios (sanciones, bloqueos, presión sobre rutas comerciales) empieza a devolvérsele como una contradicción interna: la propia economía que sostiene a sus clientes regionales se resiente.',
      '5. El reacomodo geopolítico: hacia un mundo multipolar. Ante el desgaste, Arabia Saudita busca apuntalarse con nuevos pactos de defensa (Turquía, Pakistán) mientras Irán responde con desdén, advirtiendo que ningún papel firmado sustituye a la soberanía real. China, por su parte, negocia directamente con los hutíes garantías de tránsito para sus propios petroleros por Bab el-Mandeb, ya varios buques chinos lo han hecho, coordinando con los hutíes y con Irán, en una muestra concreta de que el mundo multipolar no es una consigna: es un proceso material que avanza con misiles y drones, pero también con acuerdos comerciales que erosionan el padrinazgo del dólar y de Washington.',
      '6. La lección: geografía como trinchera, solidaridad como estrategia. Los hutíes demuestran algo que la teoría marxista-leninista de la lucha antiimperialista siempre sostuvo: la correlación de fuerzas no la define solo el tamaño del ejército enemigo, sino la capacidad de organización, la disposición a sostener el costo del conflicto y la solidaridad efectiva entre pueblos oprimidos. Yemen, Irán, Palestina no son casos aislados: son nodos de una misma contradicción frente al bloque imperialista encabezado por Estados Unidos, la OTAN y sus intermediarios regionales (Mostrar bandera saudi, israeli y otras).',
    ]),
  },
  {
    title: 'Infraestructura clasista en el suministro eléctrico ante las emergencias ambientales',
    slug: 'ciencia-del-clima',
    subtitle: 'Cortes de suministro, desigualdad territorial y lógica de la ganancia.',
    excerpt:
      'El sistema frontal dejó cientos de miles de clientes sin suministro eléctrico a nivel nacional.',
    category: 'ciencia',
    image:
      'https://img.editor80.com/ens-_lcu9RP9SuAms_9qPd-KtnfiWdVTerlKTWeLU_g/rs:fill:1200:675:0/g:fp:0.5:0.5/q:65/aHR0cHM6Ly9tZWRpYS5lZGl0b3I4MC5jb20vdGVuYW50cy9lbi1jYW5jaGEvYXJjL05NVktMN1dIR1JISE5ETEk1Q0k3R1hBMkxZLnBuZw',
    author: 'Tomás Vega',
    authorSlug: 'tomas-vega',
    publishedAt: '2026-08-29',
    readingTime: '9 min',
    type: 'Artículo',
    body: [
      ...articleBody([
        'El sistema frontal dejó cientos de miles de clientes sin suministro eléctrico a nivel nacional. En el momento más crítico de la emergencia, La Araucanía fue la región con mayor cantidad de hogares afectados, seguida por Coquimbo, Valparaíso y la Región Metropolitana.',
        'Más allá de la intensidad de la lluvia, la emergencia expone una contradicción de fondo: la infraestructura eléctrica no se distribuye según necesidad social, sino según rentabilidad. Bajo un sistema de distribución eléctrica privatizada, cada territorio no es un espacio de derechos ciudadanos iguales, sino un mercado con distinta tasa de retorno esperado para el capital.',
        'Si se comparan comunas de tamaño similar, la desigualdad no es un accidente climático: es la huella del desarrollo desigual y combinado que produce el capital cuando organiza territorios en función de la ganancia.',
      ]),
      articleTable(
        ['Comuna', 'Población', 'Clientes sin suministro', 'Por cada 1.000 habitantes'],
        [
          ['La Serena', '250.141', '7.832', '31,3'],
          ['Coquimbo', '263.719', '4.322', '16,4'],
          ['Valparaíso', '284.938', '3.981', '14,0'],
          ['Las Condes', '296.134', '1.491', '5,0'],
        ],
      ),
      ...articleBody([
        'Con poblaciones prácticamente equivalentes, La Serena registró una tasa de clientes sin suministro más de seis veces superior a la de Las Condes. Coquimbo la triplicó y Valparaíso casi la triplicó. La comuna con mayor concentración de capital financiero e inmobiliario del país, Las Condes, es también la que exhibe la red más resiliente. No es casualidad: es la lógica de la ganancia aplicada al territorio.',
        'Las empresas distribuidoras de electricidad operan como monopolios privados regionales que administran un servicio básico, condición material de reproducción de la vida, bajo el criterio de maximización de utilidades, no de cobertura universal ni de justicia territorial. La inversión en mantenimiento, soterramiento de cables, poda preventiva y modernización de redes se concentra donde la capacidad de pago y la presión política de los usuarios es mayor. Las comunas populares y las regiones extractivas, proveedoras históricas de materias primas y mano de obra para el centro, quedan sistemáticamente postergadas.',
        'Esto no es una falla técnica coyuntural: es la forma concreta que adopta la desigualdad estructural cuando un servicio esencial se organiza como mercancía y no como derecho. El temporal no crea la desigualdad; la desnuda. Lo que la lluvia revela es que existe una geografía de clase de la infraestructura, resultado de décadas de privatización del sector eléctrico y de un Estado subsidiario que renunció a garantizar condiciones materiales homogéneas para el conjunto de la clase trabajadora.',
        'La pregunta no es solo cuánto llovió. Es quién controla los medios de producción y distribución de un servicio vital, y a quién sirve esa organización cuando llega la emergencia. La electricidad que ilumina y calienta los hogares de Chile se genera con agua, sol, viento y carbón chilenos, se transporta por líneas construidas con mano obrera, y sin embargo su usufructo queda en manos de un puñado de distribuidoras privadas, muchas de capital extranjero, que extraen la ganancia y devuelven el déficit a los territorios que menos tienen. Nuestro principio elemental de clase es: «el que no trabaja, no come». Si ese deber rige para quien no produce, con mayor razón debe regir el principio inverso: lo que se produce con recursos chilenos, en suelo chileno y con mano obrera, no puede seguir siendo apropiado por quienes no trabajan la tierra ni sostienen las redes, mientras el pueblo trabajador, que sí genera esa riqueza, queda a oscuras cuando llueve. La energía no es una mercancía: es la condición material para que la clase trabajadora reproduzca su vida. Su usufructo debe volver, íntegro, al conjunto de quienes la producen.',
      ]),
    ],
  },
  {
    title: 'La carta de despedida del Che como ideario político',
    slug: 'carta-despedida-che-ideario-politico',
    subtitle: 'A René Barrientos Warner',
    excerpt: 'Leída sesenta y un años después, la carta del Che permite pensar la ética revolucionaria y los límites estratégicos del castroguevarismo.',
    category: 'politica',
    image:
      'https://elporteno.cl/wp-content/uploads/2026/10/Imagen-de-Codex-4-oct-2026-11_55_41-a.m.png',
    author: 'Gustavo Burgos',
    authorSlug: 'gustavo-burgos',
    publishedAt: '2026-10-04',
    readingTime: '18 min',
    type: 'Ensayo',
    body: [
      ...articleBody([
        'Otra vez octubre. Octubre en Chile. La primera semana de octubre concentra la conmemoración de la muerte del Che Guevara y Miguel Enríquez. Es la oportunidad para muchos militantes de reunirse con viejos camaradas y proclamar la inquebrantable voluntad revolucionaria. Es, también, un momento para volver sobre viejos textos, viejos pero no menos febriles. Uno de los textos más fértiles, inquietantes y sugerentes en estas fechas es la legendaria Carta de Despedida de Ernesto Che Guevara a Fidel Castro. Leída sesenta y un años después, no puede reducirse a un documento íntimo, ni siquiera a la explicación política de su partida de Cuba. Para una parte considerable de la juventud revolucionaria latinoamericana de los años sesenta y setenta aquella carta adquirió el carácter de un verdadero ideario militante. Sus frases condensaban una manera de comprender la revolución, la organización y la propia existencia: renunciar a los privilegios personales, no considerar ningún cargo como propiedad, aceptar conscientemente la posibilidad de morir, concebir el internacionalismo como obligación práctica y medir la consecuencia política por la disposición a llevar las convicciones «hasta las últimas consecuencias». El Che escribe que en una revolución «se triunfa o se muere» y explica su partida afirmando que otras tierras reclaman el concurso de sus modestos esfuerzos. Esa concepción no quedó confinada a Cuba: pasó a formar parte de la educación sentimental y política de miles de jóvenes que durante la década siguiente ingresaron al MIR chileno, al PRT-ERP argentino, a Montoneros, al MLN-Tupamaros uruguayo, al ELN boliviano y a numerosas organizaciones menores que vieron en la Revolución cubana la demostración de que el orden oligárquico continental podía ser destruido.',
        'Comprender esa generación exige tomarse en serio esa dimensión subjetiva. No se trató simplemente de jóvenes seducidos por las armas ni de aventureros fascinados por una estética guerrillera y la literatura de Cortázar, como pretendieron después algunas reconstrucciones conservadoras. La Revolución cubana había ocurrido; Estados Unidos intervenía abierta o encubiertamente en el continente; las dictaduras militares proliferaban; las estructuras agrarias, la dependencia económica y la desigualdad social convertían a América Latina en un escenario de violentos conflictos de clase. El castroguevarismo ofreció frente a ello algo que las viejas direcciones estalinistas y de toda ralea reformista parecían haber perdido: la certeza de que la revolución no era una abstracción para un futuro indeterminado, sino una tarea inmediata de la generación presente. En El socialismo y el hombre en Cuba, escrito justamente en 1965, Guevara había colocado a la juventud en el centro de esa concepción, definiéndola como la materia fundamental sobre la cual debía construirse el futuro socialista.',
        'De ahí la enorme potencia que tendría su muerte dos años después. El guerrillero que había renunciado a ministerios, grados militares y ciudadanía para volver a combatir parecía haber cumplido literalmente aquello que había anunciado en su carta. Para miles de militantes latinoamericanos dejó de existir una separación entre doctrina y biografía: la vida del revolucionario debía convertirse en demostración de la verdad de sus ideas. Ese componente moral produjo cuadros de una entrega extraordinaria, capaces de actuar clandestinamente, soportar prisión y tortura y, en muchos casos, continuar militando bajo aparatos estatales que los perseguían para exterminarlos. La Junta Coordinadora Revolucionaria, creada por organizaciones de Chile, Argentina, Uruguay y Bolivia, expresó incluso institucionalmente esa aspiración continental antes de ser golpeada por la coordinación represiva de las dictaduras del Cono Sur y la Operación Cóndor.',
        'Precisamente por eso, sin embargo, su derrota no puede explicarse moralmente. Convertir la historia de aquella generación en una narración de héroes y verdugos termina ocultando el problema político fundamental. También lo hacen quiénes —en inequívoca reivindicación de la democracia burguesa— plantean que los caídos en combate son meras víctimas asesinadas por pensar distinto. Que las dictaduras fueron responsables del asesinato, desaparición, encarcelamiento y tortura de miles de militantes constituye un hecho histórico; pero ese reconocimiento no explica por qué organizaciones que movilizaron a una parte extraordinariamente combativa de la juventud y alcanzaron importantes posiciones entre trabajadores, campesinos y pobladores fueron incapaces de transformar la crisis revolucionaria latinoamericana en una conquista efectiva del poder por la clase obrera. Una memoria revolucionaria necesita formular esa pregunta precisamente porque toma en serio a quienes murieron. Recordarlos solamente por el sacrificio significaría conservar la ética de la carta del Che mientras se renuncia a discutir el programa que condujo aquella experiencia.',
      ]),
      articleHeading('Del ejemplo guerrillero al problema del programa'),
      ...articleBody([
        'Aquí aparece la gran contradicción del castroguevarismo. Guevara podía proclamarse integrante del «gran ejército del proletariado» y sostener que el campesinado latinoamericano debía actuar sobre la base de la ideología de la clase obrera; pero la teoría estratégica nacida de la experiencia cubana tendió a trasladar el centro de gravedad de la revolución desde la autoorganización política de la clase trabajadora hacia la acción ejemplar de una vanguardia político-militar. En su reflexión de 1961 sobre Cuba, el Che defendía que la lucha armada podía crear las condiciones subjetivas y concebía fundamentalmente el campo como escenario inicial del enfrentamiento, desde donde un ejército campesino avanzaría hacia las ciudades y se uniría con el proletariado.',
        'El problema no consistía, por tanto, en que el guevarismo ignorara doctrinariamente a la clase obrera. El problema era qué papel político concreto le asignaba. Una cosa era proclamar que la ideología debía ser proletaria y otra construir una organización cuya estrategia partiera del desarrollo real de las contradicciones de la clase trabajadora, de sus organismos, sus huelgas, sus tendencias políticas y, sobre todo, de la lucha por independizarla de las direcciones burguesas y pequeño burguesas que ejercían influencia sobre ella. El foco podía proponerse despertar a las masas, pero en esa formulación la iniciativa histórica había sido desplazada: ya no era fundamentalmente la clase organizada la que producía su vanguardia, sino la vanguardia armada la que pretendía producir mediante su acción las condiciones políticas de la movilización de las masas.',
        'Sería históricamente incorrecto afirmar que las organizaciones inspiradas por Cuba permanecieron simplemente aisladas de los trabajadores. El MIR chileno desarrolló importantes frentes de masas —entre ellos el Frente de Trabajadores Revolucionarios— y durante la Unidad Popular concentró buena parte de su actividad en la construcción del llamado Poder Popular. El PRT argentino tuvo inserción proletaria efectiva, particularmente en Tucumán, Córdoba y otros centros industriales, y sus propios documentos muestran que sectores obreros intervinieron decisivamente en sus debates sobre la lucha armada. La cuestión es otra: ¿consiguió esa presencia social convertirse en una estrategia política independiente de la clase obrera frente a los grandes movimientos que organizaban políticamente a las masas?',
        'En Chile esta contradicción alcanzó una expresión extraordinariamente nítida. El MIR no ingresó en la Unidad Popular y mantuvo diferencias estratégicas con la vía institucional de Allende, pero durante el gobierno la apoyó explícitamente, suspendió su política de propaganda armada y volcó su militancia hacia los Frentes de Masas y el Poder Popular. Simultáneamente, la propia lucha de clases comenzaba a producir organismos cuya importancia excedía los esquemas originalmente previstos tanto por el gobierno como por sus críticos: durante el paro patronal de octubre de 1972 y después del Tanquetazo de junio de 1973, los trabajadores ocuparon centenares de fábricas y los cordones industriales adquirieron creciente gravitación como centros de coordinación obrera territorial.',
        'Desde una lectura marxista crítica, ése es precisamente el lugar donde debe instalarse el balance. El problema decisivo dejó de ser si había que acompañar críticamente, presionar, profundizar o defender el gobierno popular. La cuestión era si los organismos nacidos directamente de la movilización obrera podían constituirse en embriones de un poder político alternativo al Estado existente y qué partido podía proponerles conscientemente esa perspectiva. El drama del MIR no fue carecer de heroísmo ni permanecer indiferente ante esos organismos; por el contrario, participó activamente en ellos. Su límite estratégico puede formularse en otra parte: nunca terminó de resolver la contradicción entre la construcción de un poder obrero independiente y su relación política con un proceso dirigido por partidos cuya estrategia seguía depositando la transformación en el aparato estatal existente. La diferencia entre estar fuera orgánicamente de la Unidad Popular y construir una alternativa de poder independiente frente a ella resultó decisiva.',
        'Argentina presentó otra variante del mismo problema. Montoneros desarrolló una organización capaz de movilizar importantes franjas juveniles y populares, pero inscribió la revolución dentro de la identidad histórica del peronismo. La contradicción quedó expuesta cuando el retorno de Perón obligó a redefinir qué significaba ser simultáneamente organización revolucionaria y parte de un movimiento políticamente conducido por un liderazgo de claro contenido burgués. Documentos críticos surgidos dentro del propio espacio montonero cuestionaron tempranamente tanto la creciente militarización como una visión idealizada del Movimiento Peronista que dificultaba reconocer la lucha política existente en su interior. El problema ya no podía resolverse mediante una mayor disposición al combate: había que decidir qué programa expresaba los intereses históricos independientes de la clase obrera y qué relación debía mantener ese programa con el peronismo, cuya dirección y aparato estatal respondían a una lógica diferente.',
        'El PRT-ERP, de origen trotskista y por lo mismo de la misma corriente que el MIR, ofreció una respuesta distinta, pues sostuvo una independencia política mucho mayor respecto del peronismo y reivindicó explícitamente una perspectiva socialista. Pero allí apareció otra tensión característica de la época: el aparato político-militar podía adquirir una dinámica relativamente autónoma respecto del movimiento real de los trabajadores. Ya en 1972, varias corrientes trotskistas polemizaban con el PRT señalando exactamente este problema: no cuestionaban que la lucha armada pudiera estar planteada por la situación argentina, sino si las operaciones guerrilleras estaban logrando articularse políticamente con un movimiento de masas que atravesaba entonces un período de poderoso ascenso obrero. Es una distinción decisiva. El debate marxista nunca puede reducirse a violencia contra pacifismo, armas contra elecciones o legalidad contra clandestinidad. La cuestión fundamental es qué política permite a la clase trabajadora convertirse de clase explotada en sujeto consciente de un nuevo poder.',
      ]),
      articleHeading('Superar la moral de la derrota'),
      ...articleBody([
        'Ese problema permite volver a la carta del Che con una mirada distinta. Su formidable fuerza reside en haber establecido una ética revolucionaria antagónica a la del político profesional burgués: cargos que pueden abandonarse, bienes que no importan, fronteras nacionales que no limitan la solidaridad, una vida que sólo adquiere significado dentro de una causa colectiva. Frente al arribismo, la adaptación institucional y la conversión de la política en administración de carreras individuales, aquella ética conserva una potencia difícil de negar. Pero el marxismo no puede convertir la moral revolucionaria en sustituto de la estrategia revolucionaria.',
        'Ese fue quizás el peligro contenido en la extraordinaria eficacia cultural del castroguevarismo. «Hasta las últimas consecuencias» podía responder a la pregunta de cómo debía comportarse un revolucionario, pero no respondía por sí mismo a las preguntas de qué clase debía dirigir la revolución, qué programa debía levantar, qué tipo de partido necesitaba, qué Estado debía destruir y cuáles eran los organismos capaces de reemplazarlo. La disposición a morir podía separar radicalmente al militante revolucionario del reformista acomodado, pero no bastaba para determinar una línea política correcta. Una generación podía poseer una superioridad moral extraordinaria sobre las burocracias que combatía y, sin embargo, equivocarse estratégicamente.',
        'Por eso tampoco sirve invertir la moralización. Sería tan superficial convertir a aquellos militantes en santos como responsabilizarlos retrospectivamente de su propia derrota. Las dictaduras los persiguieron porque representaban fuerzas sociales y políticas reales que cuestionaban el orden existente; la coordinación genocida continental contra organizaciones como las agrupadas en la JCR confirma la dimensión que los propios Estados atribuyeron al problema. Pero reconocer la responsabilidad criminal de las dictaduras no obliga a suspender el balance político de quienes las enfrentaron. Al contrario: la mejor forma de rescatar a una tradición revolucionaria de la museificación consiste en discutir sus derrotas con la misma seriedad con que ella discutía la revolución.',
        'Esa discusión conduce inevitablemente hacia la cuestión de la independencia de clase. En Chile, la prueba histórica no puede reducirse a cuánto más radical era el MIR que la Unidad Popular, sino a si consiguió levantar frente a ella una alternativa política capaz de transformar los cordones industriales y demás organismos de masas en una dirección estatal independiente. En Argentina, no basta establecer cuánto heroísmo desplegaron Montoneros o el ERP: hay que preguntar por qué las energías revolucionarias de una enorme generación terminaron, por caminos distintos, subordinadas al horizonte político del peronismo o desplazadas hacia una confrontación militar que podía separarse del ritmo de maduración política del proletariado. Las respuestas fueron diferentes, y las organizaciones no deben confundirse entre sí, pero detrás de ellas reaparece una misma cuestión: la revolución requiere algo más que una vanguardia dispuesta a combatir; requiere que esa vanguardia organice políticamente a la clase capaz de construir el nuevo poder.',
        'Vista desde este ángulo, la carta de despedida del Che es al mismo tiempo la expresión más elevada y el límite de una época. Es elevada porque proclama una ruptura absoluta con el privilegio, el nacionalismo estrecho y la acomodación burocrática. Es limitada cuando esa voluntad revolucionaria puede ser leída como si la consecuencia individual del militante fuese capaz de suplir aquello que sólo puede producir la experiencia organizada de millones de trabajadores. Entre la Sierra Maestra y las derrotas del Cono Sur se encuentra precisamente ese problema.',
        'La generación que cayó bajo las dictaduras merece, por ello, algo más exigente que el homenaje. Merece un balance. No para disminuir su sacrificio, sino para devolverle contenido político. Si su memoria queda reducida a juventud, valentía, tortura y muerte, los vencedores habrán obtenido una última victoria: habrán convertido revolucionarios que discutían apasionadamente cómo conquistar el poder en víctimas desprovistas de programa. Recuperarlos históricamente significa restituir aquella discusión allí donde verdaderamente se encontraba: en el problema del Estado, de la organización, de la dirección y del poder de clase.',
        'Sesenta y un años después, la frase más importante de la carta quizá no sea entonces «Patria o muerte» ni siquiera «Hasta la victoria siempre», sino aquella afirmación mucho más problemática según la cual en una revolución se triunfa o se muere. La historia posterior obliga a agregar una tercera posibilidad, políticamente más dolorosa: también se puede combatir con un coraje extraordinario y ser derrotado porque el heroísmo no resuelve por sí solo el problema del programa y de la dirección revolucionaria. Allí comienza la crítica marxista que aquella generación merece. No en juzgar si estuvo suficientemente dispuesta a morir —demostró trágicamente que lo estaba—, sino en preguntar si sus organizaciones consiguieron construir una política que permitiera a la clase obrera luchar por el poder en su propio nombre, con sus propios organismos y bajo un programa independiente de las fuerzas burguesas, nacionalistas y reformistas que disputaban su dirección.',
        'Ésa es probablemente la forma más rigurosa de leer hoy la despedida del Che: no como catecismo del sacrificio, sino como documento de una generación que convirtió la revolución en una cuestión inmediata y cuya derrota obliga a separar definitivamente la moral revolucionaria de la estrategia, para volver a unirlas sobre otro fundamento: el programa histórico independiente de la clase obrera. En ese sentido el ideario de la clase trabajadora, que es el ideario de la revolución de los explotados y la estrategia de su liberación ha de encontrar su definición en la intervención en la lucha de clases que hoy día se desarrolla en contra del gobierno capitalista en todo espacio del orbe. La canalla burguesa e imperialista solo será arrojada al basurero de la historia en la medida que la clase obrera, acaudillando al conjunto de los explotados y la nación oprimida, sea capaz de empuñar los fusiles de su propia revolución, no solo expropiándoles y destruyendo su Estado, sino que construyendo su propio gobierno asentado en los órganos de poder de la clase trabajadora.',
      ]),
    ],
  },
];

export const issues: Issue[] = [
  {
    title: 'Número 1 · Explotados y Explotadores',
    slug: 'numero-1-explotados-y-explotadores',
    number: '1',
    cover:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    publishDate: '2026-09-01',
    description: 'Una edición sobre la relación entre el agua, la infraestructura y la vida urbana.',
    summary: 'Ensayos, reportajes y entrevistas sobre sostenibilidad, memoria y transformación del paisaje.',
    body: 'Esta edición explora la relación entre el agua, la infraestructura y la vida urbana, abordando temas de sostenibilidad, memoria y transformación del paisaje a través de ensayos, reportajes y entrevistas.',
  },
  {
    title: 'Número 2 · Explotación Capitalista',
    slug: 'numero-2-explotacion-capitalista',
    number: '2',
    cover:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    publishDate: '2026-05-18',
    description: 'Un recorrido por los mecanismos de la atención, la información y la construcción de sentido.',
    summary: 'Tecnología, educación y salud mental en su relación con la vida contemporánea.',
    body: 'Esta edición reúne perspectivas sobre cómo las tecnologías y las economías de la atención afectan la educación, la salud mental y la vida cotidiana.',
  },
  {
    title: 'Número 3 · Monopolio y Miseria',
    slug: 'numero-3-monopolio-y-miseria',
    number: '3',
    cover:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    publishDate: '2026-01-15',
    description: 'Un dossier sobre barrio, memoria y modos de habitar el territorio.',
    summary: 'Narrativas sobre vivienda, espacio compartido y culturas locales.',
    body: 'Un dossier sobre las formas de sostener comunidad, vivienda y memorias locales, y sobre las culturas que se desarrollan en los territorios compartidos.',
  },
];

export const videos: Video[] = [
  {
    title: 'OCTUBRE NEGRO 1993: La BATALLA que decidió la NUEVA RUSIA',
    slug: 'octubre-negro-1993-la-batalla-que-decidió-la-nueva-rusia',
    description: 'En 1991, Borís Yeltsin aparecía subido a un tanque frente a la Casa Blanca de Moscú. Dos años después, esos mismos tanques disparaban contra la Casa Blanca. ¿Qué ocurrió entre ambas imágenes?',
    youtubeId: 'jUq7QHeIj0w',
    thumbnail:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-09-06',
    duration: '11:42',
    featured: true,
  },
  {
    title: 'Colin McRae Rally 2.0 Soundtrack - Jonathan Colling Theme Original Version',
    slug: 'colin-mcrae-rally-2-0-soundtrack-jonathan-colling-theme-original-version',
    description: 'The original version of the Jonathan Colling theme from Colin McRae Rally 2.0.',
    youtubeId: 'yUXmO5XmymU',
    thumbnail:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-08-16',
    duration: '08:15',
  },
];

export const socialPosts: SocialPost[] = [
  {
    title: 'Natalicio Richard Sorge',
    description: 'El Espía que sirvió a la Revolución Mundial.',
    image:
      'https://substackcdn.com/image/fetch/$s_!zRdm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff6175f39-d0b4-482c-bfcb-0b61cc04d368_2961x4156.jpeg',
    alt: 'Richard Sorge',
    platform: 'Instagram',
    href: 'https://www.instagram.com/p/DeFeKnNlL21',
    publishedAt: '2026-09-01',
    featured: true,
  },
  {
    title: 'Reflexiones sobre Jornada de Protestas',
    description: 'Contexto y análisis de los eventos de protesta.',
    image:
      'https://g5noticias.cl/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-11-at-19.09.21-1024x768.jpeg',
    alt: 'Manifestantes en las calles durante la jornada de protestas',
    platform: 'Instagram',
    href: 'https://instagram.com/p/CxKj8ZSvN2m',
    publishedAt: '2026-08-20',
  },
];

export const latestIssue = issues[0];
export const featuredArticle = articles.find((article) => article.featured) ?? articles[0];
export const featuredVideo = videos.find((video) => video.featured) ?? videos[0];
export const featuredSocial = socialPosts.find((post) => post.featured) ?? socialPosts[0];

export const editorialStats = [
  { label: 'Artículos publicados', value: '126' },
  { label: 'Ediciones impresas', value: '12' },
  { label: 'Autores activos', value: '31' },
  { label: 'Vídeos de archivo', value: '48' },
];
