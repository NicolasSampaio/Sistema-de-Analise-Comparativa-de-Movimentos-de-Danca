# User Stories do Projeto: Sistema de Análise Comparativa de Movimentos de Dança

## Índice

- [Épico 1: Fundação do Projeto e Interface do Usuário Inicial](#épico-1-fundamento-do-projeto-e-interface-do-usuário-inicial)
  - [Story 1.1: Iniciar a aplicação desktop](#story-11-iniciar-a-aplicação-desktop)
  - [Story 1.2: Selecionar dois arquivos de vídeo](#story-12-selecionar-dois-arquivos-de-vídeo)
- [Épico 2: Integração Básica com Backend Python](#épico-2-integração-básica-com-backend-python)
  - [Story 2.1: Chamar script Python ao iniciar comparação](#story-21-chamar-script-python-ao-iniciar-comparação)
  - [Story 2.2: Exibir resultado placeholder da comparação](#story-22-exibir-resultado-placeholder-da-comparação)
- [Épico 3: Processamento de Vídeo e Extração de Pose com Normalização](#épico-3-processamento-de-vídeo-e-extração-de-pose-com-normalização)
  - [Story 3.1: Extrair landmarks de pose dos vídeos](#story-31-extrair-landmarks-de-pose-dos-vídeos)
  - [Story 3.2: Normalizar dados de pose por tamanho](#story-32-normalizar-dados-de-pose-por-tamanho)
  - [Story 3.3: Normalizar dados de pose por posição](#story-33-normalizar-dados-de-pose-por-posição)
  - [Story 3.4: Registrar timestamps dos frames processados](#story-34-registrar-timestamps-dos-frames-processados)
- [Épico 4: Motor de Comparação de Movimento](#épico-4-motor-de-comparação-de-movimento)
  - [Story 4.1: Implementar representação vetorial híbrida da pose](#story-41-implementar-representação-vetorial-híbrida-da-pose)
  - [Story 4.2: Implementar ponderação de landmarks na UI e lógica](#story-42-implementar-ponderação-de-landmarks-na-ui-e-lógica)
  - [Story 4.3: Comparar sequências de pose usando DTW](#story-43-comparar-sequências-de-pose-usando-dtw)
  - [Story 4.4: Implementar análise opcional de ritmo/velocidade](#story-44-implementar-análise-opcional-de-ritmovelocidade)
  - [Story 4.5: Parametrizar sensibilidade da comparação de poses](#story-45-parametrizar-sensibilidade-da-comparação-de-poses)
- [Épico 5: Integração Final, Testes e Geração de Resultados](#épico-5-integração-final-testes-e-geração-de-resultados)
  - [Story 5.1: Utilizar parâmetros da UI no motor de comparação](#story-51-utilizar-parâmetros-da-ui-no-motor-de-comparação)
  - [Story 5.2: Exibir score final de similaridade na UI](#story-52-exibir-score-final-de-similaridade-na-ui)
  - [Story 5.3: Salvar resultados detalhados em arquivo](#story-53-salvar-resultados-detalhados-em-arquivo)
  - [Story 5.4: Testar sistema com vídeos de K-pop e Sapateado](#story-54-testar-sistema-com-vídeos-de-k-pop-e-sapateado)

## Épico 1: Fundação do Projeto e Interface do Usuário Inicial

### Story 1.1: Iniciar a aplicação desktop

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero conseguir iniciar a aplicação desktop
- Para que eu possa acessar suas funcionalidades

**Acceptance Criteria (ACs):**

1.  A aplicação Electron é compilada e executada com sucesso em ambiente de desenvolvimento.
2.  Uma janela principal da aplicação é exibida ao iniciar.
3.  A janela principal exibe o título da aplicação conforme especificado (se houver).
4.  Não ocorrem erros críticos (que impeçam a inicialização) no console durante a inicialização.
5.  O processo da aplicação pode ser finalizado de forma limpa pelo usuário (fechando a janela).

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2): Configurar o projeto Electron básico com uma janela principal.
  - [ ] Subtask 1.1: Inicializar um novo projeto Node.js com as dependências do Electron.
  - [ ] Subtask 1.2: Criar o arquivo `main.js` (ou similar) para o processo principal do Electron.
  - [ ] Subtask 1.3: Configurar `main.js` para criar uma `BrowserWindow` na inicialização.
  - [ ] Subtask 1.4: Criar um arquivo HTML básico (ex: `index.html`) para ser carregado na `BrowserWindow`.
- [ ] Task 2 (AC: 1): Adicionar scripts ao `package.json` para compilar (se necessário) e iniciar a aplicação Electron.
- [ ] Task 3 (AC: 3): Definir o título da janela da aplicação.
- [ ] Task 4 (AC: 4): Verificar logs de inicialização para garantir ausência de erros críticos.
- [ ] Task 5 (AC: 5): Testar o fechamento da aplicação e verificar se todos os processos relacionados são encerrados.

**Dev Technical Guidance:**

- Consultar `Architecture.md` seção "Definitive Tech Stack Selections" para versões de Electron e Node.js.
- Consultar `Frontend-Architecture.md` seção "Detailed Frontend Directory Structure" para a estrutura de arquivos do `app-ui`.
- O arquivo `main.js` será o ponto de entrada principal do Electron, conforme `Frontend-Architecture.md`.
- O conteúdo inicial da janela pode ser um placeholder simples, pois a HU 1.2 detalhará a interface de seleção de vídeos.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}

---

### Story 1.2: Selecionar dois arquivos de vídeo

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero uma interface onde eu possa selecionar dois arquivos de vídeo da minha máquina
- Para que eu possa prepará-los para a análise comparativa

**Acceptance Criteria (ACs):**

1.  A UI da aplicação principal exibe dois controles distintos e claramente identificados para "Selecionar Vídeo 1" e "Selecionar Vídeo 2".
2.  Clicar em qualquer um dos controles de seleção de vídeo abre um diálogo nativo do sistema operacional para seleção de arquivos.
3.  O diálogo de seleção de arquivos permite apenas a seleção de formatos de vídeo comuns (ex: `.mp4`, `.mov`, conforme definido em `Product.md` RF001).
4.  Após a seleção de um arquivo de vídeo válido, o caminho completo do arquivo selecionado (ou apenas o nome do arquivo, se preferível para a UI) é exibido na interface, próximo ao respectivo controle de seleção.
5.  Se o usuário cancelar a seleção de arquivo, a UI não deve ser alterada ou indicar erro, mantendo o estado anterior (nenhum arquivo selecionado ou o arquivo previamente selecionado).
6.  A interface permite que um vídeo selecionado seja substituído por outro, repetindo o processo de seleção.
7.  Os caminhos dos arquivos selecionados são armazenados internamente para uso subsequente (pela HU 2.1).

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1): Implementar os elementos da UI para os dois seletores de vídeo na tela principal da aplicação Angular.
  - [ ] Subtask 1.1: Criar ou atualizar o componente Angular principal (ex: `AnalysisSetupPageComponent` conforme `Frontend-Architecture.md`) para incluir os elementos visuais (botões, labels).
  - [ ] Subtask 1.2: Estilizar os seletores para clareza, conforme `Frontend-Architecture.md` seção "Styling and Theming".
- [ ] Task 2 (AC: 2, 3): Integrar com o `ElectronService` para abrir o diálogo de seleção de arquivos.
  - [ ] Subtask 2.1: No componente Angular, ao clicar no botão de seleção, chamar o método `electronService.showOpenDialog(...)` (conforme `Frontend-Architecture.md` seção "Electron Integration").
  - [ ] Subtask 2.2: Configurar as opções do diálogo para filtrar por tipos de arquivo de vídeo (ex: `{ filters: [{ name: 'Videos', extensions: ['mp4', 'mov'] }] }`).
- [ ] Task 3 (AC: 4, 6): Exibir o caminho/nome do arquivo selecionado na UI.
  - [ ] Subtask 3.1: No componente Angular, receber o caminho do arquivo do `ElectronService`.
  - [ ] Subtask 3.2: Atualizar a UI para mostrar o nome/caminho do arquivo selecionado.
- [ ] Task 4 (AC: 5): Tratar o cancelamento da seleção de arquivo.
- [ ] Task 5 (AC: 7): Armazenar os caminhos dos arquivos selecionados no estado da aplicação.
  - [ ] Subtask 5.1: Utilizar o `AnalysisStateService` (conforme `Frontend-Architecture.md` seção "State Management In-Depth") para armazenar os caminhos dos vídeos.
  - [ ] Subtask 5.2: Implementar os métodos `setVideoPrincipal(path: string | null)` e `addVideoComparacao(path: string)` (ou similar, para dois vídeos fixos) no `AnalysisStateService`.

**Dev Technical Guidance:**

- Utilizar o `FileInputComponent` do `SharedModule` se já estiver desenvolvido ou criar um componente similar, conforme `Frontend-Architecture.md` seção "Foundational/Shared Components".
- A comunicação entre o processo Renderer (Angular) e o Main (Electron) para abrir diálogos deve usar o `preload.js` e `ipcRenderer`/`ipcMain` conforme detalhado em `Frontend-Architecture.md` seção "IPC Communication (`preload.js`)".
- O `ElectronService` em Angular (`src/app/core/services/electron.service.ts`) deve encapsular a chamada `window.electronAPI.showOpenDialog`.
- Garantir que a validação de caminhos de arquivo (`PathValidator`) seja usada no processo principal do Electron ao receber caminhos do diálogo, conforme `Frontend-Architecture.md` seção "File Path Validation".
- Formatos de vídeo a serem suportados: `.mp4`, `.mov`.
- Consultar `Product.md` (RF001) e `Architecture.md` (Componente `app-ui`).

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

## Épico 2: Integração Básica com Backend Python

### Story 2.1: Chamar script Python ao iniciar comparação

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero um botão para "Iniciar Comparação" que possa chamar um script Python básico
- Para que os dados dos vídeos selecionados possam ser processados pelo backend

**Acceptance Criteria (ACs):**

1.  Um botão "Iniciar Comparação" está presente e visível na UI principal.
2.  O botão "Iniciar Comparação" está inicialmente desabilitado se os dois vídeos de entrada não tiverem sido selecionados.
3.  Uma vez que ambos os vídeos são selecionados, o botão "Iniciar Comparação" se torna habilitado.
4.  Ao clicar no botão "Iniciar Comparação" habilitado, o processo principal do Electron (ex: `main.js`) é notificado e recebe os caminhos dos dois arquivos de vídeo selecionados (armazenados no `AnalysisStateService`).
5.  O processo principal do Electron inicia o servidor Python `core-logic` (FastAPI) se ainda não estiver em execução, conforme especificado na seção "Gerenciamento do ciclo de vida do servidor `core-logic`" do `Architecture.md`.
6.  O processo principal do Electron, após garantir que o servidor FastAPI está rodando, faz uma chamada HTTP POST para o endpoint `/analises` do servidor `core-logic` (FastAPI), enviando os caminhos dos vídeos e quaisquer parâmetros de análise padrão.
7.  O script/servidor Python (`core-logic`) recebe a requisição HTTP, extrai os caminhos dos vídeos e confirma o recebimento (ex: logando no console do servidor ou retornando uma resposta HTTP básica de sucesso).
8.  A UI exibe uma indicação de que a análise está "Processando..." após o clique no botão e enquanto aguarda a resposta.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1): Implementar o botão "Iniciar Comparação" na UI Angular.
  - [ ] Subtask 1.1: Adicionar o elemento de botão ao template do componente Angular apropriado.
  - [ ] Subtask 1.2: Estilizar o botão conforme o design.
- [ ] Task 2 (AC: 2, 3): Controlar o estado habilitado/desabilitado do botão.
  - [ ] Subtask 2.1: No componente Angular, observar os caminhos dos vídeos do `AnalysisStateService`.
  - [ ] Subtask 2.2: Habilitar o botão somente quando ambos os caminhos de vídeo forem válidos.
- [ ] Task 3 (AC: 4): Lidar com o clique do botão na UI Angular.
  - [ ] Subtask 3.1: Ao clicar, chamar um método no `AnalysisStateService` (ex: `startAnalysis()`) que orquestrará a comunicação com o backend.
- [ ] Task 4 (AC: 5, 6): Implementar a lógica no processo principal do Electron (`main.js`) para gerenciar o servidor Python e chamar a API.
  - [ ] Subtask 4.1: No `ElectronService` (Angular), adicionar um método para solicitar o início da análise, que se comunicará com `main.js` via IPC (ex: `electronAPI.startAnalysis(videoPaths, params)`).
  - [ ] Subtask 4.2: Em `main.js`, implementar o handler IPC que:
    - Verifica/inicia o servidor FastAPI (usando `spawn` para `main_core_entry.py`, conforme `Architecture.md` e `Frontend-Architecture.md`). Deve-se aguardar a confirmação de que o servidor iniciou (health check no endpoint `/status` do FastAPI).
    - Após o servidor estar pronto, usa um cliente HTTP (ex: `axios` ou `node-fetch` no `main.js`, ou o Angular `HttpClient` se a chamada for feita diretamente do renderer após confirmação do `main.js` que o servidor está up) para fazer a requisição `POST /analises` para `http://localhost:PORTA_DO_FASTAPI/analises` com os dados da `AnaliseRequest`.
- [ ] Task 5 (AC: 7): Configurar o endpoint básico `/analises` no servidor Python/FastAPI (`core-logic/app/main.py`).
  - [ ] Subtask 5.1: Criar o arquivo `main_core_entry.py` que inicia o servidor Uvicorn com a aplicação FastAPI.
  - [ ] Subtask 5.2: Definir o endpoint `POST /analises` em FastAPI que aceita `AnaliseRequest` (conforme `Architecture.md` seção "Data Models").
  - [ ] Subtask 5.3: Inicialmente, este endpoint apenas loga os dados recebidos e retorna uma resposta de sucesso placeholder (ex: `{"status": "recebido", "mensagem": "Análise iniciada..."}`).
  - [ ] Subtask 5.4: Implementar o endpoint `GET /status` no FastAPI para o health check.
- [ ] Task 6 (AC: 8): Atualizar o estado da UI para "Processando...".
  - [ ] Subtask 6.1: O `AnalysisStateService` deve atualizar seu `analysisStatus$` para `'processing'` ao iniciar a chamada.
  - [ ] Subtask 6.2: A UI deve se inscrever no `analysisStatus$` e exibir uma mensagem/spinner de carregamento.

**Dev Technical Guidance:**

- **Comunicação Frontend -> Electron Main -> Python:**
  - Angular (`AnalysisSetupPageComponent`) -> `ElectronService` (método para iniciar análise) -> IPC para `main.js`.
  - `main.js` gerencia o ciclo de vida do servidor Python (`core-logic` FastAPI).
  - `main.js` (ou Angular `HttpClient` após sinalização do `main.js`) faz a chamada HTTP para a API FastAPI.
- **Servidor Python (`core-logic`):**
  - Usar FastAPI.
  - Ponto de entrada `main_core_entry.py` para iniciar Uvicorn.
  - Definir modelos Pydantic para `AnaliseRequest` e `AnaliseResponse` conforme `Architecture.md`. A `AnaliseResponse` inicial pode ser muito simples.
- **Porta da API:** A porta do FastAPI (ex: 8008) deve ser consistente ou configurável, conforme `Architecture.md`.
- Referenciar `Architecture.md` seções "High-Level Overview", "Component View", "API Reference (`core-logic` API)", e "Data Models".
- Referenciar `Frontend-Architecture.md` seções "State Management In-Depth (`AnalysisStateService.startAnalysis`)", "API Interaction Layer (`AnalysisApiService`)", e "Electron Integration (`ElectronService`, `preload.js`, `main.js` handlers para iniciar/gerenciar o servidor Python)".
- A gestão do servidor Python (iniciar/parar) pelo Electron é crucial. O `app-ui` (Electron Main) é responsável por iniciar o `core-logic` (FastAPI) e garantir que ele esteja rodando antes de enviar requisições. Ao fechar o `app-ui`, o Electron Main deve finalizar o servidor `core-logic`.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 2.2: Exibir resultado placeholder da comparação

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero ver uma área na UI onde o resultado da comparação será exibido
- Para que eu saiba o status da análise e, eventualmente, seu resultado (inicialmente um valor placeholder)

**Acceptance Criteria (ACs):**

1.  Existe uma seção claramente designada na UI principal para exibir o "Resultado da Similaridade".
2.  Inicialmente (antes de qualquer análise), esta seção exibe um valor placeholder indicando que nenhum resultado está disponível (ex: "--%", "Aguardando análise...").
3.  Após o `core-logic` (FastAPI) responder à requisição de análise (mesmo que com um placeholder de sucesso na HU 2.1), a UI nesta seção é atualizada para indicar que a resposta foi recebida (ex: "Análise concluída. Resultado: Placeholder").
4.  Se a chamada para o `core-logic` falhar (ex: erro de rede, servidor Python não respondeu, erro 500 do FastAPI), a UI nesta seção deve exibir uma mensagem de erro apropriada.
5.  O `AnalysisStateService` gerencia o estado do resultado da análise (`analysisResults$`, `analysisError$`, `analysisStatus$`).

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2): Implementar a seção de exibição de resultados na UI Angular.
  - [ ] Subtask 1.1: No template do componente Angular principal, adicionar os elementos HTML para mostrar o score/status.
  - [ ] Subtask 1.2: Estilizar a seção para destaque e clareza.
  - [ ] Subtask 1.3: Vincular o conteúdo desta seção aos Observables relevantes do `AnalysisStateService` (`analysisResults$`, `analysisStatus$`, `analysisError$`).
- [ ] Task 2 (AC: 3): Atualizar a UI com a resposta (placeholder) do backend.
  - [ ] Subtask 2.1: O `AnalysisStateService`, ao receber uma resposta bem-sucedida do `AnalysisApiService` (que chamou a API FastAPI), atualiza o `_analysisResults.next(response)` e `_analysisStatus.next('success')`.
  - [ ] Subtask 2.2: A UI reage a essa mudança e exibe os dados do `response` (que inicialmente será um placeholder).
- [ ] Task 3 (AC: 4): Tratar e exibir erros da API na UI.
  - [ ] Subtask 3.1: O `AnalysisStateService`, ao encontrar um erro na chamada da API, atualiza o `_analysisError.next(errorMessage)` e `_analysisStatus.next('error')`.
  - [ ] Subtask 3.2: A UI reage e exibe a mensagem de erro.
- [ ] Task 4 (AC: 5): Garantir que `AnalysisStateService` gerencia corretamente os estados de resultado, erro e status.

**Dev Technical Guidance:**

- A UI deve ser reativa às mudanças nos Observables `analysisResults$`, `analysisError$`, e `analysisStatus$` do `AnalysisStateService` (conforme `Frontend-Architecture.md` seção "State Management In-Depth").
- A resposta da API `core-logic` para `/analises` (definida em `Architecture.md` como `AnaliseResponse`) será inicialmente simples, mas a UI já deve estar preparada para consumir essa estrutura.
- O tratamento de erros HTTP deve ser robusto, possivelmente usando um `HttpInterceptor` em Angular para feedback global, e tratamento específico no `AnalysisApiService` ou `AnalysisStateService` se necessário, conforme `Frontend-Architecture.md` seção "Error Handling & Retries (Frontend)".

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

## Épico 3: Processamento de Vídeo e Extração de Pose com Normalização

### Story 3.1: Extrair landmarks de pose dos vídeos

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que o sistema, ao receber os caminhos dos vídeos através da API, consiga processá-los para extrair todos os landmarks de pose (33 pontos, coordenadas `x`,`y`,`z` e visibilidade) de cada frame usando `MediaPipe`
- Para que os dados brutos de movimento estejam disponíveis para normalização e análise.

**Acceptance Criteria (ACs):**

1.  O módulo `core-logic` (Python/FastAPI), ao receber uma chamada na API `/analises` com os caminhos dos vídeos, utiliza o `OpenCV` para abrir e ler cada vídeo frame a frame.
2.  Para cada frame processado de cada vídeo, a biblioteca `MediaPipe` (Pose Landmarker) é utilizada para detectar e extrair os 33 landmarks de pose.
3.  Para cada landmark detectado, as coordenadas `x`, `y`, `z` (com `z` sendo a profundidade estimada pelo MediaPipe) e o score de `visibilidade` são armazenados.
4.  O processamento continua até que todos os frames de ambos os vídeos tenham sido analisados ou o vídeo termine.
5.  Os dados de pose extraídos para cada vídeo são armazenados em uma estrutura de dados em memória organizada por vídeo e por frame (ex: uma lista de frames, onde cada frame contém uma lista de landmarks).
6.  O sistema lida adequadamente com frames onde nenhuma pose é detectada ou o MediaPipe falha na detecção para aquele frame (ex: registrando a ausência de dados para o frame, não quebrando o processo).
7.  (Opcional, mas recomendado para depuração) O sistema pode logar o número de frames processados e o número de poses detectadas por vídeo.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2, 3): Implementar a função de processamento de vídeo no `core-logic` (ex: dentro de `core-logic/video_processing/`).
  - [ ] Subtask 1.1: Criar uma função que recebe o caminho de um arquivo de vídeo.
  - [ ] Subtask 1.2: Usar `cv2.VideoCapture()` para abrir o vídeo.
  - [ ] Subtask 1.3: Iterar pelos frames do vídeo (`cap.read()`).
  - [ ] Subtask 1.4: Para cada frame, convertê-lo para o formato esperado pelo MediaPipe (ex: RGB).
  - [ ] Subtask 1.5: Utilizar a API `mediapipe.solutions.pose.Pose` para processar o frame e obter os landmarks.
  - [ ] Subtask 1.6: Extrair as coordenadas `x, y, z` e `visibility` para cada um dos 33 landmarks.
- [ ] Task 2 (AC: 4): Garantir que o loop de processamento de frames funcione corretamente até o final do vídeo.
- [ ] Task 3 (AC: 5): Estruturar e armazenar os dados de pose em memória.
  - [ ] Subtask 3.1: Definir uma estrutura de dados (ex: lista de dicionários ou objetos Pydantic) para representar os landmarks de um frame.
  - [ ] Subtask 3.2: Acumular essas estruturas de frame em uma lista maior para cada vídeo.
- [ ] Task 4 (AC: 6): Implementar tratamento para frames sem detecção de pose.
  - [ ] Subtask 4.1: Verificar se `results.pose_landmarks` (do MediaPipe) não é None antes de tentar acessar os landmarks.
  - [ ] Subtask 4.2: Decidir como representar um frame sem pose (ex: lista vazia de landmarks, um valor `None` para o frame).
- [ ] Task 5 (AC: 7): Adicionar logging básico para o processo de extração.
- [ ] Task 6 (AC: 1): Integrar esta funcionalidade no endpoint `/analises` do FastAPI.
  - [ ] Subtask 6.1: O endpoint agora chamará esta função de processamento de vídeo para cada vídeo fornecido na `AnaliseRequest`.
  - [ ] Subtask 6.2: Os dados de pose extraídos serão, por enquanto, apenas logados no servidor ou retornados de forma simplificada na `AnaliseResponse` (a HU 5.3 tratará do salvamento em arquivo).

**Dev Technical Guidance:**

- Consultar `Product.md` (RF002) e `Architecture.md` (módulo `core-logic/pose_estimation/`, Tecnologias Chave: Python, MediaPipe, OpenCV-Python).
- A inicialização do MediaPipe Pose Landmarker deve ser feita preferencialmente uma vez e reutilizada para processar os frames.
- Prestar atenção à documentação do MediaPipe para a estrutura dos resultados (`PoseLandmarkerResult`).
- O `z` fornecido pelo MediaPipe representa a profundidade com a origem no centro do quadril; `x` e `y` são normalizados para `[0.0, 1.0]`.
- O módulo `core-logic/video_processing/` pode conter utilitários para leitura de vídeo, enquanto `core-logic/pose_estimation/` conteria a lógica de MediaPipe.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 3.2: Normalizar dados de pose por tamanho

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que os dados de pose extraídos para cada dançarino sejam normalizados em relação ao tamanho (escala)
- Para que as comparações de movimento não sejam afetadas pelas diferentes alturas dos dançarinos ou distância da câmera.

**Acceptance Criteria (ACs):**

1.  Uma função de normalização de tamanho é implementada no `core-logic` (Python).
2.  A função recebe como entrada os dados de pose (lista de landmarks com `x,y,z`) de um único frame.
3.  A normalização é baseada em uma métrica corporal consistente, como a distância entre os ombros (landmarks 11 e 12) ou a altura do tronco (distância vertical entre o ponto médio dos ombros e o ponto médio do quadril - landmarks 23 e 24). A escolha exata da métrica deve ser documentada.
4.  Todos os landmarks da pose (`x,y,z`) são reescalonados consistentemente com base na métrica de referência calculada para aquele frame/pose.
5.  A função retorna os landmarks da pose com suas coordenadas (`x,y,z`) normalizadas por tamanho.
6.  A normalização é aplicada a todos os frames de ambos os vídeos após a extração de pose (HU 3.1).
7.  Casos onde os landmarks de referência para normalização não são visíveis (baixa `visibility`) são tratados (ex: usando a última escala válida conhecida, ou não normalizando aquele frame e marcando-o).

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 3): Implementar a função de cálculo da métrica de referência para normalização de tamanho.
  - [ ] Subtask 1.1: Escolher e documentar a métrica de referência (ex: distância entre `landmark_A` e `landmark_B`).
  - [ ] Subtask 1.2: Criar uma função que recebe os landmarks de uma pose e calcula o comprimento da métrica de referência.
  - [ ] Subtask 1.3: Considerar a visibilidade dos landmarks de referência. Se a visibilidade for baixa, tratar o caso (AC 7).
- [ ] Task 2 (AC: 1, 4, 5): Implementar a função de normalização de tamanho.
  - [ ] Subtask 2.1: Criar uma função que recebe os landmarks de uma pose e a métrica de referência calculada.
  - [ ] Subtask 2.2: Calcular o fator de escala (ex: `1.0 / metrica_referencia_atual`).
  - [ ] Subtask 2.3: Multiplicar as coordenadas `x,y,z` de todos os landmarks da pose por este fator de escala em relação a um ponto de origem da escala (ex: o centro da métrica de referência ou o centro do quadril).
  - [ ] Subtask 2.4: Retornar os landmarks normalizados.
- [ ] Task 3 (AC: 6): Integrar a normalização de tamanho no fluxo de processamento do `core-logic`.
  - [ ] Subtask 3.1: Após a extração de pose (HU 3.1), para cada frame com pose detectada, chamar a função de normalização de tamanho.
  - [ ] Subtask 3.2: Armazenar os dados de pose normalizados por tamanho para uso subsequente.
- [ ] Task 4 (AC: 7): Implementar a lógica de tratamento para landmarks de referência não visíveis.
  - [ ] Subtask 4.1: Definir um limiar de visibilidade.
  - [ ] Subtask 4.2: Se os landmarks de referência estiverem abaixo do limiar, decidir a estratégia (pular normalização para o frame, usar última escala válida, etc.) e implementá-la.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF004.1) e `Architecture.md` (módulo `core-logic/pose_estimation/`).
- A normalização deve idealmente tornar as poses invariantes à escala.
- **Métrica Sugerida:** Distância entre o ombro esquerdo (landmark 11) e o ombro direito (landmark 12). Se um não estiver visível, talvez a distância entre o ombro visível e o quadril do mesmo lado.
- **Ponto de Origem da Escala:** Ao reescalonar, é importante definir um ponto de origem. Se as poses já estiverem centralizadas por HU 3.3, a origem pode ser (0,0,0). Caso contrário, pode ser o centro da métrica de referência (ex: ponto médio dos ombros).
- Os dados de `x` e `y` do MediaPipe já são normalizados pelas dimensões da imagem. Esta normalização de tamanho é uma segunda camada, baseada no tamanho do corpo.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 3.3: Normalizar dados de pose por posição

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que os dados de pose (já normalizados por tamanho) também sejam normalizados em relação à posição (translação)
- Para que as comparações de movimento não sejam afetadas pela posição inicial ou deslocamento dos dançarinos na tela.

**Acceptance Criteria (ACs):**

1.  Uma função de normalização de posição é implementada no `core-logic` (Python).
2.  A função recebe como entrada os dados de pose de um único frame (landmarks com `x,y,z`, já normalizados por tamanho pela HU 3.2).
3.  A normalização é baseada em transladar os landmarks de pose para uma origem comum, preferencialmente o ponto médio do quadril (calculado a partir dos landmarks 23 - `LEFT_HIP` e 24 - `RIGHT_HIP`).
4.  As coordenadas `x,y,z` de todos os landmarks da pose são transladadas subtraindo as coordenadas do ponto de referência escolhido (ex: `landmark_novo_x = landmark_velho_x - ponto_referencia_x`).
5.  A função retorna os landmarks da pose com suas coordenadas (`x,y,z`) normalizadas por posição.
6.  A normalização é aplicada a todos os frames de ambos os vídeos após a normalização de tamanho (HU 3.2).
7.  Casos onde os landmarks de referência para a centralização (quadril) não são visíveis (baixa `visibility`) são tratados (ex: usando o último ponto de centralização válido, ou não normalizando por posição aquele frame e marcando-o).

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 3): Implementar a função de cálculo do ponto de referência para centralização.
  - [ ] Subtask 1.1: Criar uma função que recebe os landmarks de uma pose.
  - [ ] Subtask 1.2: Calcular as coordenadas (`x,y,z`) do ponto médio do quadril (média das coordenadas dos landmarks 23 e 24).
  - [ ] Subtask 1.3: Considerar a visibilidade dos landmarks do quadril. Se a visibilidade for baixa, tratar o caso (AC 7).
- [ ] Task 2 (AC: 1, 4, 5): Implementar a função de normalização de posição.
  - [ ] Subtask 2.1: Criar uma função que recebe os landmarks de uma pose e o ponto de referência calculado.
  - [ ] Subtask 2.2: Para cada landmark na pose, subtrair as coordenadas `x,y,z` do ponto de referência das coordenadas do landmark.
  - [ ] Subtask 2.3: Retornar os landmarks transladados.
- [ ] Task 3 (AC: 6): Integrar a normalização de posição no fluxo de processamento do `core-logic`.
  - [ ] Subtask 3.1: Após a normalização de tamanho (HU 3.2), para cada frame com pose, chamar a função de normalização de posição.
  - [ ] Subtask 3.2: Armazenar os dados de pose completamente normalizados (tamanho e posição).
- [ ] Task 4 (AC: 7): Implementar a lógica de tratamento para landmarks do quadril não visíveis.
  - [ ] Subtask 4.1: Definir um limiar de visibilidade.
  - [ ] Subtask 4.2: Se os landmarks do quadril estiverem abaixo do limiar, decidir a estratégia (pular normalização para o frame, usar último ponto de referência válido, etc.) e implementá-la.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF004.2) e `Architecture.md` (módulo `core-logic/pose_estimation/`).
- Esta etapa deve ocorrer após a normalização de tamanho (HU 3.2).
- O objetivo é que todas as poses, após esta etapa, estejam centradas na origem (0,0,0) do sistema de coordenadas da pose.
- Landmarks de referência: `LEFT_HIP` (23) e `RIGHT_HIP` (24). O ponto de referência é a média das coordenadas destes dois.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 3.4: Registrar timestamps dos frames processados

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que o sistema registre (para fins de depuração/análise) os timestamps de cada frame processado pelo `MediaPipe`
- Para que eu possa correlacionar os dados de pose com o tempo original do vídeo e auxiliar na análise de ritmo/velocidade.

**Acceptance Criteria (ACs):**

1.  Ao processar cada vídeo (HU 3.1), o timestamp em milissegundos de cada frame lido do vídeo é obtido usando `cv2.VideoCapture.get(cv2.CAP_PROP_POS_MSEC)`.
2.  Este timestamp é armazenado junto com os dados de pose (normalizados ou não) para aquele frame.
3.  A estrutura de dados que armazena a sequência de poses por vídeo (definida na HU 3.1 e modificada nas HUs 3.2, 3.3) agora inclui o timestamp para cada entrada de frame/pose.
4.  Se um frame for pulado ou não tiver pose detectada, o timestamp ainda pode ser registrado com uma indicação de dados de pose ausentes, se isso for útil para análise de continuidade temporal.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1): Obter o timestamp de cada frame durante o processamento do vídeo.
  - [ ] Subtask 1.1: Na função de processamento de vídeo em `core-logic` (modificada na HU 3.1), após ler um frame com `cap.read()`, chamar `cap.get(cv2.CAP_PROP_POS_MSEC)` para obter o timestamp.
- [ ] Task 2 (AC: 2, 3): Modificar a estrutura de dados de pose para incluir o timestamp.
  - [ ] Subtask 2.1: Atualizar a definição da estrutura que armazena os landmarks de um frame para incluir um campo `timestamp_ms`.
  - [ ] Subtask 2.2: Ao armazenar os dados de pose (e após as normalizações), incluir o timestamp obtido.
- [ ] Task 3 (AC: 4): Considerar o registro de timestamps para frames sem pose.
  - [ ] Subtask 3.1: Se for decidido registrar frames sem pose, garantir que o timestamp seja associado a essa entrada nula/vazia.

**Dev Technical Guidance:**

- Consultar `Product.md` (parte do RF002 implicitamente e útil para RF008).
- Esta é uma modificação no processo de extração de HU 3.1.
- A propriedade `cv2.CAP_PROP_POS_MSEC` retorna o timestamp em milissegundos do frame que está prestes a ser decodificado/retornado.
- Exemplo de estrutura de dados por frame após esta HU:
  ```json
  {
    "frame_number": 10,
    "timestamp_ms": 333.33,
    "landmarks": [
      /* ... lista de landmarks normalizados ... */
    ]
  }
  ```

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

## Épico 4: Motor de Comparação de Movimento

### Story 4.1: Implementar representação vetorial híbrida da pose

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que cada pose normalizada (por tamanho e posição) seja convertida em uma representação vetorial híbrida, combinando coordenadas de landmarks priorizados (membros, tronco) e ângulos corporais chave
- Para que eu tenha um vetor de características robusto para a comparação de movimentos.

**Acceptance Criteria (ACs):**

1.  Uma função é implementada no `core-logic` (Python, dentro do módulo `comparison`) que recebe os dados de uma pose normalizada (landmarks `x,y,z` e `visibility`, conforme produzido pela HU 3.3).
2.  A função seleciona um subconjunto de landmarks prioritários para inclusão direta no vetor (ex: ombros, cotovelos, pulsos, quadris, joelhos, tornozelos). As coordenadas `x,y` (e opcionalmente `z`) desses landmarks são adicionadas ao vetor.
3.  A função calcula ângulos corporais chave (ex: ângulo do cotovelo esquerdo/direito, ângulo do joelho esquerdo/direito, ângulo do tronco).
    - Para ângulos, três landmarks são usados (ex: ombro-cotovelo-pulso para o ângulo do cotovelo).
    - O cálculo do ângulo deve ser consistente (ex: usando `atan2` ou produto escalar/vetorial para obter ângulos em um plano definido ou em 3D).
4.  Os ângulos calculados são adicionados ao vetor de características.
5.  A função retorna o vetor de características híbrido completo para a pose.
6.  Esta conversão é aplicada a cada pose normalizada em ambas as sequências de vídeo.
7.  A definição exata dos landmarks prioritários e dos ângulos chave incluídos no vetor é documentada no código ou em `docs/architecture.md` se for uma decisão arquitetural significativa.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2): Implementar a seleção de landmarks prioritários.
  - [ ] Subtask 1.1: Definir a lista de índices dos landmarks prioritários (ex: [11-28] para cobrir membros e tronco).
  - [ ] Subtask 1.2: Criar uma função que extrai as coordenadas `x,y` (e `z` se decidido) desses landmarks de uma pose e os adiciona a uma lista/vetor.
- [ ] Task 2 (AC: 1, 3): Implementar o cálculo dos ângulos corporais chave.
  - [ ] Subtask 2.1: Definir os conjuntos de três landmarks para cada ângulo a ser calculado (ex: cotovelo direito: [Ombro Direito, Cotovelo Direito, Pulso Direito] - landmarks 12, 14, 16).
  - [ ] Subtask 2.2: Criar uma função utilitária que calcula o ângulo entre três pontos (vetores) no espaço 2D ou 3D.
  - [ ] Subtask 2.3: Para cada ângulo definido, chamar a função utilitária e adicionar o resultado ao vetor de características.
- [ ] Task 3 (AC: 4, 5): Combinar landmarks e ângulos no vetor final.
  - [ ] Subtask 3.1: Concatenar a lista de coordenadas dos landmarks prioritários com a lista de ângulos calculados.
  - [ ] Subtask 3.2: A função principal retorna este vetor combinado.
- [ ] Task 4 (AC: 6): Integrar a criação do vetor híbrido no fluxo principal de processamento.
  - [ ] Subtask 4.1: Após as normalizações (HU 3.3), para cada pose, chamar esta função para gerar seu vetor de características.
  - [ ] Subtask 4.2: Armazenar as sequências de vetores de características para cada vídeo.
- [ ] Task 5 (AC: 7): Documentar os landmarks e ângulos selecionados.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF005) e `Architecture.md` (módulo `core-logic/comparison/`).
- **Landmarks Prioritários:** O PRD menciona "membros e tronco". Considerar os seguintes landmarks do MediaPipe BlazePose:
  - Ombros (11, 12), Cotovelos (13, 14), Pulsos (15, 16)
  - Quadris (23, 24), Joelhos (25, 26), Tornozelos (27, 28)
  - Talvez Nariz (0) ou pontos centrais do corpo para orientação geral.
- **Ângulos Chave Sugeridos:**
  - Cotovelo Direito (Ombro D, Cotovelo D, Pulso D)
  - Cotovelo Esquerdo (Ombro E, Cotovelo E, Pulso E)
  - Joelho Direito (Quadril D, Joelho D, Tornozelo D)
  - Joelho Esquerdo (Quadril E, Joelho E, Tornozelo E)
  - Inclinação do Tronco (ex: ângulo entre o vetor vertical e o vetor do Ponto Médio Ombros ao Ponto Médio Quadris).
  - Ângulos de Quadril (ex: Ponto Médio Ombros, Quadril D, Joelho D).
- Para cálculo de ângulo entre vetores BA e BC (com B sendo o vértice): `angle = acos(dot(BA, BC) / (norm(BA) * norm(BC)))`. Usar `numpy` para operações vetoriais.
- A dimensionalidade do vetor resultante deve ser consistente para todas as poses.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 4.2: Implementar ponderação de landmarks na UI e lógica

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero poder definir, através da UI, pesos diferentes para grupos de landmarks (ex: Tronco, Braço Esquerdo, Braço Direito, Perna Esquerda, Perna Direita) que serão usados no cálculo de similaridade de pose
- Para que eu possa refinar a análise e focar em partes específicas do corpo dependendo do tipo de dança.

**Acceptance Criteria (ACs):**

1.  A UI Angular (`AnalysisSetupPageComponent`) apresenta controles (ex: sliders, campos numéricos) para o usuário definir pesos para grupos predefinidos de landmarks. Grupos sugeridos: Tronco, Braço Esquerdo, Braço Direito, Perna Esquerda, Perna Direita.
2.  Cada peso pode variar de 0.0 a 1.0 (ou 0 a 100, a ser normalizado para 0-1). O valor padrão para cada peso é 1.0 (ou 100).
3.  Os valores de peso definidos na UI são capturados e armazenados no `AnalysisStateService` (dentro do objeto `analysisParameters`).
4.  Esses pesos são incluídos no `AnaliseRequest` enviado para a API `core-logic` (`/analises`).
5.  O `core-logic` (Python), especificamente a função de cálculo de distância/similaridade entre duas poses (vetores híbridos), utiliza esses pesos.
6.  Ao calcular a distância entre as coordenadas de landmarks correspondentes nos vetores de duas poses, a distância é multiplicada pelo peso do grupo ao qual o landmark pertence. (Ângulos podem ou não ser ponderados, a ser definido; para MVP, focar em ponderar os landmarks).
7.  Se um peso de grupo for 0, os landmarks desse grupo não contribuem para a distância/similaridade da pose.
8.  A API FastAPI (`/analises`) é atualizada para aceitar esses pesos no `AnaliseParameters` dentro do `AnaliseRequest`.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2): Implementar os controles de UI para pesos de landmarks.
  - [ ] Subtask 1.1: Adicionar sliders ou campos numéricos ao `AnalysisSetupPageComponent` para cada grupo de landmark (Tronco, Braços, Pernas).
  - [ ] Subtask 1.2: Definir min, max, step e valor padrão para cada controle.
  - [ ] Subtask 1.3: Estilizar os controles. Usar `ParameterSliderComponent` se já criado/adequado.
- [ ] Task 2 (AC: 3): Atualizar `AnalysisStateService` para gerenciar os pesos.
  - [ ] Subtask 2.1: Modificar a interface `AnaliseParameters` (TypeScript) para incluir os pesos.
  - [ ] Subtask 2.2: No `AnalysisStateService`, atualizar o `BehaviorSubject` `_analysisParameters` para refletir as mudanças de peso da UI.
- [ ] Task 3 (AC: 4, 8): Atualizar a API `core-logic`.
  - [ ] Subtask 3.1: Modificar o modelo Pydantic `AnaliseParameters` (Python) para incluir campos para os pesos dos grupos de landmarks.
  - [ ] Subtask 3.2: Garantir que o endpoint `/analises` receba e valide esses pesos.
- [ ] Task 4 (AC: 5, 6, 7): Modificar a lógica de comparação de poses no `core-logic`.
  - [ ] Subtask 4.1: Definir a quais grupos cada landmark do vetor híbrido pertence.
  - [ ] Subtask 4.2: Ao calcular a distância euclidiana (ou outra métrica) entre os componentes dos vetores de pose correspondentes aos landmarks, multiplicar a contribuição da distância pelo peso do grupo do landmark.
  - [ ] Subtask 4.3: Se os ângulos também forem ponderados, aplicar uma lógica similar ou um peso global para ângulos.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF006) e `Architecture.md` (módulo `core-logic/comparison/` e modelo `AnaliseParameters`).
- **Grupos de Landmarks (Exemplo):**
  - **Tronco:** Ombros (11,12), Quadris (23,24), talvez Nariz (0), Pescoço (média de 0 e ponto médio dos ombros).
  - **Braço Direito:** Ombro D (12), Cotovelo D (14), Pulso D (16).
  - **Braço Esquerdo:** Ombro E (11), Cotovelo E (13), Pulso E (15).
  - **Perna Direita:** Quadril D (24), Joelho D (26), Tornozelo D (28).
  - **Perna Esquerda:** Quadril E (23), Joelho E (25), Tornozelo E (27).
- A ponderação deve ser aplicada ao calcular a "distância" ou "custo" entre dois vetores de pose, que será usada pelo DTW.
- **UI:** `Frontend-Architecture.md` menciona `ParameterSliderComponent` que pode ser usado aqui.
- Valores padrão dos pesos devem ser 1.0 para que, se o usuário não mexer, todos os landmarks tenham igual importância.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 4.3: Comparar sequências de pose usando DTW

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que o sistema compare as duas sequências de vetores de pose (híbridos e ponderados) usando Dynamic Time Warping (DTW)
- Para obter um score de distância/similaridade global que leve em conta as variações de tempo na execução dos movimentos.

**Acceptance Criteria (ACs):**

1.  O algoritmo Dynamic Time Warping (DTW) é implementado ou uma biblioteca DTW confiável (ex: `dtaidistance` ou `fastdtw` para Python) é integrada ao `core-logic` (módulo `comparison`).
2.  A função DTW recebe como entrada as duas sequências de vetores de pose híbridos (gerados pela HU 4.1 e cujos componentes podem ser influenciados pelos pesos da HU 4.2).
3.  Uma função de custo (distância) apropriada é usada pelo DTW para calcular a distância entre dois vetores de pose individuais. Esta função deve usar a distância euclidiana ponderada (conforme HU 4.2) entre os componentes dos vetores.
4.  O DTW calcula o caminho ótimo de alinhamento entre as duas sequências e a distância acumulada total ao longo desse caminho.
5.  A distância DTW total é convertida em um score de similaridade (ex: entre 0 e 100%, onde 100% significa identicos). Uma forma comum é `similaridade = 1 / (1 + distancia_dtw)` ou `exp(-distancia_dtw * fator_normalizacao)`, ou outra normalização apropriada.
6.  O score de similaridade final (baseado apenas no DTW por enquanto) é o principal resultado da comparação de pose.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1): Escolher e integrar uma biblioteca DTW ou implementar uma versão básica.
  - [ ] Subtask 1.1: Pesquisar bibliotecas Python para DTW (ex: `dtaidistance.dtw.distance`, `fastdtw.fastdtw`). Escolher uma com base na licença, facilidade de uso e performance.
  - [ ] Subtask 1.2: Adicionar a biblioteca escolhida ao `requirements.txt`.
- [ ] Task 2 (AC: 2, 3): Preparar as entradas para o DTW e definir a função de custo.
  - [ ] Subtask 2.1: Garantir que as sequências de vetores de pose híbridos estejam no formato esperado pela biblioteca DTW.
  - [ ] Subtask 2.2: Implementar a função de custo que calcula a distância euclidiana ponderada entre dois vetores de pose. Esta função será passada para o algoritmo DTW.
    ```python
    # Exemplo conceitual de função de custo
    # def pose_distance(pose_vector1, pose_vector2, landmark_weights):
    #     total_distance = 0
    #     # Iterar sobre componentes dos landmarks, aplicar pesos
    #     # Iterar sobre componentes dos ângulos (podem ter peso global 1 ou específico)
    #     return weighted_euclidean_distance
    ```
- [ ] Task 3 (AC: 4): Executar o DTW.
  - [ ] Subtask 3.1: Chamar a função DTW da biblioteca com as duas sequências de pose e a função de custo customizada.
- [ ] Task 4 (AC: 5): Converter a distância DTW em score de similaridade.
  - [ ] Subtask 4.1: Pesquisar e implementar um método de normalização para converter a distância DTW (que pode variar muito) em um score de similaridade intuitivo (0-1 ou 0-100%).
  - [ ] Subtask 4.2: Considerar o impacto da duração das sequências na distância DTW e se a normalização precisa levar isso em conta.
- [ ] Task 5 (AC: 6): Integrar o score de similaridade DTW no fluxo de análise.
  - [ ] Subtask 5.1: O `core-logic` agora calcula este score como o resultado principal da análise.
  - [ ] Subtask 5.2: Este score será parte da `AnaliseResponse` retornada pela API.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF007).
- **Bibliotecas DTW:**
  - `dtaidistance`: Boa documentação, várias opções de DTW, suporta funções de custo customizadas.
  - `fastdtw`: Implementação rápida, mas pode ser mais simples em termos de customização da função de distância diretamente.
  - Se implementar do zero (não recomendado para MVP a menos que seja um requisito específico do TCC), focar na versão clássica.
- **Função de Custo:** É crucial. Deve refletir a "diferença" entre duas poses instantâneas, considerando a ponderação da HU 4.2.
- **Normalização do Score:** A distância DTW bruta não é intuitiva. Normalizar para `[0, 1]` ou `[0, 100]` é essencial. `1 - (dist / max_dist_possivel_ou_esperada)` ou `exp(-k * dist)` são opções. A normalização pode precisar de ajuste empírico.
- A biblioteca `NumPy` será útil para todas as operações vetoriais.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 4.4: Implementar análise opcional de ritmo/velocidade

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero poder habilitar/desabilitar uma análise de ritmo/velocidade e, quando habilitada, quero que ela influencie o score final
- Para que a comparação possa considerar não apenas a forma das poses, mas também a dinâmica temporal e a velocidade dos movimentos.

**Acceptance Criteria (ACs):**

1.  A UI Angular (`AnalysisSetupPageComponent`) possui um controle (ex: checkbox, toggle switch, `ToggleButtonComponent`) para habilitar/desabilitar a análise de ritmo/velocidade.
2.  O estado deste controle (habilitado/desabilitado) é armazenado no `AnalysisStateService` (parte dos `analysisParameters`).
3.  Este estado é enviado para a API `core-logic` como parte do `AnaliseRequest`.
4.  Se a análise de ritmo/velocidade estiver habilitada:
    - O `core-logic` calcula a velocidade de landmarks chave (ex: pulsos, tornozelos, ou o centro do corpo) frame a frame para cada vídeo. A velocidade pode ser a magnitude do vetor de deslocamento do landmark entre frames consecutivos, dividida pelo intervalo de tempo (usar timestamps da HU 3.4).
    - As sequências de perfis de velocidade (uma para cada vídeo) são comparadas usando uma métrica apropriada (ex: DTW sobre os perfis de velocidade, ou correlação cruzada).
    - Um score de similaridade de ritmo/velocidade (0-1 ou 0-100%) é gerado.
5.  O `Product.md` (RF008b) menciona um "peso configurável (0-100%) para determinar sua influência no score final". A UI deve ter um controle para este peso, ativo apenas se a análise de ritmo estiver habilitada. Este peso também é enviado na `AnaliseRequest`.
6.  Se a análise de ritmo estiver habilitada, o score final de similaridade da dança é uma média ponderada do score de similaridade de pose (DTW da HU 4.3) e do score de similaridade de ritmo/velocidade, usando o peso definido pelo usuário (AC5). (Ex: `ScoreFinal = (PesoPose * ScorePose) + (PesoRitmo * ScoreRitmo)`, onde `PesoPose + PesoRitmo = 1`, ou `ScoreFinal = ((1-PesoUI) * ScorePose) + (PesoUI * ScoreRitmo)`).
7.  Se a análise de ritmo estiver desabilitada, o score final é apenas o score de similaridade de pose (DTW).
8.  A API FastAPI e os modelos Pydantic `AnaliseParameters` são atualizados para incluir o toggle de análise de ritmo e seu peso.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 5): Implementar os controles da UI para habilitar/desabilitar análise de ritmo e seu peso.
  - [ ] Subtask 1.1: Adicionar um `ToggleButtonComponent` (ou similar) ao `AnalysisSetupPageComponent`.
  - [ ] Subtask 1.2: Adicionar um `ParameterSliderComponent` para o peso da análise de ritmo, visível/ativo apenas quando o toggle estiver "ligado".
- [ ] Task 2 (AC: 2): Atualizar `AnalysisStateService` para gerenciar o estado da análise de ritmo e seu peso.
- [ ] Task 3 (AC: 3, 8): Atualizar a API `core-logic` e modelos Pydantic `AnaliseParameters` para incluir esses novos parâmetros.
- [ ] Task 4 (AC: 4a): Implementar o cálculo de velocidade de landmarks chave.
  - [ ] Subtask 4.1: Selecionar os landmarks chave para análise de ritmo (ex: centro do quadril, pulsos).
  - [ ] Subtask 4.2: Para cada vídeo, iterar sobre os frames (com poses normalizadas e timestamps). Calcular o deslocamento de cada landmark chave entre o frame `t` e `t-1`.
  - [ ] Subtask 4.3: Dividir o deslocamento pelo `delta_t` (diferença de timestamps) para obter a velocidade instantânea. Armazenar as sequências de velocidade.
- [ ] Task 5 (AC: 4b, 4c): Implementar a comparação dos perfis de velocidade e gerar score de similaridade de ritmo.
  - [ ] Subtask 5.1: Usar DTW (ou outra técnica como correlação) para comparar as sequências de velocidade dos dois vídeos.
  - [ ] Subtask 5.2: Normalizar o resultado para um score de similaridade de ritmo (0-1 ou 0-100%).
- [ ] Task 6 (AC: 6, 7): Implementar a combinação ponderada dos scores.
  - [ ] Subtask 6.1: No `core-logic`, se a análise de ritmo estiver habilitada, calcular o score final como a média ponderada.
  - [ ] Subtask 6.2: Caso contrário, o score final é o score de pose DTW.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF008).
- **Landmarks para Velocidade:** O centro do quadril (calculado na HU 3.3) pode ser um bom indicador geral. Pulsos (15,16) e Tornozelos (27,28) para movimentos de membros.
- **Cálculo de Velocidade:** $v = \frac{\sqrt{(x_t - x_{t-1})^2 + (y_t - y_{t-1})^2 + (z_t - z_{t-1})^2}}{(timestamp_t - timestamp_{t-1})}$. Cuidado com divisão por zero se timestamps forem iguais (improvável, mas tratar).
- **Comparação de Perfis de Velocidade:** DTW é uma boa opção aqui também, pois alinha sequências de diferentes durações ou com variações locais de tempo. A função de custo para este DTW seria a diferença absoluta (ou quadrada) entre as magnitudes das velocidades nos pontos comparados.
- **UI:** `ToggleButtonComponent` e `ParameterSliderComponent` mencionados em `Frontend-Architecture.md`.
- **Peso da UI para Ritmo (Product.md RF008b):** Se o usuário define "Peso para Ritmo" como `P_ritmo_ui` (0 a 1.0), então o `PesoPose = 1.0 - P_ritmo_ui` e `PesoRitmo = P_ritmo_ui`.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, dificuldades, or follow-up needed}
- **Change Log:**

---

### Story 4.5: Parametrizar sensibilidade da comparação de poses

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero poder ajustar, através da UI, a sensibilidade da comparação de poses (margem de erro) para a abordagem híbrida
- Para que eu possa controlar quão estrita é a correspondência entre poses individuais durante a análise DTW.

**Acceptance Criteria (ACs):**

1.  A UI Angular (`AnalysisSetupPageComponent`) apresenta controles (ex: sliders, campos numéricos) para o usuário ajustar parâmetros de sensibilidade da comparação de poses.
2.  Esses parâmetros de sensibilidade são armazenados no `AnalysisStateService` (dentro de `analysisParameters`).
3.  Os parâmetros de sensibilidade são enviados para a API `core-logic` como parte do `AnaliseRequest`.
4.  A função de custo usada pelo DTW (definida na HU 4.3, que calcula a distância entre dois vetores de pose híbridos) é modificada para levar em conta esses parâmetros de sensibilidade.
    - Por exemplo, um parâmetro poderia ser um "limiar de distância" para landmarks: se a distância ponderada de um landmark correspondente estiver abaixo do limiar, considera-se uma correspondência perfeita (contribuição zero para a distância da pose); acima, contribui normalmente.
    - Outro exemplo, um "limiar de ângulo": se a diferença entre ângulos correspondentes estiver abaixo de um limiar, considera-se correspondência perfeita.
    - Alternativamente, a sensibilidade pode ser um fator multiplicativo global na função de distância da pose.
5.  A API FastAPI e o modelo Pydantic `AnaliseParameters` (Python) são atualizados para incluir esses parâmetros de sensibilidade.
6.  A forma exata como a sensibilidade afeta o cálculo da distância da pose deve ser claramente definida e documentada. Para MVP, um único slider "Sensibilidade DTW" (0.0 a 1.0) e "Limiar Similaridade" (0.0 a 1.0) são mencionados no `AnaliseParameters` do `Architecture.md`. Estes devem ser conectados.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1): Implementar os controles da UI para os parâmetros de sensibilidade.
  - [ ] Subtask 1.1: Adicionar sliders/campos para "Sensibilidade DTW" e "Limiar Similaridade" ao `AnalysisSetupPageComponent`.
  - [ ] Subtask 1.2: Definir min, max, step, valor padrão para estes controles conforme `AnaliseParameters` no `Architecture.md`.
- [ ] Task 2 (AC: 2): Atualizar `AnalysisStateService` para gerenciar esses parâmetros.
- [ ] Task 3 (AC: 3, 5): Atualizar a API `core-logic` e o modelo Pydantic `AnaliseParameters` para incluir `sensibilidade_dtw` e `limiar_similaridade`.
- [ ] Task 4 (AC: 4, 6): Modificar a função de custo da pose (usada pelo DTW) no `core-logic`.
  - [ ] Subtask 4.1: Definir como `sensibilidade_dtw` e `limiar_similaridade` (e outros parâmetros de sensibilidade se houver) alteram o cálculo da distância entre dois vetores de pose.
    - `sensibilidade_dtw`: Pode ser um fator que escala a janela de busca do DTW (se a biblioteca permitir) ou um fator que afeta a função de custo globalmente.
    - `limiar_similaridade`: Poderia ser usado _após_ o DTW para decidir se o score final é "suficientemente similar", ou, mais complexamente, influenciar a função de custo para que pequenas diferenças abaixo de um limiar sejam ignoradas (custo zero).
  - [ ] Subtask 4.2: Implementar essas modificações na função de custo.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF009) e `Architecture.md` (modelo Pydantic `AnaliseParameters` que já inclui `sensibilidade_dtw` e `limiar_similaridade`).
- **`sensibilidade_dtw` (0.0-1.0):**
  - Se a biblioteca DTW permitir um parâmetro de `window` (para restringir o caminho de warping), `sensibilidade_dtw` pode controlar o tamanho dessa janela. Uma janela menor (maior sensibilidade) força um alinhamento mais rígido.
  - Alternativamente, pode ser um multiplicador na distância da pose: `dist_modificada = dist_original * (1 + (1 - sensibilidade_dtw))`. Alta sensibilidade (1.0) -> `dist_original`. Baixa sensibilidade (0.0) -> `2 * dist_original`.
- **`limiar_similaridade` (0.0-1.0):**
  - Este parece mais um limiar de decisão _pós-cálculo_ do score de similaridade final. "Se `score_similaridade_final < limiar_similaridade_param`, então considerar 'não similar'".
  - Para influenciar a _função de custo da pose_: Se a distância ponderada para um componente (landmark ou ângulo) for `d`, e houver um `limiar_componente`, a contribuição para a distância da pose pode ser `max(0, d - limiar_componente)`. O `limiar_similaridade` geral do PRD precisaria ser decomposto em limiares por componente ou aplicado de forma diferente.
- A implementação exata de como esses parâmetros afetam a função de custo do DTW precisa ser bem definida. O `Architecture.md` os lista como parte dos parâmetros de análise, então eles devem ser usados ativamente.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

## Épico 5: Integração Final, Testes e Geração de Resultados

### Story 5.1: Utilizar parâmetros da UI no motor de comparação

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que os parâmetros de pesos de landmarks e sensibilidade definidos na UI sejam corretamente utilizados pelo motor de comparação Python
- Para que minhas configurações personalizadas afetem o resultado da análise.

**Acceptance Criteria (ACs):**

1.  Os valores de pesos de landmarks (HU 4.2) definidos na UI Angular são corretamente passados para o `AnalysisStateService`.
2.  Os valores dos parâmetros de sensibilidade (HU 4.5, ex: `sensibilidade_dtw`, `limiar_similaridade`) definidos na UI Angular são corretamente passados para o `AnalysisStateService`.
3.  O toggle e o peso da análise de ritmo/velocidade (HU 4.4) definidos na UI Angular são corretamente passados para o `AnalysisStateService`.
4.  Todos esses parâmetros são agrupados no objeto `AnaliseParameters` dentro do `AnalysisStateService` e enviados como parte do `AnaliseRequest` para a API `/analises` do `core-logic`.
5.  O `core-logic` (FastAPI) recebe esses parâmetros e os utiliza efetivamente nas respectivas etapas da lógica de comparação:
    - Pesos de landmarks na função de custo da pose (HU 4.2).
    - Parâmetros de sensibilidade na função de custo da pose ou na lógica DTW (HU 4.5).
    - Toggle e peso de ritmo na decisão de executar a análise de ritmo e na combinação dos scores (HU 4.4).
6.  Mudanças nos parâmetros da UI resultam em diferentes scores de similaridade para o mesmo par de vídeos, refletindo a influência dos parâmetros.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2, 3): Garantir que todos os parâmetros da UI (pesos, sensibilidade, ritmo) atualizam o `AnalysisStateService`.
  - [ ] Subtask 1.1: Revisar os componentes da UI (`AnalysisSetupPageComponent`) que contêm os controles de parâmetros (sliders, toggles).
  - [ ] Subtask 1.2: Confirmar que o `(valueChanged)` ou evento similar de cada controle de parâmetro chama um método no `AnalysisStateService` para atualizar a respectiva parte do `analysisParameters`.
- [ ] Task 2 (AC: 4): Garantir que o `AnalysisStateService` envia os parâmetros completos para o `AnalysisApiService`.
  - [ ] Subtask 2.1: No método `startAnalysis()` do `AnalysisStateService`, verificar se o objeto `AnaliseRequest` é construído com todos os parâmetros atuais do estado.
  - [ ] Subtask 2.2: O `AnalysisApiService` envia este `AnaliseRequest` completo para o backend.
- [ ] Task 3 (AC: 5): Verificar a utilização dos parâmetros no `core-logic`.
  - [ ] Subtask 3.1: No endpoint `/analises` do FastAPI, garantir que os parâmetros de `AnaliseRequest.parametros_analise` são extraídos.
  - [ ] Subtask 3.2: Passar esses parâmetros para as funções relevantes dentro do `core-logic/comparison/`:
    - Pesos de landmarks para a função de custo do DTW (HU 4.2).
    - Parâmetros de sensibilidade para a função de custo do DTW (HU 4.5).
    - Toggle e peso de ritmo para a lógica de análise de ritmo e combinação de scores (HU 4.4).
- [ ] Task 4 (AC: 6): Testar a influência dos parâmetros.
  - [ ] Subtask 4.1: Preparar um par de vídeos de teste.
  - [ ] Subtask 4.2: Executar a análise com um conjunto de parâmetros padrão. Anotar o score.
  - [ ] Subtask 4.3: Modificar significativamente um parâmetro (ex: peso de um grupo de landmark para 0, ou mudar drasticamente a sensibilidade).
  - [ ] Subtask 4.4: Reexecutar a análise com os mesmos vídeos. Verificar se o score mudou conforme esperado.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF006, RF008, RF009).
- Esta história é principalmente sobre integração e verificação de que os dados fluem corretamente da UI para a lógica de backend e são utilizados.
- Revisar os modelos Pydantic `AnaliseParameters` no `Architecture.md` e as interfaces TypeScript correspondentes no frontend para garantir consistência.
- Foco em testes de integração entre o frontend, `main.js` (Electron), e o `core-logic` (Python/FastAPI).

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 5.2: Exibir score final de similaridade na UI

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero, após clicar em "Iniciar Comparação", ver o score final de similaridade (calculado pelo motor Python) exibido na UI
- Para que eu possa ter o resultado principal da minha análise.

**Acceptance Criteria (ACs):**

1.  Após o `core-logic` (Python/FastAPI) concluir o processamento da análise (incluindo extração, normalização, DTW, análise de ritmo opcional e combinação de scores), ele retorna o score final de similaridade na `AnaliseResponse` através da API `/analises`.
2.  A `AnaliseResponse` (modelo Pydantic e interface TypeScript) contém um campo claro para o score de similaridade final (ex: `sumario_resultados.similaridade_geral` conforme `Architecture.md`).
3.  O `AnalysisApiService` no frontend Angular recebe esta resposta.
4.  O `AnalysisStateService` é atualizado com o score de similaridade recebido e o status da análise é definido como `success`.
5.  A seção de "Resultados" na UI (`AnalysisSetupPageComponent`), que já exibia placeholders (HU 2.2), agora mostra o score numérico de similaridade final (ex: "Similaridade: 85%").
6.  A UI deve parar de exibir o indicador de "Processando..." (HU 2.1) e mostrar o resultado final.
7.  Se ocorrer um erro durante o processamento no backend que impeça o cálculo do score, a API deve retornar um erro apropriado, e a UI deve exibir uma mensagem de erro (conforme já estabelecido na HU 2.2).

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2): Garantir que o `core-logic` retorna o score final.
  - [ ] Subtask 1.1: Modificar o endpoint `/analises` do FastAPI para que, após todos os cálculos (HUs do Épico 3 e 4), o score de similaridade final seja colocado no campo `sumario_resultados.similaridade_geral` da `AnaliseResponse`.
- [ ] Task 2 (AC: 3, 4): Processar a resposta no frontend.
  - [ ] Subtask 2.1: No `AnalysisApiService`, garantir que a `AnaliseResponse` é parseada corretamente.
  - [ ] Subtask 2.2: No `AnalysisStateService`, no callback de sucesso da chamada da API, extrair o `similaridade_geral` da resposta e atualizar o `_analysisResults.next({..., sumario_resultados: { similaridade_geral: score }})`.
  - [ ] Subtask 2.3: Atualizar `_analysisStatus.next('success')`.
- [ ] Task 3 (AC: 5, 6): Exibir o score na UI.
  - [ ] Subtask 3.1: No `AnalysisSetupPageComponent`, garantir que o template está vinculado ao `analysisResults$.sumario_resultados.similaridade_geral` (ou caminho similar) do `AnalysisStateService`.
  - [ ] Subtask 3.2: Formatar a exibição do score de forma clara (ex: com percentual, duas casas decimais).
  - [ ] Subtask 3.3: Ocultar o indicador de "Processando..." quando `analysisStatus$` for `success` ou `error`.
- [ ] Task 4 (AC: 7): Testar o fluxo de erro.
  - [ ] Subtask 4.1: Simular um erro no backend (ex: levantar uma exceção na lógica de comparação).
  - [ ] Subtask 4.2: Verificar se a API FastAPI retorna uma resposta de erro HTTP adequada.
  - [ ] Subtask 4.3: Verificar se a UI exibe a mensagem de erro corretamente.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF010).
- Revisar o formato da `AnaliseResponse` no `Architecture.md` seção "Data Models" e garantir que o `core-logic` e o frontend estejam alinhados com ele.
- O fluxo de atualização de estado no `AnalysisStateService` é crucial aqui.
- A exibição na UI deve ser reativa às mudanças no `analysisResults$` e `analysisStatus$`.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 5.3: Salvar resultados detalhados em arquivo

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero que os resultados da comparação (score final, parâmetros usados, talvez scores intermediários se aplicável) sejam salvos automaticamente em um arquivo (`JSON` ou `CSV`) em um diretório conhecido
- Para que eu possa realizar análises posteriores, documentar meus experimentos e ter um registro das execuções.

**Acceptance Criteria (ACs):**

1.  Após uma análise bem-sucedida no `core-logic`, um arquivo de resultado é gerado.
2.  O arquivo é salvo no diretório `results-output/` dentro da raiz do projeto, conforme especificado em `Architecture.md` seção "Project Structure".
3.  O formato do arquivo pode ser `JSON` ou `CSV`. O `Architecture.md` sugere `JSON` para dados de pose e `CSV` para relatório de comparação. Para este resultado sumário, `JSON` é preferível para aninhar parâmetros.
4.  O conteúdo do arquivo de resultado inclui, no mínimo:
    - Score de similaridade final.
    - Os caminhos dos vídeos de entrada (principal e de comparação).
    - Todos os parâmetros de análise utilizados (pesos de landmarks, sensibilidade, estado e peso da análise de ritmo).
    - Timestamp da análise (data e hora).
    - (Opcional) Scores intermediários, como o score de pose DTW e o score de ritmo/velocidade separadamente, se a análise de ritmo foi habilitada.
5.  O nome do arquivo de resultado é gerado de forma a ser único e informativo (ex: `resultado_videoA_vs_videoB_timestamp.json`).
6.  O `core-logic` (Python), especificamente o módulo `results_management` (conforme `Architecture.md`), é responsável por criar e salvar este arquivo.
7.  A `AnaliseResponse` retornada pela API `/analises` pode opcionalmente incluir o caminho do arquivo de resultado gerado (ex: no campo `arquivos_saida.relatorio_comparacao_json` - adaptando `relatorio_comparacao_csv` do `Architecture.md`).
8.  A UI pode opcionalmente exibir uma mensagem indicando que o arquivo de resultado foi salvo e o seu caminho, se esta informação for retornada pela API.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 2, 6): Implementar a funcionalidade de salvamento de arquivo no `core-logic/results_management/`.
  - [ ] Subtask 1.1: Criar uma função que recebe os dados do resultado (score, parâmetros, caminhos dos vídeos, timestamp).
  - [ ] Subtask 1.2: Formatar os dados em uma estrutura de dicionário Python.
  - [ ] Subtask 1.3: Construir o nome do arquivo (AC 5).
  - [ ] Subtask 1.4: Garantir que o diretório `results-output/` exista (criar se não existir).
  - [ ] Subtask 1.5: Salvar o dicionário como um arquivo JSON no diretório.
- [ ] Task 2 (AC: 1, 4): Integrar o salvamento de arquivo no fluxo de análise do `core-logic`.
  - [ ] Subtask 2.1: No endpoint `/analises` do FastAPI, após o cálculo bem-sucedido do score final, chamar a função de salvamento de arquivo.
  - [ ] Subtask 2.2: Coletar todos os dados necessários para o arquivo de resultado (parâmetros da `AnaliseRequest`, score calculado, etc.).
- [ ] Task 3 (AC: 7): (Opcional) Modificar `AnaliseResponse` para incluir o caminho do arquivo.
  - [ ] Subtask 3.1: Atualizar o modelo Pydantic `ArquivosSaida` e `AnaliseResponse` para incluir um campo para o caminho do arquivo JSON de sumário.
  - [ ] Subtask 3.2: O endpoint `/analises` preenche este campo na resposta.
- [ ] Task 4 (AC: 8): (Opcional) Exibir informação sobre o arquivo salvo na UI.
  - [ ] Subtask 4.1: Se o caminho do arquivo for retornado, o `AnalysisStateService` o armazena.
  - [ ] Subtask 4.2: A UI (`AnalysisSetupPageComponent`) exibe uma mensagem com o caminho do arquivo.

**Dev Technical Guidance:**

- Consultar `Product.md` (RF010) e `Architecture.md` (módulo `core-logic/results_management/` e estrutura de `results-output/`).
- Usar a biblioteca `json` do Python para salvar o arquivo JSON.
- Usar `datetime.datetime.now().strftime("%Y%m%d_%H%M%S")` para gerar parte do timestamp para o nome do arquivo.
- Estrutura do JSON de resultado (exemplo):
  ```json
  {
    "timestamp_analise": "2025-05-16T10:30:00.123Z",
    "video_principal": "/path/to/video1.mp4",
    "videos_comparacao": ["/path/to/video2.mp4"],
    "parametros_utilizados": {
      "sensibilidade_dtw": 0.5,
      "limiar_similaridade": 0.8,
      "frames_por_segundo_analise": null,
      "pesos_landmarks": { "tronco": 1.0, "braco_d": 1.0, ... },
      "analise_ritmo_habilitada": true,
      "peso_analise_ritmo": 0.3
    },
    "sumario_resultados": {
      "similaridade_geral": 0.85, // 85%
      "score_pose_dtw": 0.82,     // Opcional
      "score_ritmo": 0.90        // Opcional
    },
    "caminho_arquivo_resultado": "results-output/resultado_video1_vs_video2_20250516_103000.json" // Auto-referência opcional
  }
  ```

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---

### Story 5.4: Testar sistema com vídeos de K-pop e Sapateado

**Status:** Draft

**Story:**

- Como pesquisador
- Eu quero testar o sistema completo com pelo menos dois pares de vídeos de K-pop e dois pares de vídeos de Sapateado
- Para validar a funcionalidade de ponta a ponta e observar os scores de similaridade em diferentes estilos de dança.

**Acceptance Criteria (ACs):**

1.  Pelo menos dois pares de vídeos de dança K-pop são selecionados para teste. Cada par deve consistir em:
    - Vídeo A: Performance de referência.
    - Vídeo B: Outra performance da mesma coreografia (espera-se alta similaridade) ou uma coreografia diferente (espera-se baixa similaridade).
2.  Pelo menos dois pares de vídeos de Sapateado são selecionados para teste, com a mesma lógica do AC1.
3.  Para cada par de vídeos, a análise é executada através da UI da aplicação.
4.  O sistema processa os vídeos de teste sem erros fatais que impeçam a conclusão da análise.
5.  Os scores de similaridade gerados para cada par são registrados.
6.  Os scores são qualitativamente avaliados pelo pesquisador para verificar se fazem sentido (ex: vídeos da mesma coreografia devem ter scores mais altos que vídeos de coreografias diferentes).
7.  Os arquivos de resultado (JSON/CSV da HU 5.3) são gerados corretamente para cada teste e contêm os parâmetros usados e os scores.

**Tasks / Subtasks:**

- [ ] Task 1 (AC: 1, 2): Obter/Preparar os vídeos de teste.
  - [ ] Subtask 1.1: Identificar e baixar/gravar 2 pares de vídeos K-pop (total 4 vídeos).
  - [ ] Subtask 1.2: Identificar e baixar/gravar 2 pares de vídeos Sapateado (total 4 vídeos).
  - [ ] Subtask 1.3: Garantir que os vídeos estejam em formato compatível (ex: .mp4) e, se necessário, editá-los para sincronizar o início dos movimentos (conforme RF003 - sincronização manual para MVP).
- [ ] Task 2 (AC: 3, 4, 5, 7): Executar os testes.
  - [ ] Subtask 2.1: Para cada par de vídeo:
    - Carregar Vídeo 1 e Vídeo 2 na UI.
    - Configurar um conjunto padrão de parâmetros de análise (ou variar para observar o impacto).
    - Iniciar a comparação.
    - Registrar o score de similaridade exibido.
    - Verificar se o arquivo de resultado foi salvo e se seu conteúdo está correto.
- [ ] Task 3 (AC: 6): Avaliar qualitativamente os resultados.
  - [ ] Subtask 3.1: Comparar os scores obtidos. Verificar se as expectativas de alta/baixa similaridade se confirmam.
  - [ ] Subtask 3.2: Documentar as observações. Se os scores não fizerem sentido, investigar possíveis problemas na lógica de comparação ou nos parâmetros.

**Dev Technical Guidance:**

- Consultar `Product.md` (Requisitos de Teste (Perspectiva do Pesquisador)).
- Esta história é um teste de ponta a ponta focado na perspectiva do usuário/pesquisador.
- A escolha dos vídeos é importante. Vídeos com boa visibilidade dos dançarinos e iluminação adequada são ideais.
- Manter um registro dos testes: quais vídeos, quais parâmetros, qual score obtido, e uma breve nota sobre a plausibilidade.
- Se forem encontrados bugs ou comportamentos inesperados, novas tarefas/histórias de correção podem precisar ser criadas.

**Story Progress Notes:**

- **Agent Model Used:** `<Agent Model Name/Version>`
- **Completion Notes List:** {Any notes about implementation choices, difficulties, or follow-up needed}
- **Change Log:**

---
