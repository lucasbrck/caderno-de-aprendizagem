# Quiz por conteúdo

Acesse `/quiz` ou **Quiz** no cabeçalho para escolher um conteúdo. Cada conteúdo tem sua própria lista e endereço, como `/quiz/2-reg` e `/quiz/6-reg`.

Edite `quizContents` em `src/data/quiz.ts` para cadastrar conteúdos e substituir as questões de exemplo. Use um `id` único por conteúdo (sem espaços, adequado para URL) e IDs de questões únicos dentro de cada lista.

```ts
{
  id: '2-reg',
  title: '2 REG',
  questions: [
    {
      id: 'questao-1',
      base: {
        type: 'text',
        text: 'Os alunos leram um livro.\nDepois, conversaram sobre a história.',
        source: 'Texto elaborado para esta atividade.',
      },
      prompt: 'Qual ação os alunos realizaram primeiro?',
      options: [
        { id: 'a', text: 'Leram um livro.' },
        { id: 'b', text: 'Conversaram sobre a história.' },
      ],
      correctOptionId: 'a',
      explanation: 'A primeira frase apresenta a leitura.',
    },
  ],
}
```

O campo `base` é opcional e aparece antes da pergunta, tanto na atividade quanto na revisão. Para usar uma imagem, coloque o arquivo em `public/images/` e substitua `base` por:

```ts
base: {
  type: 'image',
  src: '/images/texto-base.png',
  alt: 'Descrição do conteúdo da imagem para quem utiliza leitor de tela.',
  source: 'Autor, título da obra, publicação e ano.',
},
```

`source` é a referência bibliográfica exibida como fonte e pode ser usada nos dois tipos de base. O texto preserva as quebras de linha. A imagem mantém suas proporções e se ajusta à largura disponível.

Cada questão precisa de uma pergunta (`prompt`), pelo menos duas alternativas com IDs únicos e uma resposta correta (`correctOptionId`). `explanation` é opcional. Uma lista vazia exibe uma mensagem de indisponibilidade; um conteúdo inexistente exibe uma mensagem com link de retorno.

As escolhas podem ser alteradas antes da conclusão. O resultado aparece depois de responder tudo e finalizar. Cada conteúdo inicia uma tentativa independente. As respostas ficam apenas na memória; sair ou recarregar descarta a tentativa. O gabarito está no cliente, destinado à prática, não a avaliações com respostas sigilosas.
