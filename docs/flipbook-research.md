# Realismo e animação de um livro em CSS

## Direção recomendada

Para uma apresentação escolar com duas telas, a solução recomendada é combinar uma capa ilustrada, geometria de capa dura em CSS e animação localizada na folha. O objeto deve continuar reconhecível quando está parado: lombada, espessura do miolo, textura e luz precisam estabelecer sua forma antes da interação. A navegação pode então abrir a capa ou girar a página em torno da encadernação.

Esta é uma recomendação de implementação para este projeto, não o resultado de um benchmark entre bibliotecas. O objetivo é demonstrar a experiência de um livro sem exigir um renderizador 3D ou modificar a futura integração da videoaula com a API.

## Comparação das alternativas

| Abordagem                  | Vantagem                                                       | Limitação                                                                 | Decisão                                 |
| -------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------- |
| CSS 3D com faces separadas | Controle da capa, lombada e profundidade usando elementos HTML | A folha continua sendo uma superfície plana                               | Aplicada                                |
| Rotação de toda a tela     | Implementação curta                                            | Cabeçalhos e índice giram junto; pouca relação com um livro físico        | Substituída por rotação da capa/folha   |
| View Transition API        | Coordena estados anterior e posterior da interface             | Capturas de tela não criam espessura nem curvatura do papel por si mesmas | Alternativa futura, não necessária aqui |
| Malha deformável em WebGL  | Permite simular curvatura contínua                             | Acrescenta renderização, integração e manutenção a avaliar                | Fora do escopo da demonstração          |

A API de View Transitions captura estados da interface e oferece eventos/promessas para coordenar sua atualização. Isso pode ajudar em transições entre layouts, mas é uma ferramenta de composição de vistas, não um modelo físico de livro.[1] A avaliação das demais alternativas é uma análise de arquitetura, não uma alegação de superioridade universal.

## Construção do volume

A propriedade `perspective` representa a distância do observador ao plano de referência. Ela deve estar no contêiner da cena para que os elementos compartilhem a mesma projeção.[2] Neste projeto, a capa usa perspectiva de 1800 px e o livro aberto, 1900 px. Esses valores são escolhas visuais moderadas, não padrões prescritos pelas fontes.

O livro fechado tem placa traseira, miolo, borda lateral, borda inferior, lombada e capa frontal. As faces ocupam profundidades distintas com `translateZ`, `rotateX` e `rotateY`. A borda lateral recebe linhas repetidas que sugerem folhas. Uma sombra difusa separada representa o contato com a superfície.

O experimento original de Marco Barria no Codrops também constrói a capa dura com partes separadas e usa durações diferentes para as páginas. É uma referência visual de 2013, não uma biblioteca atual nem evidência suficiente de compatibilidade presente.[3] As regras técnicas foram confrontadas com a documentação da MDN.

## Preservação das camadas 3D

`transform-style: preserve-3d` mantém os descendentes no espaço tridimensional, mas não é herdado automaticamente. Certos valores de agrupamento, como opacidade menor que 1, filtros e `overflow: hidden`, podem achatar esse contexto mesmo quando `preserve-3d` está declarado.[4]

Por isso, o contêiner geométrico não recebe filtros ou uma animação de transparência. A sombra desfocada fica em outro elemento. O brilho e as sombras da folha são camadas decorativas independentes. O livro aberto usa `overflow: visible`, permitindo que a folha ultrapasse a encadernação durante a rotação.

`backface-visibility: hidden` evita que o conteúdo apareça espelhado no verso.[5] A capa tem uma face interna separada, com cor de papel e uma borda de encadernação. A folha da aula esconde a face traseira enquanto gira.

## Movimento e navegação

A capa gira pelo lado esquerdo, mantendo o ponto de fixação na lombada. Nas aulas, apenas o artigo gira: o índice e os controles externos permanecem estáveis. Capítulos anteriores e posteriores recebem direções opostas. A abertura da capa dura e a virada das folhas têm animações distintas.

A duração de saída é de 680 ms; a entrada da folha dura 620 ms. Esses tempos são ajustes de apresentação e devem ser reavaliados se a experiência passar a exigir navegação frequente. O conteúdo muda após a saída. Como são duas fases consecutivas, a transição completa é mais longa que uma única animação de 680 ms.

A navegação continua apoiada em links reais. Cliques com modificadores não são interceptados. Um bloqueio transitório evita que cliques repetidos iniciem várias trocas concorrentes, e o temporizador é cancelado ao mudar de rota ou desmontar a tela. Rotas continuam acessíveis diretamente e pelo histórico do navegador.

Esta técnica aproxima a virada com uma superfície rígida. Ela não reproduz uma dobra contínua, a elasticidade de uma folha ou uma simulação física de colisões. Uma malha deformável seria uma investigação separada se esse nível de realismo fosse necessário.

## Arte, materiais e legibilidade

A capa usa uma ilustração raster original com tecido azul-petróleo, ornamentação dourada e páginas que se transformam em paisagens. O título permanece em HTML para preservar leitura, seleção, acessibilidade e edição. Os capítulos aparecem como marcadores de papel ao lado do livro, deixando a arte visível.

Luz, lombada e textura têm funções distintas: a imagem fornece detalhes de impressão; a geometria estabelece profundidade; os gradientes representam a iluminação. Essa separação permite ajustar o ângulo sem embutir uma perspectiva incompatível na imagem.

O movimento do ponteiro inclina o livro em poucos graus somente quando há ponteiro preciso, suporte a hover e ausência da preferência por movimento reduzido. O efeito não exige cliques nem interfere com a navegação. Em telas estreitas, os marcadores ficam abaixo da capa.

## Desempenho e acessibilidade

O guia de animações do web.dev recomenda priorizar `transform` e `opacity` e investigar o impacto das demais propriedades no pipeline de renderização.[6] As viradas usam transformações; a sombra dinâmica da folha varia em opacidade em uma camada decorativa. Sombras de contato permanecem estáticas. O brilho da capa também varia com o ponteiro e pode causar pintura: não se afirma que toda a interface seja executada exclusivamente no compositor.

A ilustração é um arquivo local carregado como imagem, com dimensões declaradas e prioridade alta por estar na primeira tela. Não foi adicionada biblioteca de animação ao aplicativo. A quantidade de camadas permanece limitada ao livro.

A preferência `prefers-reduced-motion` identifica usuários que pedem redução de movimentos não essenciais.[7] Nessa condição, a navegação não aguarda a virada, as animações são removidas e a inclinação por ponteiro é desativada. O livro preserva uma perspectiva estática.

A capa é um link operável por teclado. Os marcadores também são links, com foco visível. A imagem decorativa tem texto alternativo vazio porque o título e a ação já estão disponíveis em HTML. A videoaula permanece como prévia estática enquanto nenhum identificador do YouTube é fornecido.

## Critérios de verificação

Verificar build de produção e tipos; abertura pela capa e pelos quatro marcadores; anterior, próximo e retorno à capa; histórico; navegação direta; cliques repetidos; foco por teclado; redução de movimento; imagem carregada; e ausência de rolagem horizontal em celular. O teste de uma máquina não comprova fluidez em todos os dispositivos: Safari, Firefox e aparelhos de entrada continuam sendo alvos úteis antes de publicação.

## Fontes

1. MDN Web Docs. [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) e [Using the View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using). Documentação consultada em 13/09/2026.
2. MDN Web Docs. [perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective). Documentação consultada em 13/09/2026.
3. Marco Barria, Codrops. [Animated Books with CSS 3D Transforms](https://tympanus.net/codrops/2013/07/11/animated-books-with-css-3d-transforms/). Publicado em 11/07/2013; consultado em 13/09/2026.
4. MDN Web Docs. [transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style). Documentação consultada em 13/09/2026.
5. MDN Web Docs. [backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backface-visibility). Documentação consultada em 13/09/2026.
6. Kayce Basques e Rachel Andrew, web.dev. [How to create high-performance CSS animations](https://web.dev/articles/animations-guide). Documentação consultada em 13/09/2026.
7. MDN Web Docs. [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). Documentação consultada em 13/09/2026.

## Verificação executada

O build de produção (`npm run build`) passou. A verificação automatizada em Chromium confirmou carregamento da capa, links de capítulos, próximo/anterior, fechamento, retorno pelo histórico, abertura por teclado, rota direta e ausência de erros JavaScript. A preferência por movimento reduzido removeu a animação, e as larguras de 320 e 390 px não apresentaram rolagem horizontal nos cenários verificados. As capturas de desktop e celular foram inspecionadas visualmente. Outros motores de navegador não foram executados nesta verificação.
