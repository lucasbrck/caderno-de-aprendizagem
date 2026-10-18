export type QuestionBase =
  | { type: 'text'; text: string; source?: string }
  | { type: 'image'; src: string; alt: string; source?: string }

export type QuizQuestion = {
  id: string
  base?: QuestionBase
  prompt: string
  options: { id: string; text: string }[]
  correctOptionId: string
  explanation?: string
}

export type QuizContent = {
  id: string
  title: string
  questions: QuizQuestion[]
}

// Questões de exemplo. Cada conteúdo possui sua própria lista.

export const quizContents: QuizContent[] = [
  {
    id: 'revisao-lingua-portuguesa',
    title: 'Revisão - Língua Portuguesa - 2º ano',
    questions: [
      {
        id: 'reportagem-caracteristicas',
        base: {
          type: 'text',
          text:
            'Estudo mostra adolescentes cientes de que internet precisa melhorar\n\n' +
            'Uma pesquisa que ouviu mais de 500 adolescentes e jovens de 13 a 18 anos revelou diferentes percepções sobre o uso da internet. Metade dos entrevistados reconheceu que passa tempo demais no ambiente digital, enquanto 63% afirmaram sentir felicidade ao se conectar.\n\n' +
            'O levantamento também mostrou que 71% dos participantes defendem a continuidade da internet, mas consideram necessárias mudanças.',
          source:
            'GANDRA, Alana. Agência Brasil, 12 ago. 2026. Texto adaptado.',
        },
        prompt:
          '1. Uma característica do gênero reportagem presente no texto é:',
        options: [
          {
            id: 'a',
            text: 'A apresentação de acontecimentos fictícios.',
          },
          {
            id: 'b',
            text: 'A utilização de dados para abordar um assunto de interesse público.',
          },
          {
            id: 'c',
            text: 'A defesa exclusiva de uma opinião pessoal.',
          },
          {
            id: 'd',
            text: 'A ausência de informações verificáveis.',
          },
          {
            id: 'e',
            text: 'A apresentação de acontecimentos exclusivamente por meio de relatos pessoais.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'A reportagem é um gênero jornalístico que investiga e apresenta assuntos de interesse público. No texto, os resultados da pesquisa e os percentuais de 50%, 63% e 71% fornecem dados que sustentam as informações apresentadas.',
      },
      {
        id: 'funcao-dados-estatisticos',
        base: {
          type: 'text',
          text:
            'Uma pesquisa com mais de 500 adolescentes revelou que metade dos entrevistados reconheceu passar tempo demais na internet, 63% afirmaram sentir felicidade ao se conectar e 71% defenderam a continuidade da internet, mas consideraram necessárias mudanças.',
          source:
            'GANDRA, Alana. Agência Brasil, 12 ago. 2026. Texto adaptado.',
        },
        prompt:
          '2. Qual é a principal função dos dados estatísticos apresentados na reportagem?',
        options: [
          {
            id: 'a',
            text: 'Apresentar opiniões pessoais sem necessidade de comprovação.',
          },
          {
            id: 'b',
            text: 'Substituir as informações por relatos fictícios.',
          },
          {
            id: 'c',
            text: 'Tornar o texto mais subjetivo e emocional.',
          },
          {
            id: 'd',
            text: 'Sustentar as informações e conferir maior credibilidade à reportagem.',
          },
          {
            id: 'e',
            text: 'Demonstrar que todos os adolescentes possuem os mesmos hábitos digitais.',
          },
        ],
        correctOptionId: 'd',
        explanation:
          'Os dados estatísticos funcionam como evidências que sustentam as informações jornalísticas. Os percentuais apresentados ajudam o leitor a compreender os resultados da pesquisa e conferem maior precisão e credibilidade à reportagem.',
      },
      {
        id: 'modalizador-avaliativo',
        base: {
          type: 'text',
          text:
            '“Metade dos entrevistados reconheceu que passa tempo demais no ambiente digital.”',
          source:
            'GANDRA, Alana. Agência Brasil, 12 ago. 2026. Trecho adaptado.',
        },
        prompt:
          '3. Que efeito seria produzido pela inclusão do modalizador avaliativo “infelizmente” no início desse enunciado?',
        options: [
          {
            id: 'a',
            text: 'Reforçaria a objetividade da reportagem.',
          },
          {
            id: 'b',
            text: 'Evidenciaria uma avaliação negativa do enunciador, introduzindo uma marca de subjetividade.',
          },
          {
            id: 'c',
            text: 'Indicaria incerteza quanto aos resultados da pesquisa.',
          },
          {
            id: 'd',
            text: 'Estabeleceria uma obrigação para os adolescentes.',
          },
          {
            id: 'e',
            text: 'Expressaria uma possibilidade de mudança no comportamento dos entrevistados.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          '“Infelizmente” é um modalizador avaliativo que expressa um julgamento negativo do enunciador. Sua inclusão acrescentaria subjetividade ao enunciado, pois, além de informar um resultado da pesquisa, o texto passaria a apresentar uma avaliação sobre esse resultado.',
      },
      {
        id: 'modalizadores-certeza-possibilidade',
        base: {
          type: 'text',
          text:
            'I. “Certamente, a internet influencia o comportamento dos adolescentes.”\n\n' +
            'II. “Possivelmente, novas medidas melhorarão a segurança digital.”',
          source:
            'Enunciados da atividade de revisão.',
        },
        prompt:
          '4. Qual alternativa explica corretamente os efeitos de sentido dos modalizadores presentes nos enunciados?',
        options: [
          {
            id: 'a',
            text: 'Ambos expressam certeza absoluta sobre os acontecimentos.',
          },
          {
            id: 'b',
            text: '“Certamente” expressa dúvida, enquanto “possivelmente” indica obrigação.',
          },
          {
            id: 'c',
            text: 'Ambos apresentam julgamentos negativos sobre o uso da internet.',
          },
          {
            id: 'd',
            text: '“Certamente” indica possibilidade, enquanto “possivelmente” expressa certeza.',
          },
          {
            id: 'e',
            text: '“Certamente” reforça a certeza, enquanto “possivelmente” apresenta uma hipótese.',
          },
        ],
        correctOptionId: 'e',
        explanation:
          'Os dois termos são modalizadores epistêmicos, pois indicam o grau de certeza do enunciador. “Certamente” reforça a convicção em relação à afirmação. Já “possivelmente” reduz esse grau de certeza e apresenta a informação como uma possibilidade, não como um fato assegurado.',
      },
      {
        id: 'eca-modalizacao',
        base: {
          type: 'text',
          text:
            'Estatuto da Criança e do Adolescente (ECA)\n\n' +
            'Art. 16. O direito à liberdade compreende os seguintes aspectos:\n' +
            'I – ir, vir e estar nos logradouros públicos e espaços comunitários, ressalvadas as restrições legais;\n' +
            'II – opinião e expressão;\n' +
            'III – crença e culto religioso;\n' +
            'IV – brincar, praticar esportes e divertir-se; [...]',
          source:
            'BRASIL. Lei nº 8.069/1990. Estatuto da Criança e do Adolescente, art. 16. Presidência da República. Trecho selecionado.',
        },
        prompt:
          '5. Considerando a finalidade do ECA, por que o texto apresenta direitos de maneira afirmativa, em vez de empregar expressões como “talvez” ou “possivelmente”?',
        options: [
          {
            id: 'a',
            text: 'Porque busca manifestar uma opinião subjetiva sobre a liberdade.',
          },
          {
            id: 'b',
            text: 'Porque estabelece garantias legais, e não hipóteses sobre os direitos das crianças e dos adolescentes.',
          },
          {
            id: 'c',
            text: 'Porque pretende demonstrar incerteza quanto aos direitos apresentados.',
          },
          {
            id: 'd',
            text: 'Porque apresenta apenas sugestões que podem ser seguidas pelos responsáveis.',
          },
          {
            id: 'e',
            text: 'Porque procura convencer o leitor da importância da liberdade por meio de argumentos pessoais.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'O ECA é uma lei de caráter normativo que estabelece direitos e garantias. Por isso, o artigo 16 apresenta esses direitos de maneira afirmativa. Expressões como “talvez” ou “possivelmente” indicariam dúvida ou hipótese, efeitos incompatíveis com a finalidade de estabelecer garantias legais nesse trecho.',
      },
      {
        id: 'fato-opiniao',
        base: {
          type: 'text',
          text:
            'Uma pesquisa com adolescentes revelou que 63% dos entrevistados afirmaram sentir felicidade ao se conectar à internet.',
          source:
            'GANDRA, Alana. Agência Brasil, 12 ago. 2026. Texto adaptado.',
        },
        prompt:
          '6. Qual alternativa apresenta corretamente a diferença entre fato e opinião, com exemplos relacionados ao uso da internet?',
        options: [
          {
            id: 'a',
            text: 'Fato é um julgamento pessoal; opinião é uma informação que pode ser comprovada.',
          },
          {
            id: 'b',
            text: 'Fato e opinião são informações equivalentes, pois ambos expressam certezas.',
          },
          {
            id: 'c',
            text: 'Fato é uma informação verificável, como um resultado de pesquisa; opinião é um julgamento pessoal, como afirmar que a internet faz mais mal do que bem.',
          },
          {
            id: 'd',
            text: 'Fato é sempre uma informação positiva; opinião apresenta apenas aspectos negativos.',
          },
          {
            id: 'e',
            text: 'Fato é uma hipótese sem comprovação; opinião é sempre sustentada por dados estatísticos.',
          },
        ],
        correctOptionId: 'c',
        explanation:
          'Fato é uma informação que pode ser verificada por meio de evidências, como os resultados de uma pesquisa. Opinião é um posicionamento ou julgamento sobre determinado assunto. Assim, informar que 63% dos entrevistados declararam sentir felicidade ao se conectar apresenta um dado verificável da pesquisa, enquanto afirmar que “a internet faz mais mal do que bem” expressa uma avaliação.',
      },
    ],
  },
];

