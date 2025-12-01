/**
 * Constantes do projeto
 */

export const ANIMATION_DURATION = {
  FAST: 160,
  NORMAL: 220,
  SLOW: 280,
  VERY_SLOW: 400,
} as const;

export const BREAKPOINTS = {
  XS: 320,
  SM: 480,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const QUIZ_CONFIG = {
  TOTAL_QUESTIONS: 15,
  QUESTIONS_PER_QUIZ: 5,
  PASS_THRESHOLD: 60, // 60% para passar
} as const;

export const AUDIO_CONFIG = {
  BACKGROUND_VOLUME: 0.18,
  SFX_VOLUME: 0.6,
  FADE_DURATION: 0.6,
} as const;

export const ROUTES = {
  HOME: '/',
  PROTOTYPE: '/prototype',
  LEGACY: '/legacy',
} as const;

export const LOCAL_STORAGE_KEYS = {
  QUIZ_HISTORY: 'quizHistory',
  MUSIC_ENABLED: 'quizMusicEnabled',
  USER_PREFERENCES: 'userPreferences',
} as const;

export const NAVIGATION_SECTIONS = [
  { key: 'intro', label: '🏠 Início', emoji: '🏠' },
  { key: 'animation', label: '📚 Tipos de Animação', emoji: '📚' },
  { key: 'video', label: '🎨 Como uma animação é produzida', emoji: '🎨' },
  { key: 'examples', label: '✨ Exemplos', emoji: '✨' },
  { key: 'quiz', label: '🎯 Quiz', emoji: '🎯' },
  { key: 'devs', label: '👥 Devs', emoji: '👥' },
  { key: 'projectVideo', label: '🎬 Vídeo', emoji: '🎬' },
] as const;

export const TEAM_MEMBERS = [
  {
    name: 'Ingryd Vitória',
    fullName: 'Ingryd Vitória de Araújo Barbosa',
    role: 'Lead Developer (Desenvolvedora Principal)',
    emoji: '👩‍💻',
    contributions: [
      'Desenvolvimento Full-stack da aplicação web.',
      'Implementação da arquitetura Next.js e TypeScript.',
      'Estilização e UI com Tailwind CSS.',
    ],
  },
  {
    name: 'Paulo Sérgio',
    fullName: 'Paulo Sérgio Barros de Souza',
    role: 'Project Manager & Multimedia Producer',
    emoji: '🎬',
    contributions: [
      'Gestão do time e Documentação de Requisitos (DRS).',
      'Produção e Edição de Vídeo (Tutorial/Making-of).',
      'Composição da Trilha Sonora Original (MIDI).',
      'Criação da Animação em Stop Motion.',
    ],
  },
  {
    name: 'Kauan Henrique',
    fullName: 'Kauan Henrique Barbosa da Costa',
    role: 'Content Creator & Vector Designer',
    emoji: '🎨',
    contributions: [
      'Criação e Vetorização da Identidade Visual (Logo).',
      'Narração (Voiceover) do vídeo tutorial.',
      'Pesquisa e curadoria do conteúdo educacional sobre Animação.',
    ],
  },
  {
    name: 'Luiz Otávio',
    fullName: 'Luiz Otávio de Souza Azevedo',
    role: 'Sound Designer & Assistant Developer',
    emoji: '🔊',
    contributions: [
      'Captação e processamento de efeitos sonoros (Foley).',
      'Apoio no desenvolvimento e lógica do site.',
    ],
  },
  {
    name: 'Murilo William',
    fullName: 'Murilo William Trindade Guedes',
    role: 'Visual Designer (Matrix)',
    emoji: '🖼️',
    contributions: [
      'Captura e tratamento de imagens matriciais.',
      'Edição de fotografia para layout e texturas.',
    ],
  },
] as const;
