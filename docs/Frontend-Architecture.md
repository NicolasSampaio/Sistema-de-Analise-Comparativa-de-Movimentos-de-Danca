# Sistema de Análise Comparativa de Movimentos de Dança para TCC Frontend Architecture Document

## Documentos de Referência

- [Documento de Produto](docs/Product.md) - Requisitos e especificações do produto
- [Documento de Arquitetura](docs/Architecture.md) - Detalhes técnicos e decisões de arquitetura do sistema

## Table of Contents

- [Introduction](https://www.google.com/search?q=%23introduction)
- [Overall Frontend Philosophy & Patterns](https://www.google.com/search?q=%23overall-frontend-philosophy--patterns)
- [Detailed Frontend Directory Structure](https://www.google.com/search?q=%23detailed-frontend-directory-structure)
- [Component Breakdown & Implementation Details](https://www.google.com/search?q=%23component-breakdown--implementation-details)
  - [Component Naming & Organization](https://www.google.com/search?q=%23component-naming--organization)
  - [Template for Component Specification](https://www.google.com/search?q=%23template-for-component-specification)
  - [Foundational/Shared Components](https://www.google.com/search?q=%23foundationalshared-components)
- [State Management In-Depth](https://www.google.com/search?q=%23state-management-in-depth)
  - [Store Structure / Slices](https://www.google.com/search?q=%23store-structure--slices)
  - [Key Selectors](https://www.google.com/search?q=%23key-selectors)
  - [Key Actions / Reducers / Thunks](https://www.google.com/search?q=%23key-actions--reducers--thunks)
- [API Interaction Layer](https://www.google.com/search?q=%23api-interaction-layer)
  - [Client/Service Structure](https://www.google.com/search?q=%23clientservice-structure)
  - [Error Handling & Retries (Frontend)](https://www.google.com/search?q=%23error-handling--retries-frontend)
- [Routing Strategy](https://www.google.com/search?q=%23routing-strategy)
  - [Route Definitions](https://www.google.com/search?q=%23route-definitions)
  - [Route Guards / Protection](https://www.google.com/search?q=%23route-guards--protection)
- [Electron Integration](https://www.google.com/search?q=%23electron-integration)
  - [IPC Communication (`preload.js`)](https://www.google.com/search?q=%23ipc-communication-preloadjs)
  - [Electron-Specific Services](https://www.google.com/search?q=%23electron-specific-services)
- [Styling and Theming](https://www.google.com/search?q=%23styling-and-theming)
  - [Approach](https://www.google.com/search?q=%23approach)
  - [UI Component Library](https://www.google.com/search?q=%23ui-component-library)
  - [Theming (Light/Dark)](https://www.google.com/search?q=%23theming-lightdark)
- [Forms and Validation](https://www.google.com/search?q=%23forms-and-validation)
- [Build, Bundling, and Deployment](https://www.google.com/search?q=%23build-bundling-and-deployment)
  - [Build Process & Scripts](https://www.google.com/search?q=%23build-process--scripts)
  - [Key Bundling Optimizations](https://www.google.com/search?q=%23key-bundling-optimizations)
  - [Deployment to CDN/Hosting](https://www.google.com/search?q=%23deployment-to-cdnhosting)
- [Frontend Testing Strategy](https://www.google.com/search?q=%23frontend-testing-strategy)
  - [Component Testing](https://www.google.com/search?q=%23component-testing)
  - [UI Integration/Flow Testing](https://www.google.com/search?q=%23ui-integrationflow-testing)
  - [End-to-End UI Testing Tools & Scope](https://www.google.com/search?q=%23end-to-end-ui-testing-tools--scope)
- [Accessibility (AX) Implementation Details](https://www.google.com/search?q=%23accessibility-ax-implementation-details)
- [Performance Considerations](https://www.google.com/search?q=%23performance-considerations)
- [Internationalization (i18n) and Localization (l10n) Strategy](https://www.google.com/search?q=%23internationalization-i18n-and-localization-l10n-strategy)
- [Feature Flag Management](https://www.google.com/search?q=%23feature-flag-management)
- [Frontend Security Considerations](https://www.google.com/search?q=%23frontend-security-considerations)
- [Browser Support and Progressive Enhancement](https://www.google.com/search?q=%23browser-support-and-progressive-enhancement)
- [Change Log](https://www.google.com/search?q=%23change-log)

## Introduction

Este documento detalha a arquitetura técnica especificamente para o frontend do **Sistema de Análise Comparativa de Movimentos de Dança para TCC (`app-ui`)**. Ele complementa o Documento de Arquitetura Principal do Sistema de Análise Comparativa de Movimentos de Dança para TCC e a Especificação de UI/UX. Este documento detalha a arquitetura frontend e **baseia-se nas decisões fundamentais** (por exemplo, pilha de tecnologia geral, CI/CD, ferramentas de teste primárias) definidas no Documento de Arquitetura Principal (`Architecture.md`). **Elaborações específicas do frontend ou desvios de padrões gerais devem ser explicitamente observados aqui.** O objetivo é fornecer um projeto claro para o desenvolvimento frontend, garantindo consistência, manutenibilidade e alinhamento com o design geral do sistema e os objetivos da experiência do usuário.

- **Link to Main Architecture Document (REQUIRED):** `Architecture.md` (fornecido pelo usuário)
- **Link to UI/UX Specification (REQUIRED if exists):** `docs/TCC_Frontend_Spec_UIUX_v1.0.txt` (corresponde a `front-end-spec-tmpl.txt` fornecido pelo usuário)
- **Link to Primary Design Files (Figma, Sketch, etc.) (REQUIRED if exists):** A ser preenchido se houver um link explícito do Figma. Por enquanto, as descrições em `docs/TCC_Frontend_Spec_UIUX_v1.0.txt` serão a referência visual primária.
- **Link to Deployed Storybook / Component Showcase (if applicable):** N/A para este projeto no momento.

## Overall Frontend Philosophy & Patterns

Esta seção descreve as principais decisões e padrões arquitetônicos escolhidos para o frontend do `app-ui`. Está alinhado com as "Definitive Tech Stack Selections" no `Architecture.md` e considera as implicações da arquitetura geral do sistema (monorepo, comunicação com `core-logic` via API HTTP local).

- **Framework & Core Libraries:** Angular (LTS, atualmente v17.x). O Electron (v28.x ou mais recente) é usado para empacotar a aplicação Angular como uma aplicação desktop. TypeScript (\~5.x) é a linguagem principal. **Estas são derivadas das 'Definitive Tech Stack Selections' no Documento de Arquitetura Principal.**
- **Component Architecture:** A arquitetura de componentes seguirá os padrões do Angular, com uma clara separação entre componentes "inteligentes" (containers, responsáveis pela lógica e estado) e componentes "burros" (presentational, responsáveis pela UI e recebendo dados via `@Input()`). Serão utilizados Módulos Angular para organizar funcionalidades.
- **State Management Strategy:** Para o MVP, serviços Angular com RxJS `BehaviorSubject` serão utilizados para gerenciar o estado compartilhado da aplicação, como seleções de vídeo, parâmetros de análise e resultados. Dada a complexidade descrita na Especificação de UI/UX (RF006, RF009) e a natureza das interações, uma solução mais robusta como NgRx poderá ser avaliada se a complexidade do estado crescer significativamente. **Detalhado na seção "State Management In-Depth".**
- **Data Flow:** Fluxo de dados unidirecional será incentivado. Os componentes "inteligentes" buscarão e enviarão dados através de serviços, e passarão dados para componentes "burros" via `@Input()`. Eventos de componentes "burros" serão emitidos via `@Output()` e manipulados por componentes "inteligentes".
- **Styling Approach:** **SCSS por componente (encapsulado)**. Estilos globais serão definidos em `styles.scss`. Pré-processador SASS/SCSS será utilizado.
  Configuration File(s): `angular.json` (para configuração de estilos globais e assets). Key conventions: Estilos específicos de componentes estarão em arquivos `.scss` co-localizados com seus componentes e encapsulados (ViewEncapsulation.Emulated). Variáveis globais de SASS (cores, espaçamento, etc.) serão definidas em `src/styles/partials/`.
- **Key Design Patterns Used:**
  - **Service Pattern (Serviços Angular):** Para encapsular a lógica de negócios, interações com API e comunicação com o Electron.
  - **Reactive Programming (RxJS):** Para lidar com eventos assíncronos, estado e fluxo de dados.
  - **Dependency Injection (Angular):** Para gerenciar dependências entre classes.
  - **Container/Presentational Components:** Para separar preocupações de lógica e apresentação.

## Detailed Frontend Directory Structure

A estrutura de pastas para a aplicação `app-ui` (Electron + Angular) dentro do monorepo será:

```plaintext
app-ui/
├── e2e/                      # Testes End-to-End (se implementados).
│   └── src/
│       └── app.e2e-spec.ts
├── src/                      # Código fonte do Angular.
│   ├── app/                  # Módulos, componentes, serviços principais da aplicação.
│   │   ├── core/             # CoreModule: Serviços singleton, guards, interceptors.
│   │   │   ├── guards/       # Route guards.
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/ # HTTP interceptors.
│   │   │   │   └── error.interceptor.ts
│   │   │   ├── services/     # Serviços globais (ex: electron.service.ts, analysis.service.ts).
│   │   │   │   ├── electron.service.ts
│   │   │   │   └── analysis.service.ts
│   │   │   └── core.module.ts
│   │   ├── features/         # Módulos por feature (ex: análise, configuração).
│   │   │   └── analysis-setup/ # Feature de configuração da análise.
│   │   │       ├── components/ # Componentes específicos da feature.
│   │   │       │   ├── video-selector/
│   │   │       │   │   └── video-selector.component.ts (.html, .scss, .spec.ts)
│   │   │       │   └── parameter-editor/
│   │   │       │       └── parameter-editor.component.ts (.html, .scss, .spec.ts)
│   │   │       ├── pages/      # Componentes de página/container da feature.
│   │   │       │   └── analysis-setup-page/
│   │   │       │       └── analysis-setup-page.component.ts (.html, .scss, .spec.ts)
│   │   │       ├── services/   # Serviços específicos da feature.
│   │   │       └── analysis-setup.module.ts
│   │   ├── shared/           # SharedModule: Componentes, pipes, diretivas reutilizáveis.
│   │   │   ├── components/   # Componentes reutilizáveis (ex: button, modal, spinner).
│   │   │   │   └── file-input/
│   │   │   │       └── file-input.component.ts (.html, .scss, .spec.ts)
│   │   │   ├── pipes/        # Pipes customizados.
│   │   │   ├── directives/   # Diretivas customizadas.
│   │   │   └── shared.module.ts
│   │   ├── app-routing.module.ts # Configuração de rotas principal.
│   │   ├── app.component.ts      # Componente raiz da aplicação Angular.
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   └── app.module.ts         # Módulo raiz da aplicação Angular.
│   ├── assets/               # Assets estáticos (imagens, fontes, etc.).
│   │   └── icons/
│   ├── environments/         # Arquivos de configuração de ambiente (dev, prod).
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── theme/                # Arquivos SASS para theming (variáveis, mixins).
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── index.html            # Ponto de entrada HTML principal.
│   ├── main.ts               # Ponto de entrada principal da aplicação Angular (bootstrap).
│   ├── polyfills.ts          # Polyfills para navegadores.
│   ├── styles.scss           # Estilos globais SASS.
│   └── test.ts               # Configuração principal para testes unitários (Karma).
├── main.js                 # Ponto de entrada principal do Electron (Processo Principal).
├── preload.js              # Script de preload do Electron (para comunicação segura renderer <-> main).
├── angular.json            # Configuração do Angular CLI.
├── package.json            # Dependências e scripts do Node/Electron/Angular.
├── tsconfig.app.json       # Configuração TypeScript para a aplicação.
├── tsconfig.json           # Configuração TypeScript base.
└── tsconfig.spec.json      # Configuração TypeScript para testes.
```

### Notes on Frontend Structure:

- **Modularidade:** A estrutura é organizada em torno de módulos Angular (`CoreModule`, `SharedModule`, e módulos por feature).
- **Features:** Cada funcionalidade principal (ex: "Configuração da Análise", "Visualização de Resultados") terá seu próprio módulo, contendo seus componentes, páginas e serviços específicos. Isso promove encapsulamento e escalabilidade.
- **CoreModule:** Contém serviços singleton, guards e interceptors que são usados em toda a aplicação e devem ser importados apenas uma vez no `AppModule`.
- **SharedModule:** Contém componentes, pipes e diretivas que são reutilizados em vários módulos de feature. Ele deve ser importado pelos módulos de feature que precisam de seus artefatos.
- **Electron:** Os arquivos `main.js` e `preload.js` residem na raiz do `app-ui` e são cruciais para a integração com o Electron.

## Component Breakdown & Implementation Details

Esta seção descreve as convenções e o template para definir componentes de UI. Detalhes para a maioria dos componentes emergirão durante a implementação das histórias de usuário.

### Component Naming & Organization

- **Component Naming Convention:** **PascalCase para arquivos e nomes de componentes (ex: `VideoSelectorComponent`, `video-selector.component.ts`). Seletores de componentes Angular usarão kebab-case (ex: `app-video-selector`).** Todos os arquivos de componentes devem seguir esta convenção.
- **Organization:** Componentes reutilizáveis globalmente em `src/app/shared/components/`. Componentes específicos de features co-localizados dentro de seu diretório de feature, ex: `src/app/features/feature-name/components/`.

### Template for Component Specification

Para cada componente de UI significativo, os seguintes detalhes DEVEM ser fornecidos.

#### Component: `{ComponentName}` (ex: `VideoSelectorComponent`)

- **Purpose:** {Descreve brevemente o que este componente faz e seu papel na UI. DEVE ser claro e conciso.}
- **Source File(s):** {ex: `src/app/features/analysis-setup/components/video-selector/video-selector.component.ts`. DEVE ser o caminho exato.}
- **Visual Reference:** {Link para o frame/componente Figma específico, ou descrição da UI/UX Spec. REQUERIDO.}
- **Props (Properties - `@Input()`):**
  | Prop Name | Type | Required? | Default Value | Description |
  | :------------- | :------- | :-------- | :------------ | :----------------------------------------------------------------------- |
  | `label` | `string` | No | `'Selecionar Vídeo'` | Texto a ser exibido no botão/área de seleção. |
  | `allowedTypes` | `string[]`| No | `['.mp4', '.mov']` | Tipos de arquivo permitidos (para o diálogo de seleção). |
- **Output Events (`@Output()`):**
  | Event Name | Payload Type | Description |
  | :------------- | :---------------- | :--------------------------------------------------- |
  | `videoSelected`| `File` | Emitido quando um arquivo de vídeo é selecionado. |
  | `selectionError`| `string` | Emitido se ocorrer um erro durante a seleção. |
- **Internal State (if any):**
  | State Variable | Type | Initial Value | Description |
  | :------------- | :------- | :------------ | :---------------------------------------- |
  | `selectedFile` | `File \| null` | `null` | Armazena o arquivo de vídeo selecionado. |
  | `isLoading` | `boolean`| `false` | Indica se está em processo de seleção. |
- **Key UI Elements / Structure:**
  ```html
  <div class="video-selector-container">
    <button (click)="openFileDialog()">{{ label }}</button>
    <span *ngIf="selectedFile">{{ selectedFile.name }}</span>
    <input
      type="file"
      [accept]="allowedTypes.join(',')"
      hidden
      #fileInput
      (change)="onFileSelected($event)"
    />
  </div>
  ```
- **Events Handled / Emitted:**
  - **Handles:** `click` no botão para abrir o diálogo, `change` no input de arquivo.
  - **Emits:** `videoSelected(file: File)`, `selectionError(message: string)`.
- **Actions Triggered (Side Effects):**
  - **State Management:** Atualiza `selectedFile` interno.
  - **API Calls:** "Chama `electronService.showOpenDialog(...)` para exibir o diálogo nativo de seleção de arquivos."
- **Styling Notes:**
  - "Container principal usa `video-selector-container`. Botão usa classe `btn-primary`. Nome do arquivo exibido usa classe `file-name`." Estilos encapsulados no `.scss` do componente.
- **Accessibility Notes:**
  - "Botão DEVE ter `aria-label` apropriado se o texto visual não for suficiente. Input de arquivo oculto é acionado programaticamente, mas o botão visível DEVE ser focável e operável pelo teclado (Enter/Space)."

---

### Foundational/Shared Components

Com base no PRD (`Product.md`) e na UI/UX Spec (`TCC_Frontend_Spec_UIUX_v1.0.txt`), alguns componentes fundamentais e compartilhados podem ser identificados inicialmente:

1.  **`FileInputComponent` (dentro de `SharedModule`)**

    - **Purpose:** Um componente genérico para seleção de arquivos, encapsulando a lógica de interação com o diálogo de seleção de arquivos (via `ElectronService`). Será usado para selecionar os vídeos.
    - **Visual Reference:** Descrito na Especificação UI/UX como "Seletores de arquivo para os dois vídeos de entrada".
    - **Props:** `label: string`, `allowedFileTypes: string[]` (ex: `['.mp4', '.mov']`), `id: string`.
    - **Output Events:** `fileSelected: EventEmitter<File>`
    - **Styling:** Botão estilizado, exibição do nome do arquivo selecionado.
    - **Accessibility:** Botão acessível, feedback claro sobre o arquivo selecionado.

2.  **`ParameterSliderComponent` (dentro de `SharedModule` ou `AnalysisSetupModule` se muito específico)**

    - **Purpose:** Para ajustar parâmetros numéricos como pesos de landmarks e sensibilidade, conforme RF006 e RF009.
    - **Visual Reference:** Descrito como "Campos de entrada numérica ou sliders" na Especificação UI/UX.
    - **Props:** `label: string`, `min: number`, `max: number`, `step: number`, `initialValue: number`.
    - **Output Events:** `valueChanged: EventEmitter<number>`.
    - **Styling:** Slider padrão HTML estilizado ou um componente de UI de terceiros.
    - **Accessibility:** Slider acessível via teclado, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.

3.  **`ToggleButtonComponent` (dentro de `SharedModule`)**

    - **Purpose:** Para habilitar/desabilitar a análise de ritmo/velocidade (RF008).
    - **Visual Reference:** Descrito como "Um checkbox ou botão toggle" na Especificação UI/UX.
    - **Props:** `label: string`, `initialState: boolean`.
    - **Output Events:** `toggled: EventEmitter<boolean>`.
    - **Styling:** Aparência de um switch toggle.
    - **Accessibility:** `role="switch"`, `aria-checked`.

4.  **`ResultsDisplayComponent` (provavelmente em um `ResultsModule` futuro)**

    - **Purpose:** Para exibir o score final de similaridade e um link para o arquivo de resultados (RF010).
    - **Visual Reference:** "Uma área de texto ou painel para exibir o score final de similaridade e um link/botão para salvar/abrir o arquivo de resultados detalhados."
    - **Props:** `similarityScore: number | null`, `resultsFilePath: string | null`.
    - **Output Events:** N/A (poderia ter um evento para "abrir arquivo").
    - **Styling:** Destaque visual para o score, link/botão claro.
    - **Accessibility:** Score claramente legível, link/botão acessível.

## State Management In-Depth

- **Chosen Solution:** Serviços Angular com RxJS `BehaviorSubject` para o MVP. Se a complexidade aumentar, NgRx será considerado.
- **Decision Guide for State Location:**
  - **Global State (Serviços com `BehaviorSubject`):** Dados compartilhados entre features ou componentes não diretamente relacionados; estado que precisa persistir durante a sessão da aplicação. **DEVE ser usado para:** caminhos dos vídeos selecionados, parâmetros de análise atuais, estado do processo de análise (ocioso, processando, sucesso, erro), resultados da análise.
  - **Local Component State (propriedades do componente):** Estado específico da UI, não necessário fora do componente ou seus filhos diretos (ex: estado de abertura de um dropdown, valor de um campo de input antes de ser "aplicado"). **DEVE ser a escolha padrão, a menos que os critérios para Estado Global sejam atendidos.**

### Store Structure / Slices

Não haverá "slices" formais como no Redux, mas sim serviços Angular dedicados que gerenciam partes específicas do estado da aplicação.

- **`AnalysisStateService` (em `src/app/core/services/analysis-state.service.ts`):**

  - **Purpose:** Gerencia o estado relacionado à configuração e execução da análise de dança.
  - **State Shape (via `BehaviorSubject`s públicos ou getters que retornam Observables):**

    ```typescript
    // Exemplo de BehaviorSubjects internos
    private readonly _videoPrincipalPath = new BehaviorSubject<string | null>(null);
    private readonly _videosComparacaoPaths = new BehaviorSubject<string[]>([]);
    private readonly _analysisParameters = new BehaviorSubject<AnaliseParameters | null>(null); // Usar interface definida em data-models.md
    private readonly _analysisStatus = new BehaviorSubject<'idle' | 'processing' | 'success' | 'error'>('idle');
    private readonly _analysisResults = new BehaviorSubject<AnaliseResponse | null>(null); // Usar interface definida em data-models.md
    private readonly _analysisError = new BehaviorSubject<string | null>(null);

    // Observables públicos
    public readonly videoPrincipalPath$ = this._videoPrincipalPath.asObservable();
    public readonly videosComparacaoPaths$ = this._videosComparacaoPaths.asObservable();
    public readonly analysisParameters$ = this._analysisParameters.asObservable();
    public readonly analysisStatus$ = this._analysisStatus.asObservable();
    public readonly analysisResults$ = this._analysisResults.asObservable();
    public readonly analysisError$ = this._analysisError.asObservable();
    ```

  - **Key Methods (atuam como Actions/Reducers):**
    - `setVideoPrincipal(path: string | null): void`
    - `addVideoComparacao(path: string): void`
    - `removeVideoComparacao(path: string): void`
    - `setAnalysisParameters(params: AnaliseParameters): void`
    - `startAnalysis(): Promise<void>` (método assíncrono que interage com `AnalysisService` e atualiza `_analysisStatus`, `_analysisResults`, `_analysisError`)
    - `clearResults(): void`
    - `resetState(): void`

### Key Selectors

Os "selectors" serão os Observables públicos expostos pelos serviços de estado (ex: `analysisStateService.videoPrincipalPath$`). Os componentes se inscreverão nesses Observables para reagir às mudanças de estado. Para seletores derivados ou combinados, `rxjs/operators` como `map`, `combineLatest` serão usados dentro dos componentes ou em outros serviços.

- `analysisStateService.videoPrincipalPath$`
- `analysisStateService.analysisStatus$`
- `analysisStateService.analysisResults$`

### Key Actions / Reducers / Thunks

Os métodos públicos nos serviços de estado (como `AnalysisStateService.startAnalysis()`) atuam como "thunks" ou ações que podem envolver lógica assíncrona e múltiplas atualizações de estado.

- **`AnalysisStateService.startAnalysis(): Promise<void>`:**
  - **Purpose:** Inicia o processo de análise de vídeo, chamando o serviço de API e atualizando o estado da análise.
  - **Parameters:** Nenhum (pega os dados de vídeos e parâmetros do estado interno do serviço).
  - **Logic Flow:**
    1.  Obtém os caminhos dos vídeos e parâmetros dos `BehaviorSubject`s internos.
    2.  Valida se os dados necessários estão presentes. Se não, atualiza `_analysisError` e `_analysisStatus` para `'error'`.
    3.  Atualiza `_analysisStatus.next('processing')`.
    4.  Chama `analysisApiService.performAnalysis({ video_principal_path, videos_comparacao_paths, parametros_analise })`. (Ver `AnalysisApiService` na seção API Interaction Layer).
    5.  On `fulfilled` (sucesso):
        - `_analysisResults.next(response.data)`;
        - `_analysisStatus.next('success')`;
        - `_analysisError.next(null)`.
    6.  On `rejected` (erro):
        - `_analysisError.next(error.message)`; // Ou uma mensagem de erro mais amigável
        - `_analysisStatus.next('error')`;
        - `_analysisResults.next(null)`.

## API Interaction Layer

Descreve como o frontend Angular se comunica com a API `core-logic` (FastAPI).

### Client/Service Structure

- **HTTP Client Setup:** O `HttpClientModule` do Angular será importado no `AppModule`. Um `HttpInterceptor` (ex: `ErrorInterceptor`) pode ser configurado para tratamento global de erros.
  - O `HttpClient` do Angular será injetado nos serviços que precisam fazer chamadas HTTP.
  - A URL base da API (`http://localhost:PORTA_DO_FASTAPI`, ex: `http://localhost:8008`) será configurada nos `environment` files.
- **Service Definitions (Example):**
  - **`AnalysisApiService` (em `src/app/core/services/analysis-api.service.ts`):**
    - **Purpose:** Encapsula todas as interações com a API do `core-logic`.
    - **Functions:**
      - `performAnalysis(request: AnaliseRequest): Observable<AnaliseResponse>`
        - Fará uma requisição `POST` para `/analise`.
        - Usará as interfaces `AnaliseRequest` e `AnaliseResponse` (definidas no `Architecture.md` e que devem ser replicadas como interfaces TypeScript no frontend em, por exemplo, `src/app/core/models/api-models.ts`).
      - `getServerStatus(): Observable<StatusServidorResponse>`
        - Fará uma requisição `GET` para `/status_servidor`.
        - Usará a interface `StatusServidorResponse`.
    - Cada função DEVE ter tipos explícitos para parâmetros e retorno, JSDoc explicando propósito, params, valor de retorno, e tratar erros específicos se necessário (embora o tratamento primário possa ser global).

### Error Handling & Retries (Frontend)

- **Global Error Handling:** Um `HttpInterceptor` (ex: `ErrorInterceptor` em `src/app/core/interceptors/error.interceptor.ts`) será implementado para:
  - Capturar erros HTTP (4xx, 5xx) de respostas da API.
  - Registrar o erro no console.
  - Atualizar uma fatia do estado global (ex: `UiStateService`) para exibir uma notificação/toast de erro ao usuário (ex: usando Angular Material Snackbar ou similar).
  - Para erros específicos (ex: 400 Bad Request com detalhes de validação), o interceptor pode formatar o erro antes de passá-lo adiante ou para o `UiStateService`.
- **Specific Error Handling:** Componentes podem se inscrever no `errorObservable` de uma chamada de serviço específica para fornecer feedback contextual (ex: "Falha ao carregar vídeo X: {mensagem de erro}").
- **Retry Logic:** Para o MVP, não haverá lógica de retry no cliente. Se uma chamada falhar, o usuário precisará tentar novamente manualmente. Isso pode ser reconsiderado se a API se mostrar instável.

## Routing Strategy

- **Routing Library:** `RouterModule` do Angular.

### Route Definitions

Considerando a natureza da aplicação (ferramenta de pesquisa com foco em uma tela principal), o roteamento pode ser simples inicialmente.

| Path Pattern | Component/Page (`src/app/features/...`)                               | Protection | Notes                                                                                                   |
| :----------- | :-------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------ |
| `/`          | `analysis-setup/pages/analysis-setup-page/AnalysisSetupPageComponent` | `Public`   | Tela principal para carregar vídeos, configurar parâmetros e ver resultados.                            |
| `''`         | `analysis-setup/pages/analysis-setup-page/AnalysisSetupPageComponent` | `Public`   | Redireciona para a tela principal.                                                                      |
| `**`         | `analysis-setup/pages/analysis-setup-page/AnalysisSetupPageComponent` | `Public`   | Rota curinga, redireciona para a tela principal (ou uma página de "Não encontrado" dedicada se criada). |

Se a aplicação crescer com seções distintas (ex: "Histórico de Análises", "Configurações da Aplicação"), novas rotas e módulos de feature serão adicionados. O `Lazy Loading` será considerado para esses módulos.

### Route Guards / Protection

- **Authentication Guard:** Não aplicável para este projeto, pois não há login de usuário.
- **Authorization Guard (if applicable):** Não aplicável.

## Electron Integration

Esta seção detalha como o código Angular interage com as APIs do Electron.

### IPC Communication (`preload.js`)

Conforme definido no `Architecture.md`, um script `preload.js` será usado para expor funcionalidades específicas do Electron de forma segura para o processo Renderer (Angular).

- **`preload.js` (em `app-ui/preload.js`):**

  ```javascript
  const { contextBridge, ipcRenderer } = require("electron");

  contextBridge.exposeInMainWorld("electronAPI", {
    showOpenDialog: (options) => ipcRenderer.invoke("dialog:openFile", options),
    // Exemplo de como o Electron pode gerenciar o servidor Python:
    startPythonServer: () => ipcRenderer.invoke("python:start-server"),
    stopPythonServer: () => ipcRenderer.send("python:stop-server"),
    getPythonServerStatus: () => ipcRenderer.invoke("python:get-status"),
    // Listener para status do servidor Python (opcional, se o main envia proativamente)
    onPythonServerStatusUpdate: (callback) =>
      ipcRenderer.on("python-status-update", (_event, value) =>
        callback(value)
      ),
  });
  ```

- **`main.js` (em `app-ui/main.js`):**
  - DEVE implementar os handlers para os canais IPC invocados/enviados pelo `preload.js`.
    - `ipcMain.handle('dialog:openFile', async (event, options) => { ... dialog.showOpenDialog(mainWindow, options) ... });`
    - `ipcMain.handle('python:start-server', async () => { /* Lógica para iniciar servidor Python */ });`
    - `ipcMain.send('python:stop-server', () => { /* Lógica para parar servidor Python */ });`
    - `ipcMain.handle('python:get-status', async () => { /* Lógica para verificar status do servidor Python */ });`
  - A lógica para iniciar e parar o servidor Python (`core-logic/main_core_entry.py`) será gerenciada aqui, usando `child_process` do Node.js.

### Electron-Specific Services

- **`ElectronService` (em `src/app/core/services/electron.service.ts`):**

  - **Purpose:** Abstrai as interações com a API do Electron exposta via `preload.js`.
  - **Interface (TypeScript):**

    ```typescript
    // Definir uma interface global para o objeto exposto pelo preload
    // em um arquivo .d.ts, ex: src/electron-api.d.ts
    /*
    export interface IElectronAPI {
      showOpenDialog: (options: OpenDialogOptions) => Promise<OpenDialogReturnValue>;
      startPythonServer: () => Promise<{ success: boolean; message?: string }>;
      stopPythonServer: () => void;
      getPythonServerStatus: () => Promise<'running' | 'stopped' | 'error'>;
      onPythonServerStatusUpdate: (callback: (status: 'running' | 'stopped' | 'error', message?: string) => void) => void;
    }
    
    declare global {
      interface Window {
        electronAPI: IElectronAPI;
      }
    }
    */
    ```

  - **Implementation:**

    ```typescript
    import { Injectable } from "@angular/core";
    // import { OpenDialogOptions, OpenDialogReturnValue } from 'electron'; // Tipos do Electron se necessário

    @Injectable({
      providedIn: "root",
    })
    export class ElectronService {
      private get api() {
        // Helper para acessar a API de forma segura
        if (window.electronAPI) {
          return window.electronAPI;
        }
        throw new Error("Electron API não está disponível.");
      }

      async showOpenDialog(
        options?: any /* OpenDialogOptions */
      ): Promise<any /* OpenDialogReturnValue */> {
        try {
          return await this.api.showOpenDialog(options || {});
        } catch (error) {
          console.error("Erro ao abrir diálogo de arquivo:", error);
          // Retornar um valor padrão ou lançar o erro, dependendo da necessidade
          return { canceled: true, filePaths: [] };
        }
      }

      async startPythonServer(): Promise<{
        success: boolean;
        message?: string;
      }> {
        try {
          return await this.api.startPythonServer();
        } catch (error) {
          console.error("Erro ao iniciar servidor Python:", error);
          return { success: false, message: (error as Error).message };
        }
      }

      stopPythonServer(): void {
        try {
          this.api.stopPythonServer();
        } catch (error) {
          console.error("Erro ao tentar parar servidor Python:", error);
        }
      }

      async getPythonServerStatus(): Promise<"running" | "stopped" | "error"> {
        try {
          return await this.api.getPythonServerStatus();
        } catch (error) {
          console.error("Erro ao obter status do servidor Python:", error);
          return "error";
        }
      }

      onPythonServerStatusUpdate(
        callback: (
          status: "running" | "stopped" | "error",
          message?: string
        ) => void
      ): void {
        try {
          this.api.onPythonServerStatusUpdate(callback);
        } catch (error) {
          console.error(
            "Erro ao registrar listener para status do servidor Python:",
            error
          );
        }
      }
    }
    ```

  - Este serviço será injetado nos componentes/serviços Angular que precisam interagir com o sistema de arquivos ou gerenciar o servidor Python.

## Styling and Theming

### Approach

- **SCSS por Componente:** Os estilos serão definidos em arquivos `.scss` co-localizados com seus respectivos componentes Angular. A encapsulação de estilo do Angular (`ViewEncapsulation.Emulated`) será usada para evitar que estilos de um componente afetem outros.
- **Estilos Globais:** Estilos globais, resets de CSS e variáveis SASS (cores, tipografia, espaçamento) serão definidos em `src/styles.scss` e em parciais dentro de `src/theme/` (ex: `src/theme/_variables.scss`).

### UI Component Library

- Para o MVP, será priorizado o uso de elementos HTML padrão estilizados com SCSS para manter a aplicação leve.
- Se a necessidade de componentes mais complexos e prontos surgir (ex: modais avançados, tabelas com muita interatividade), **Angular Material** ou **PrimeNG** podem ser considerados. A escolha será baseada na facilidade de integração, customização e no conjunto de componentes oferecidos que se alinham com as necessidades do projeto.
- Justificativa: Manter o foco no desenvolvimento da lógica principal do TCC, utilizando bibliotecas de UI apenas se economizarem tempo de desenvolvimento significativo para funcionalidades não-críticas da análise em si.

### Theming (Light/Dark)

- Para o MVP, não haverá suporte a múltiplos temas (ex: claro/escuro). Um único tema (provavelmente claro, para melhor legibilidade em contextos de pesquisa) será implementado.
- Se o theming se tornar um requisito futuro, variáveis CSS ou SASS serão usadas extensivamente para permitir a troca de paletas de cores.

## Forms and Validation

- **Abordagem para Formulários:** **Reactive Forms** do Angular serão utilizados para todos os formulários, devido à sua flexibilidade e facilidade para lidar com validação complexa e dinâmica.
- **Validação de Entrada:**
  - **Validação no Frontend:** Implementada usando os validadores embutidos do Angular (`Validators.required`, `Validators.min`, `Validators.pattern`, etc.) e validadores customizados conforme necessário. O feedback de validação será exibido próximo aos campos do formulário. A validação no frontend serve primariamente para melhorar a UX, fornecendo feedback imediato.
  - **Validação no Backend:** A API `core-logic` (FastAPI com Pydantic) é a autoridade final para validação de dados, conforme especificado no `Architecture.md`. Erros de validação do backend serão exibidos ao usuário no frontend.

## Build, Bundling, and Deployment

- **Build Process & Scripts (from `package.json`):**
  - `"ng_build": "ng build"`: Compila a aplicação Angular.
  - `"electron_build": "electron-builder"`: Empacota a aplicação Electron para distribuição (após o `ng build`).
  - `"start:electron": "ng build && electron ."` (ou similar para desenvolvimento com hot-reload se configurado via `electron-reloader` ou `nodemon`).
  - Scripts específicos para o `app-ui` no `package.json` do monorepo (se houver um `package.json` na raiz do monorepo orquestrando os builds).
- **Environment Configuration Management:** Usará os arquivos `src/environments/environment.ts` (para desenvolvimento) e `src/environments/environment.prod.ts` (para produção). Estes arquivos podem conter a URL base da API `core-logic` e outras configurações específicas do ambiente. O Angular CLI gerencia a substituição desses arquivos durante o build.
  - `environment.ts`: `{ production: false, coreLogicApiUrl: 'http://localhost:8008/api' }`
  - `environment.prod.ts`: `{ production: true, coreLogicApiUrl: 'http://localhost:8008/api' }` (a porta pode ser a mesma para uma aplicação local)

### Key Bundling Optimizations

- **Code Splitting:** O Angular CLI já realiza code splitting por rotas (lazy-loaded modules) automaticamente. Para o MVP, com poucas rotas, o impacto será menor, mas a estrutura com módulos de feature permitirá lazy loading futuro.
- **Tree Shaking:** O Angular CLI e o Webpack (usado internamente pelo Angular CLI) realizam tree shaking para remover código não utilizado, desde que se usem importações ES6.
- **Lazy Loading (Components, Images, etc.):**
  - **Módulos:** Lazy loading para módulos de feature será implementado se a aplicação crescer (`loadChildren` na configuração de rotas).
  - **Imagens:** O atributo `loading="lazy"` será usado para imagens não críticas.
- **Minification & Compression:** O Angular CLI minifica o código JavaScript e CSS em builds de produção. A compressão (Gzip/Brotli) para os assets da aplicação Electron não é tão crítica quanto para web apps, mas o `electron-builder` pode ter opções para otimizar o tamanho do pacote.

### Deployment to CDN/Hosting

- **Target Platform:** Não aplicável (aplicação desktop local). A "implantação" consiste em gerar um instalador/executável para Windows, macOS e/ou Linux usando `electron-builder`.
- **Deployment Trigger:** Manualmente ou via script CI/CD que executa `electron-builder` após um push para a branch principal.
- **Asset Caching Strategy:** Não aplicável no sentido tradicional de CDN. Os assets são empacotados com a aplicação.

## Frontend Testing Strategy

Conforme `Architecture.md`, Jasmine e Karma são as ferramentas padrão para testes unitários no Angular.

- **Link to Main Overall Testing Strategy:** `Architecture.md#overall-testing-strategy`

### Component Testing

- **Scope:** Testar componentes Angular individuais em isolamento.
- **Tools:** Jasmine e Karma (via Angular CLI). `TestBed` do Angular para configurar o ambiente de teste.
- **Focus:**
  - Renderização correta com diferentes `@Input()`s.
  - Emissão correta de `@Output()`s em resposta a interações do usuário (simuladas com `triggerEventHandler` ou `nativeElement.click()`).
  - Interação com serviços mockados.
  - Validação de classes CSS aplicadas condicionalmente.
  - **Snapshot testing NÃO será usado.** Preferência por asserções explícitas sobre o DOM e o estado do componente.
- **Location:** Arquivos `*.spec.ts` co-localizados com os arquivos de componente.

### UI Integration/Flow Testing

- **Scope:** Testar como múltiplos componentes interagem dentro de um módulo de feature ou em um fluxo de usuário menor (ex: o fluxo de seleção de dois vídeos e configuração de parâmetros).
- **Tools:** Jasmine, Karma, `TestBed`. Serviços reais podem ser usados se não tiverem efeitos colaterais pesados (como chamadas de API reais, que devem ser mockadas). `RouterTestingModule` para testar navegação.
- **Focus:** Fluxo de dados entre componentes pais e filhos, atualização do estado do serviço em resposta a interações, navegação básica.

### End-to-End UI Testing Tools & Scope

- **Tools:** Conforme definido no `Architecture.md`, se E2E for considerado. Para uma aplicação Electron, ferramentas como Playwright ou Spectron (específico para Electron) poderiam ser usadas. **Para o escopo de um TCC MVP, testes E2E automatizados podem ser despriorizados em favor de testes manuais completos.**
- **Scope (Frontend Focus):** Se implementado, os principais fluxos seriam:
  1.  Carregar vídeo principal e vídeo de comparação.
  2.  Ajustar parâmetros de análise.
  3.  Iniciar análise e verificar se o resultado é exibido.
  4.  Verificar se o arquivo de resultado é mencionado/acessível.
- **Test Data Management for UI:** Vídeos de teste pequenos e padronizados seriam necessários no repositório. A API `core-logic` seria mockada ou executada em um modo de teste que retorna resultados previsíveis.

## Accessibility (AX) Implementation Details

Embora não seja o foco principal para um MVP de TCC (conforme PRD), boas práticas básicas serão seguidas.

- **Semantic HTML:** Uso de elementos HTML5 semanticamente corretos (`<button>`, `<input>`, `<label>`, etc.).
- **ARIA Implementation:** Atributos ARIA básicos serão usados onde necessário para melhorar a acessibilidade de componentes customizados ou interações complexas (ex: `aria-label` para botões icônicos, `aria-live` para regiões que atualizam dinamicamente com resultados).
- **Keyboard Navigation:** Todos os elementos interativos (botões, inputs, sliders) DEVERÃO ser focáveis e operáveis via teclado. A ordem de foco DEVE ser lógica.
- **Focus Management:** Feedback visual de foco claro será mantido. Para diálogos (como seleção de arquivo), o Electron os gerencia nativamente.
- **Testing Tools for AX:** Verificações manuais básicas (navegação por teclado, contraste de cores simples). Ferramentas automatizadas como Axe DevTools podem ser usadas esporadicamente.

## Performance Considerations

O foco é em uma experiência de usuário fluida para uma aplicação desktop local.

- **Image Optimization:** Não haverá muitas imagens, mas se houver, formatos otimizados e tamanhos apropriados serão usados.
- **Minimizing Re-renders:** O Angular já possui um sistema de detecção de mudanças eficiente. `ChangeDetectionStrategy.OnPush` será usado em componentes "burros" para otimizar performance, se necessário.
- **Debouncing/Throttling:** Pode ser aplicado a inputs de sliders se eles dispararem atualizações frequentes que causem lentidão, usando operadores RxJS como `debounceTime`.
- **Virtualization:** Não previsto para o MVP, pois não se espera listas extremamente longas.
- **Performance Monitoring Tools:** Angular DevTools e o Performance Profiler do Chrome DevTools para identificar gargalos, se surgirem.

## Internationalization (i18n) and Localization (l10n) Strategy

**Internationalization is not a requirement for this project at this time.** A interface será em Português (Brasil). Se i18n se tornar um requisito futuro, bibliotecas como `@ngx-translate/core` seriam consideradas.

## Feature Flag Management

**Feature flags are not a primary architectural concern for this project at this time.**

## Frontend Security Considerations

Para uma aplicação Electron local, as preocupações de segurança são diferentes de aplicações web.

- **Cross-Site Scripting (XSS) Prevention:** O Angular já interpola dados por padrão, o que previne a maioria dos XSS. `[innerHTML]` será evitado; se absolutamente necessário, o conteúdo será sanitizado usando o `DomSanitizer` do Angular.
- **Secure Token Storage & Handling:** Não aplicável (sem autenticação de usuário).
- **Third-Party Script Security:** Mínimo uso de scripts de terceiros. Se usados, de fontes confiáveis.
- **Client-Side Data Validation:** Apenas para UX. Validação crítica no `core-logic`.
- **API Key Exposure:** Não aplicável para a API `core-logic` local.
- **Secure Communication (HTTPS):** A comunicação com `core-logic` é local via HTTP. Não há necessidade de HTTPS para esta comunicação localhost.
- **Dependency Vulnerabilities:** `npm audit` será executado periodicamente.
- **Electron Security Best Practices:**
  - `nodeIntegration: false` (Padrão no Electron \> 5).
  - `contextIsolation: true` (Padrão no Electron \> 12).
  - Usar `preload.js` para expor APIs IPC específicas (já definido).
  - Validar todos os dados e comandos recebidos do processo Renderer no processo Main.
  - Limitar o escopo de módulos do Node.js expostos ao Renderer.

## Browser Support and Progressive Enhancement

- **Target Browsers:** O "navegador" é o Chromium embarcado pelo Electron. A versão do Chromium será a que acompanha a versão do Electron escolhida (ex: Electron 28 usa Chromium \~120).
- **Polyfill Strategy:** O Angular CLI gerencia polyfills básicos via `src/polyfills.ts`.
- **JavaScript Requirement & Progressive Enhancement:** JavaScript é obrigatório, pois é uma aplicação Angular.
