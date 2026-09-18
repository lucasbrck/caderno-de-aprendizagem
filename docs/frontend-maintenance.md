# Manutenção do frontend

## Onde alterar cada coisa

- `src/data.ts`: dados da escola; `src/data/lessons.ts`: dados das aulas; a ordem de `lessons` define a ordem dos capítulos.
- `src/pages/`: composição da capa e da aula.
- `src/components/`: blocos visuais. `ChapterLink` compartilha o link e o conteúdo entre marcadores e índice, com variantes `bookmark` e `index`. `Eyebrow`, `BookHint` e `CoverLink` evitam repetir estilos compartilhados.
- `src/components/BookCover.tsx`: livro fechado, inclinação pelo ponteiro e marcadores.
- `src/components/BookPage.tsx`: folha animada; `LessonIndex`, `LessonMedia` e `ChapterNavigation` organizam o conteúdo das aulas.
- `src/hooks/usePageTransition.ts`: coordena cliques internos, direção e momento da troca de página.
- `tailwind.config.js`: cores, fontes, breakpoints exatos do visual original e animações.
- `src/book-effects.css`: geometria 3D e texturas que ficam mais legíveis em CSS.

Os componentes recebem dados por propriedades tipadas. Use `cn` de `src/lib/utils.ts` para combinar classes condicionais e permitir substituir utilitários em componentes que aceitam `className`. Não extraia cada `div`: crie componentes quando existir reutilização ou uma responsabilidade própria.

## O que faz o main.tsx

O navegador carrega `index.html`, que contém `<div id="root">` e importa `src/main.tsx`. Esse arquivo é o ponto de entrada da aplicação:

1. Importa o React, os providers, o roteador e `index.css`. Este CSS importa os efeitos do livro antes de processar as camadas do Tailwind.
2. Cria uma instância de `QueryClient` fora da renderização. Ela mantém o cache de consultas durante a vida da aplicação.
3. `ReactDOM.createRoot(...)` conecta o React à `div` do HTML. O `!` informa ao TypeScript que o elemento existe; ele não cria o elemento nem faz uma validação em tempo de execução.
4. `.render(...)` inicia a árvore de componentes.
5. `StrictMode` ativa verificações adicionais em desenvolvimento, incluindo um ciclo extra de configuração/limpeza de efeitos. Isso ajuda a revelar efeitos sem limpeza; não significa duas telas em produção.
6. `QueryClientProvider` disponibiliza o cliente do React Query aos componentes. As aulas atuais vêm de `data/lessons.ts`; esse provider não faz requisições automaticamente.
7. `RouterProvider` conecta a árvore de rotas à URL atual.

Fluxo: **HTML → main.tsx → providers → router → AppShell → Outlet → página**.

## Como funciona o roteador

Este projeto usa **TanStack Router** (`@tanstack/react-router`), não a biblioteca **React Router** (`react-router`). As duas resolvem navegação em React, mas têm APIs diferentes. Não misture exemplos e imports das duas bibliotecas.

Em `src/router.tsx`, `createRootRoute` define o layout compartilhado (`AppShell`). As rotas filhas são `/` (`HomePage`) e `/aula/$lessonId` (`LessonPage`). `createRouter` recebe essa árvore. O registro de tipos no final do arquivo permite verificar caminhos e parâmetros no TypeScript.

`AppShell` mantém cabeçalho, rodapé e área principal. O `<Outlet />` é o local em que o roteador renderiza a página filha. Um `<Link to="/aula/$lessonId" params={{ lessonId: lesson.id }}>` constrói a URL da aula sem recarregar o documento inteiro. Na página, `useParams({ from: '/aula/$lessonId' })` lê o identificador e localiza a aula em `lessons`.

O histórico do navegador continua funcionando. Uma URL de aula com identificador inexistente mostra a mensagem de capítulo não encontrado; uma rota desconhecida mantém o comportamento anterior de mostrar a capa. No servidor de produção, o acesso direto a `/aula/...` exige servir `index.html` como fallback de rotas da aplicação.

A virada de página **não é um recurso automático do roteador**. `usePageTransition` intercepta cliques internos comuns, inicia a animação e chama `navigate` após 680 ms. Links externos, downloads, âncoras, cliques modificados e preferência por movimento reduzido mantêm seu fluxo normal. Uma referência impede agendar várias navegações durante a mesma virada; os temporizadores são limpos ao mudar a rota e ao desmontar o componente. Após navegar, o código atualiza o título e leva o foco à área principal.

## Estilos e animações

Use utilitários Tailwind no JSX para layout, espaçamentos, tipografia e estados. Valores específicos do desenho, como `text-[11px]`, preservam a aparência original. As fontes são `font-sans` (DM Sans) e `font-display` (Libre Caslon Display). Cores recorrentes do livro ficam em `colors.book`.

Os breakpoints nomeados preservam os limites antigos: `compact` até 1000 px, `tablet` até 800 px, `bookmarks` até 720 px, `mobile` até 480 px, `tiny` até 400 px, `wide` a partir de 1500 px e `short-desktop` para largura a partir de 1100 px e altura até 850 px. Os máximos são inclusivos; não substitua esses valores pelos breakpoints padrão sem revisar o visual.

As classes de animação são geradas por `theme.extend.keyframes` e `theme.extend.animation`, seguindo a documentação do **Tailwind 3**, versão usada aqui:

- `animate-hardcover-open` e `animate-hardcover-close`: capa.
- `animate-leaf-in`, `animate-leaf-out` e variantes `-back`: folha e sentido da virada.
- `animate-leaf-shading-in` e `animate-leaf-shading-out`: sombra da folha.

O contêiner `group/book` publica `data-state`, `data-direction` e `data-transition`. Os componentes selecionam as animações com variantes como `motion-safe:group-data-[state=turning]/book:animate-hardcover-open`. O sombreado usa a variante `after:`. Mantenha nomes completos em strings para que o Tailwind encontre as classes no build; não construa `animate-${nome}` dinamicamente.

As durações ficam em `src/styles/book-motion.js`, compartilhado pelo Tailwind e pelo temporizador de navegação. Sua declaração `.d.ts` permite importá-lo no TypeScript. Para alterar a duração da saída, ajuste `PAGE_TURN_MS` uma vez; a navegação e a animação permanecem sincronizadas. Para alterar o movimento, edite os keyframes. `motion-safe`, `motion-reduce` e a proteção global de movimento reduzido preservam a acessibilidade, inclusive nos pseudo-elementos.

Não adicione `opacity`, `filter` ou `overflow: hidden` aos pais com `transform-style: preserve-3d`: isso pode achatar a capa e as bordas. As sombras ficam em elementos separados; `overflow-x: clip` limita a projeção horizontal sem achatar o livro.

## Adicionar uma aula

Adicione um objeto compatível com `Lesson` em `lessons`, com `id` único e estável. O índice, os marcadores, os links anterior/próximo e o total de capítulos são derivados da lista. As quatro cores de marcadores se repetem para capítulos adicionais. Configure o conteúdo em `src/data/lessons.ts`: `youtubeId` tem prioridade; sem ele, `googleSlidesIframe` aceita o código `<iframe>` fornecido pelo Google Slides ou apenas sua URL de incorporação. Sem nenhum dos dois, a prévia é mantida.

Exemplo de configuração de uma aula com apresentação:

```ts
youtubeId: '',
googleSlidesIframe: `<iframe src="https://docs.google.com/presentation/d/e/SEU_ID_PUBLICADO/embed?start=false&loop=false&delayms=3000" allowfullscreen="true"></iframe>`,
```

Substitua o exemplo pelo iframe real obtido em **Arquivo → Compartilhar → Publicar na Web → Incorporar**, conforme a [documentação do Google](https://support.google.com/docs/answer/183965). A apresentação precisa estar acessível aos alunos.

O componente extrai apenas o `src`, preservando os parâmetros de apresentação. O HTML configurado não é inserido na página; dimensões, título acessível e tela cheia são definidos pelo próprio componente. Somente URLs HTTPS de incorporação do Google Slides (`/embed`, `/pubembed` ou `/preview`) são aceitas; valores inválidos mantêm a prévia. O contêiner continua responsivo em 16:9 e oferece o link “Abrir apresentação”. Revise o layout caso aumente muito a quantidade de capítulos.

## Conferência após alterações

Execute `npm run build` para verificar TypeScript e o bundle. Confira capa e aulas em desktop e celular, inclusive próximo dos breakpoints; abertura, retorno, primeiro/último capítulo, histórico, acesso direto, capítulo inválido, navegação por teclado, cliques repetidos e movimento reduzido. Ao alterar a mídia, confira YouTube, Slides (iframe completo e URL), ambos preenchidos (prioridade do YouTube), configuração vazia e iframe inválido.

Referências oficiais:

- [Tailwind 3: animações personalizadas](https://v3.tailwindcss.com/docs/animation#customizing-your-theme)
- [Tailwind 3: movimento reduzido](https://v3.tailwindcss.com/docs/animation#prefers-reduced-motion)
- [TanStack Router: Outlet](https://tanstack.com/router/latest/docs/framework/react/guide/outlets)
