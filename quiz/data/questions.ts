// Banco de perguntas em Português para o Quiz
// Cada pergunta tem id, enunciado, opções e o índice da opção correta (answerIndex)
export type Question = {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "O que é 'easing' em animação?",
    options: [
      "Uma técnica para comprimir frames",
      "Curvas de aceleração e desaceleração do movimento",
      "Um formato de arquivo de vídeo",
      "Uma biblioteca JavaScript para animações"
    ],
    answerIndex: 1,
  },
  {
    id: 2,
    question: "Qual a vantagem de usar SVG para animações vetoriais?",
    options: [
      "Perda de qualidade ao redimensionar",
      "Maior peso em bytes que imagens raster",
      "Escalabilidade sem perda e menor trabalho com resolução",
      "Não funciona em navegadores modernos"
    ],
    answerIndex: 2,
  },
  {
    id: 3,
    question: "O que significa 'frame rate' em animação?",
    options: [
      "A cor dominante do frame",
      "A quantidade de frames por segundo",
      "A resolução do vídeo",
      "O tempo total da animação"
    ],
    answerIndex: 1,
  },
  {
    id: 4,
    question: "Quando a animação é considerada 'decorativa' e deve ser evitada?",
    options: [
      "Quando melhora a usabilidade",
      "Quando distrai sem agregar informação",
      "Quando ajuda a guiar o usuário",
      "Quando demonstra uma transformação"
    ],
    answerIndex: 1,
  },
  {
    id: 5,
    question: "Qual boa prática para animações em interfaces acessíveis?",
    options: [
      "Nunca oferecer controle ao usuário",
      "Ignorar preferências de movimento do sistema",
      "Fornecer opção para reduzir/pausar animações",
      "Usar animações em 100% dos elementos"
    ],
    answerIndex: 2,
  },
  {
    id: 6,
    question: "Qual técnica reduz o custo de performance de animações no navegador?",
    options: [
      "Animar propriedades que forçam repaint/layout (como width/height)",
      "Animar transform e opacity sempre que possível",
      "Adicionar muitos shadows e blur dinâmicos",
      "Recarregar a página a cada frame"
    ],
    answerIndex: 1,
  },
  {
    id: 7,
    question: "O que é 'storyboarding' em produção de animação?",
    options: [
      "Uma ferramenta para compressão de vídeo",
      "Uma sequência desenhada que planeja as cenas",
      "Um formato de exportação para web",
      "Um plugin do navegador"
    ],
    answerIndex: 1,
  },
  {
    id: 8,
    question: "Qual é um uso pedagógico comum de animações em multimídia?",
    options: [
      "Substituir texto inteiramente",
      "Demonstrar processos que ocorrem no tempo",
      "Dificultar a compreensão do conteúdo",
      "Aumentar o tamanho da página sem motivo"
    ],
    answerIndex: 1,
  },
  {
    id: 9,
    question: "O que é 'looping' em animação?",
    options: [
      "Uma técnica para pausar a animação",
      "Repetir a mesma sequência continuamente",
      "Converter animação em imagem estática",
      "Uma medida de desempenho"
    ],
    answerIndex: 1,
  },
  {
    id: 10,
    question: "Por que testes de usabilidade são importantes para animações?",
    options: [
      "Para garantir que a animação rode em todos os dispositivos",
      "Para verificar se a animação agrega compreensão e não atrapalha",
      "Para melhorar o tamanho do arquivo",
      "Para remover funcionalidades interativas"
    ],
    answerIndex: 1,
  },
  {
    id: 11,
    question: "Qual formato é tipicamente usado para animações vetoriais na web?",
    options: [
      "JPEG",
      "PNG",
      "SVG",
      "TIFF"
    ],
    answerIndex: 2,
  },
  {
    id: 12,
    question: "O que significa 'microinteração'?",
    options: [
      "Grandes vídeos explicativos",
      "Pequenas respostas animadas a ações do usuário",
      "Um método de compressão de áudio",
      "Uma técnica de backup de dados"
    ],
    answerIndex: 1,
  },
  {
    id: 13,
    question: "Qual propriedade CSS é mais performática para animar position/size?",
    options: [
      "top/left",
      "width/height",
      "transform",
      "box-shadow"
    ],
    answerIndex: 2,
  },
  {
    id: 14,
    question: "Em design instrucional, animações devem:",
    options: [
      "Substituir exemplos práticos automaticamente",
      "Ser raras e somente quando ajudam a explicar",
      "Estar sempre no início do conteúdo",
      "Ser longo e complexo por padrão"
    ],
    answerIndex: 1,
  },
  {
    id: 15,
    question: "O que é 'keyframe' em animação CSS?",
    options: [
      "Um plugin para editar vídeos",
      "Pontos que definem estados ao longo do tempo",
      "Um tipo de imagem",
      "Uma função matemática"
    ],
    answerIndex: 1,
  }
];

// Função para sortear N perguntas (Fisher–Yates shuffle)
export function pickRandomQuestions(count = 5) {
  const arr = [...QUESTIONS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export default QUESTIONS;
