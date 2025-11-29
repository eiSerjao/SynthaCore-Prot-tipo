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
    question: "A animação tradicional é caracterizada por:",
    options: [
      "Filmagens reais com desenhos por cima",
      "Desenhos feitos quadro a quadro manualmente",
      "Modelos 3D renderizados",
      "Distorções eletrônicas em tempo real"
    ],
    answerIndex: 1,
  },
  {
    id: 2,
    question: "A técnica que utiliza pessoas se movendo em pequenas etapas entre fotos chama-se:",
    options: [
      "Scanimate",
      "Stop Motion",
      "Pixilation",
      "Animação na película"
    ],
    answerIndex: 2,
  },
  {
    id: 3,
    question: "Animação na película consiste em:",
    options: [
      "Criar modelos 3D e animá-los no computador",
      "Desenhar diretamente no filme fotográfico",
      "Fotografar objetos quadro a quadro",
      "Usar areia sobre uma mesa iluminada"
    ],
    answerIndex: 1,
  },
  {
    id: 4,
    question: "A animação com areia normalmente é feita:",
    options: [
      "Dentro de softwares digitais",
      "Com areia sobre superfície iluminada, quadro a quadro",
      "Em esculturas 3D",
      "Movendo pessoas reais"
    ],
    answerIndex: 1,
  },
  {
    id: 5,
    question: "O Scanimate foi usado principalmente para:",
    options: [
      "Longas de animação 3D modernos",
      "Videoclipes com rotoscopia",
      "Vinhetas e gráficos de TV analógicos",
      "Filmes com stop motion"
    ],
    answerIndex: 2,
  },
  {
    id: 6,
    question: "Rotoscopia é uma técnica que:",
    options: [
      "Usa areia para criar desenhos animados",
      "Desenha sobre imagens filmadas reais",
      "Modela objetos no computador",
      "Pinta pelicula em projeções"
    ],
    answerIndex: 1,
  },
  {
    id: 7,
    question: "O Stop Motion utiliza:",
    options: [
      "Computação para renderizar cenas 3D",
      "Filmagens contínuas em tempo real",
      "Fotografias de objetos em pequenas etapas",
      "Desenhos feitos em papel"
    ],
    answerIndex: 2,
  },
  {
    id: 8,
    question: "Um exemplo conhecido de Stop Motion é:",
    options: [
      "O Rei Leão (1994)",
      "Coraline",
      "Toy Story",
      "A Scanner Darkly"
    ],
    answerIndex: 1,
  },
  {
    id: 9,
    question: "No exemplo de Stop Motion do projeto, quantas fotos foram tiradas?",
    options: [
      "50",
      "113",
      "240",
      "300"
    ],
    answerIndex: 1,
  },
  {
    id: 10,
    question: "Qual foi a duração final da animação do projeto?",
    options: [
      "5 segundos",
      "11 segundos",
      "30 segundos",
      "1 minuto"
    ],
    answerIndex: 1,
  },
  {
    id: 11,
    question: "A principal característica que torna o Stop Motion demorado é:",
    options: [
      "Falta de efeitos sonoros",
      "Necessidade de fotografar cada quadro individualmente",
      "Uso de softwares complexos",
      "Dificuldade em pintar cenários digitais"
    ],
    answerIndex: 1,
  },
  {
    id: 12,
    question: "Para evitar tremores e cintilação na animação, é importante:",
    options: [
      "Mudar a posição da câmera sempre que possível",
      "Deixar a iluminação variar naturalmente",
      "Não mover a câmera e manter luz constante",
      "Gravar vídeo em vez de tirar fotos"
    ],
    answerIndex: 2,
  },
  {
    id: 13,
    question: "Quantos minutos foram usados para tirar as fotos do projeto?",
    options: [
      "12 minutos",
      "5 minutos",
      "24 minutos",
      "2 minutos"
    ],
    answerIndex: 0,
  },
  {
    id: 14,
    question: "Um exemplo clássico de animação tradicional é:",
    options: [
      "Coraline",
      "Toy Story",
      "O Rei Leão (versão clássica)",
      "Filmes feitos com Scanimate"
    ],
    answerIndex: 2,
  },
  {
    id: 15,
    question: "A animação 3D envolve principalmente:",
    options: [
      "Pintura sobre filme",
      "Modelagem digital, rigging e renderização",
      "Uso de areia e iluminação por baixo",
      "Pessoas atuando quadro a quadro"
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
