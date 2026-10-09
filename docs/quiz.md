# Quiz

Acesse `/quiz` ou o link **Quiz** no cabeçalho. Edite `src/data/quiz.ts` para substituir as questões de exemplo.

```ts
const questions: QuizQuestion[] = [
  {
    id: 'questao-1',
    prompt: 'Qual palavra é um substantivo?',
    options: [
      { id: 'a', text: 'Alegria' },
      { id: 'b', text: 'Correr' },
    ],
    correctOptionId: 'a',
    explanation: 'Alegria dá nome a um sentimento.', // Opcional
  },
]
```

Cada questão deve ter um ID único, um enunciado, pelo menos duas alternativas com IDs únicos dentro da questão e exatamente uma resposta correta, indicada por `correctOptionId`.

O componente `Quiz`, em `src/components/Quiz.tsx`, também recebe a lista diretamente: `<Quiz title="Meu quiz" questions={questions} />`. Uma alteração no conteúdo da lista inicia uma nova tentativa. Uma lista vazia exibe uma mensagem de indisponibilidade.

As escolhas podem ser alteradas antes da conclusão. O resultado e as explicações aparecem após responder todas as questões e finalizar. As respostas ficam apenas na memória da página; recarregar ou sair descarta a tentativa. O gabarito está no cliente: este recurso é destinado à prática, não a avaliações com respostas sigilosas.
