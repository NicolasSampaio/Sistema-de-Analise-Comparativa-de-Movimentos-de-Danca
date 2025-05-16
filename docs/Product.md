# Sistema de Análise Comparativa de Movimentos de Dança para TCC Product Document

## Documentos de Referência

- [Documento de Arquitetura](docs/Architecture.md) - Detalhes técnicos e decisões de arquitetura do sistema
- [Documento de Arquitetura do Frontend](docs/Frontend-Architecture.md) - Detalhes técnicos e decisões de arquitetura do frontend

## Objetivo e Contexto

### Meta Principal

Desenvolver um sistema de software como Trabalho de Conclusão de Curso (TCC) em Sistemas de Informação, capaz de receber dois arquivos de vídeo e realizar uma análise comparativa para determinar se os sujeitos nos vídeos executaram os mesmos movimentos de dança.

### Objetivos Específicos do TCC:

- Compreender e implementar a análise da dinâmica temporal e do posicionamento estático de elementos-chave (pontos de pose) nas sequências de imagens dos vídeos.
- Permitir a parametrização da precisão da análise para fins de validação e testes, incluindo a definição de pesos para diferentes partes do corpo e a sensibilidade da comparação.
- Utilizar bibliotecas em Python, como `MediaPipe` para extração de pose e `NumPy` para manipulação de dados, para extrair matrizes de pontos fixos (landmarks corporais) e, com base nisso, identificar semelhanças, diferenças e desvios toleráveis entre elas usando algoritmos como Dynamic Time Warping (DTW).
- Focar a análise em estilos de dança específicos como K-pop e Sapateado para validar a abordagem.

### Contexto:

Este projeto é o Trabalho de Conclusão de Curso do estudante (usuário principal e pesquisador). O sistema servirá como uma ferramenta para a pesquisa, permitindo a experimentação com diferentes vídeos e parâmetros, e a coleta de dados para a redação do TCC. A ênfase está na funcionalidade de análise e na capacidade de explorar os resultados, mais do que em criar um produto comercial polido.

## Requisitos Funcionais (MVP)

1.  **RF001: Carregamento de Vídeo Duplo:** O sistema deve permitir que o usuário selecione e carregue dois arquivos de vídeo (formato comum, ex: `.mp4`, `.mov`) para comparação.
2.  **RF002: Extração de Pose (`MediaPipe`):** Para cada vídeo carregado, o sistema deve processá-lo para extrair 33 landmarks de pose 2D (`x`, `y`) e idealmente 3D (`x`, `y`, `z`, com a coordenada `z` sendo usada com cautela devido à sua natureza estimada em vídeos 2D) e scores de visibilidade para cada landmark detectado, em cada frame, utilizando a biblioteca `MediaPipe`.
3.  **RF003: Sincronização de Vídeo (Manual para MVP):** Para o MVP, o usuário será responsável por garantir que os dois vídeos estejam sincronizados em termos de início do movimento de dança (ex: editando os vídeos previamente para começarem no mesmo ponto da coreografia, que será considerado o "tempo 0").
4.  **RF004: Normalização de Pose:** Antes da comparação, os dados de pose extraídos devem ser normalizados para minimizar diferenças devido ao tamanho dos dançarinos e sua posição/orientação na tela.
    1.  **Normalização de Tamanho:** Escalonar os landmarks de pose com base em uma métrica corporal consistente (ex: distância entre ombros ou altura do tronco).
    2.  **Normalização de Posição:** Transladar os landmarks de pose para uma origem comum (ex: centralizar pelo ponto médio do quadril).
5.  **RF005: Representação Híbrida da Pose:** Cada pose (conjunto de landmarks de um frame) deve ser representada por um vetor que combine:
    - Coordenadas normalizadas dos landmarks selecionados (com prioridade para membros e tronco).
    - Ângulos chave do corpo (ex: ângulos de cotovelos, joelhos, tronco).
6.  **RF006: Ponderação de Landmarks:** O sistema deve permitir que o usuário atribua diferentes pesos de importância a grupos predefinidos de landmarks corporais (ex: "braços", "pernas", "tronco") para influenciar o cálculo de similaridade.
7.  **RF007: Comparação de Sequência de Movimento (DTW):** O sistema deve utilizar o algoritmo Dynamic Time Warping (DTW) para comparar a sequência temporal completa de representações de pose híbridas normalizadas dos dois vídeos, resultando em um score de distância/similaridade global.
8.  **RF008: Comparação de Ritmo/Velocidade (Opcional):**
    8.1 O sistema deve incluir um componente para analisar a velocidade relativa dos movimentos entre os dois vídeos, calculando a taxa de variação temporal dos landmarks corporais chave (ex: quadril, ombros) e comparando os padrões de aceleração/desaceleração.
    8.2 O usuário deve poder habilitar ou desabilitar esta análise através de um controle na interface, com um peso configurável (0-100%) para determinar sua influência no score final de similaridade.
    8.3 Quando habilitado, o resultado da comparação deve combinar o score de similaridade de pose (DTW) com o score de similaridade de ritmo/velocidade, usando o peso definido pelo usuário para calcular uma média ponderada que represente o score final de similaridade da dança.
9.  **RF009: Parametrização da Sensibilidade de Comparação:** O sistema deve permitir que o usuário ajuste parâmetros que definam a sensibilidade da comparação de poses (margem de erro), refletindo a abordagem híbrida (distância e ângulo).
10. **RF010: Saída de Resultados:** O sistema deve apresentar o score final de similaridade da dança. Os scores e os principais parâmetros utilizados na comparação devem ser salvos em um arquivo (ex: `JSON` ou `CSV`) para análise posterior pelo pesquisador.

## Requisitos Não Funcionais (MVP)

1.  **RNF001: Usabilidade (Foco Pesquisador):** A interface do usuário (desktop) deve ser clara e funcional, permitindo que o pesquisador (usuário principal) carregue vídeos, configure parâmetros de análise facilmente e visualize os resultados principais. A interface não precisa de design elaborado, mas sim de clareza funcional.
2.  **RNF002: Desempenho:** O processamento dos vídeos e a análise comparativa devem ser executáveis em uma máquina desktop local padrão (CPU/GPU) em um tempo razoável para experimentação no contexto de um TCC (ex: minutos, não horas, para vídeos de dança de duração típica).
3.  **RNF003: Precisão:** O sistema deve fornecer resultados de similaridade consistentes e reproduzíveis, permitindo ao pesquisador testar diferentes parâmetros e analisar o impacto na precisão percebida, conforme os objetivos do TCC.
4.  **RNF004: Modulariade:** O código da lógica principal (Python) deve ser organizado de forma modular para facilitar o entendimento, a manutenção e potenciais extensões futuras (ex: testar diferentes algoritmos de comparação ou métricas).
5.  **RNF005: Plataforma:** O sistema será uma aplicação desktop, utilizando `Electron` e `Angular` para o frontend e Python para a lógica de processamento principal, operando localmente na máquina do usuário.
6.  **RNF006: Confiabilidade:** A extração de pose deve ser robusta para vídeos de qualidade razoável. O processo de comparação deve ser determinístico para os mesmos inputs e parâmetros.

## Metas de Interação e Design do Usuário

### Visão Geral da Experiência

Uma ferramenta de pesquisa funcional e direta. O usuário (estudante de TCC) precisa controlar os inputs, parâmetros e ver os outputs de forma clara para sua análise.

### Paradigmas de Interação Chave:

- Seletores de arquivo para os dois vídeos de entrada.
- Campos de entrada numérica ou sliders para ajustar pesos de landmarks.
- Campos de entrada numérica ou sliders para ajustar limiares de sensibilidade/margem de erro.
- Um checkbox ou botão toggle para ativar/desativar a análise de ritmo/velocidade.
- Um botão "Iniciar Comparação" para disparar o processo de análise.
- Uma área de texto ou painel para exibir o score final de similaridade e um link/botão para salvar/abrir o arquivo de resultados detalhados.

### Telas/Visões Principais (Conceitual para `Electron`/`Angular`):

**Tela Principal Única:**

- **Seção de "Input":** Controles para selecionar Vídeo 1 e Vídeo 2.
- **Seção de "Parâmetros de Análise":**
  - Controles para pesos de landmarks (ex: sliders para "Tronco", "Braços", "Pernas").
  - Controles para sensibilidade da comparação (margem de erro).
  - Toggle para análise de Ritmo/Velocidade.
- **Seção de "Ação":** Botão "Comparar".
- **Seção de "Resultados":** Espaço para exibir o score numérico principal. Indicação de onde o arquivo de resultado foi salvo.

### Acessibilidade

Conformidade com as diretrizes padrão de acessibilidade para aplicações desktop.

### Considerações de Branding

Não aplicável para este projeto de TCC.

### Dispositivos/Plataformas Alvo

Aplicação desktop local (Windows, macOS, Linux, conforme suportado pelo `Electron`).

## Suposições Técnicas

- **Qualidade dos Vídeos de Entrada:** Assume-se que os vídeos fornecidos terão qualidade suficiente (iluminação, resolução, sem oclusões extremas) para que o `MediaPipe` possa detectar poses de forma eficaz. O usuário está ciente de que condições de vídeo muito ruins podem impactar a qualidade da extração de pose e, consequentemente, da comparação.
- **Ambiente de Execução:** O sistema será executado em um ambiente local com Python (e bibliotecas como `MediaPipe`, `NumPy`) e `Node.js` (para `Electron`/`Angular`) devidamente instalados e configurados pelo usuário.
- **Recursos Computacionais:** O sistema é projetado para rodar em computadores desktop pessoais padrão, com CPU e, opcionalmente, GPU que possam suportar o processamento do `MediaPipe` e os cálculos de DTW para vídeos de dança de alguns minutos de duração.
- **Sincronização Prévia:** Assume-se que o usuário realizará a sincronização temporal dos vídeos (garantindo que ambos comecem no mesmo ponto da coreografia) antes de carregá-los no sistema para o MVP.
- **Escopo do "Ritmo/Velocidade":** A análise de ritmo/velocidade será baseada nas informações de pose e timestamps, não envolvendo análise de áudio para o MVP.

## Requisitos de Teste (Perspectiva do Pesquisador)

- O sistema deve permitir ao pesquisador executar múltiplas comparações com diferentes pares de vídeos e variando os parâmetros de análise (pesos, sensibilidade, toggle de ritmo).
- Os resultados de cada comparação (score final, parâmetros utilizados) devem ser salvos de forma consistente em arquivos para permitir a análise e documentação no TCC.
- O pesquisador precisa de um método claro para verificar como as mudanças nos parâmetros afetam o resultado da similaridade.

## Visão Geral dos Épicos

### Épico 1: Fundação do Projeto e Interface do Usuário Inicial

**Objetivo:** Configurar o ambiente de desenvolvimento do monorepo, criar a estrutura básica da aplicação `Electron`/`Angular` e a interface inicial para seleção de arquivos de vídeo e exibição de um resultado placeholder. Integrar a comunicação básica entre o frontend e um script Python placeholder.

### Épico 2: Processamento de Vídeo e Extração de Pose com Normalização

**Objetivo:** Implementar a lógica em Python para carregar os vídeos selecionados, extrair frames, integrar o `MediaPipe` para detecção e extração de landmarks de pose, e aplicar os algoritmos de normalização de pose (tamanho e posição).

### Épico 3: Motor de Comparação de Movimento

**Objetivo:** Desenvolver o núcleo da lógica de comparação, incluindo a representação híbrida da pose, a implementação do DTW para sequências de pose, o cálculo do score de similaridade, a funcionalidade de ponderação de landmarks, a análise opcional de ritmo/velocidade e a parametrização da sensibilidade.

### Épico 4: Integração Final, Testes e Geração de Resultados

**Objetivo:** Integrar completamente o motor de comparação com a interface do usuário, permitir que o usuário dispare a análise com os parâmetros definidos, exiba o score final na UI e salve os resultados detalhados em arquivos. Realizar testes de ponta a ponta com vídeos de exemplo (K-pop, Sapateado).

## Detalhamento dos Épicos e Histórias de Usuário

### Épico 1: Fundação do Projeto e Interface do Usuário Inicial

**Objetivo:** Configurar o ambiente de desenvolvimento do monorepo, criar a estrutura básica da aplicação `Electron`/`Angular` e a interface inicial para seleção de arquivos de vídeo e exibição de um resultado placeholder. Integrar a comunicação básica entre o frontend e um script Python placeholder.

**Histórias de Usuário:**

- **HU1.1:** Como pesquisador, quero conseguir iniciar a aplicação desktop para acessar suas funcionalidades.
  - **AC:** A aplicação `Electron` é compilada e executada com sucesso. Uma janela principal é exibida.
- **HU1.2:** Como pesquisador, quero uma interface onde eu possa selecionar dois arquivos de vídeo da minha máquina.
  - **AC:** A UI possui dois botões/campos distintos para "Selecionar Vídeo 1" e "Selecionar Vídeo 2". Clicar neles abre um diálogo nativo de seleção de arquivos. Os caminhos dos arquivos selecionados são exibidos na UI.
- **HU1.3:** Como pesquisador, quero um botão para "Iniciar Comparação" que, inicialmente, possa apenas confirmar os vídeos selecionados e chamar um script Python básico.
  - **AC:** Um botão "Iniciar Comparação" está presente. Ao ser clicado, os caminhos dos vídeos selecionados são passados para um script Python de backend. O script Python confirma o recebimento (ex: print no console).
- **HU1.4:** Como pesquisador, quero ver uma área na UI onde o resultado da comparação será exibido (inicialmente um valor placeholder).
  - **AC:** Existe uma seção na UI designada para "Resultado da Similaridade", que exibe um texto como "--%".

### Épico 2: Processamento de Vídeo e Extração de Pose com Normalização

**Objetivo:** Implementar a lógica em Python para carregar os vídeos selecionados, extrair frames, integrar o `MediaPipe` para detecção e extração de landmarks de pose, e aplicar os algoritmos de normalização de pose (tamanho e posição).

**Histórias de Usuário:**

- **HU2.1:** Como pesquisador, quero que o sistema, ao receber os caminhos dos vídeos, consiga processá-los para extrair todos os landmarks de pose (33 pontos, coordenadas `x`,`y`,`z` e visibilidade) de cada frame usando `MediaPipe`.
  - **AC:** Para cada vídeo, uma sequência de landmarks de pose por frame é gerada. Os dados são armazenados em uma estrutura de dados acessível (ex: lista de listas de landmarks). O processamento lida com o fim do vídeo.
- **HU2.2:** Como pesquisador, quero que os dados de pose extraídos para cada dançarino sejam normalizados em relação ao tamanho (escala).
  - **AC:** Uma função de normalização de tamanho é implementada (ex: usando distância ombro-quadril como referência). Todos os landmarks de uma pose são reescalonados consistentemente.
- **HU2.3:** Como pesquisador, quero que os dados de pose normalizados por tamanho também sejam normalizados em relação à posição (translação).
  - **AC:** Uma função de normalização de posição é implementada (ex: centralizando pelo ponto médio do quadril). Todas as poses são transladadas para uma origem comum.
- **HU2.4:** Como pesquisador, quero que o sistema registre (para fins de depuração/análise) os timestamps de cada frame processado pelo `MediaPipe`.
  - **AC:** Para cada conjunto de landmarks extraídos, o timestamp correspondente do vídeo é armazenado.

### Épico 3: Motor de Comparação de Movimento

**Objetivo:** Desenvolver o núcleo da lógica de comparação, incluindo a representação híbrida da pose, a implementação do DTW para sequências de pose, o cálculo do score de similaridade, a funcionalidade de ponderação de landmarks, a análise opcional de ritmo/velocidade e a parametrização da sensibilidade.

**Histórias de Usuário:**

- **HU3.1:** Como pesquisador, quero que cada pose normalizada seja convertida em uma representação vetorial híbrida, combinando coordenadas de landmarks priorizados (membros, tronco) e ângulos corporais chave.
  - **AC:** Uma função cria um vetor de características para cada pose, incluindo as coordenadas normalizadas (`x`,`y`) dos landmarks relevantes e os ângulos calculados (ex: cotovelos, joelhos).
- **HU3.2:** Como pesquisador, quero poder definir, através da UI, pesos diferentes para grupos de landmarks (ex: Tronco, Braço Esquerdo, Braço Direito, Perna Esquerda, Perna Direita) que serão usados no cálculo de similaridade de pose.
  - **AC:** A UI permite input para pesos (ex: de 0.0 a 1.0). Esses pesos são passados para a lógica de comparação. A representação da pose ou o cálculo de distância entre poses considera esses pesos.
- **HU3.3:** Como pesquisador, quero que o sistema compare as duas sequências de vetores de pose usando Dynamic Time Warping (DTW) para obter um score de distância/similaridade.
  - **AC:** O algoritmo DTW é implementado e calcula a distância entre as duas sequências de pose. A distância é convertida em um score de similaridade (ex: 0-100%).
- **HU3.4:** Como pesquisador, quero poder habilitar/desabilitar uma análise de ritmo/velocidade e, quando habilitada, quero que ela influencie o score final.
  - **AC:** A UI possui um controle para ligar/desligar a análise de ritmo. Se ligada, uma métrica de similaridade de ritmo/velocidade é calculada (ex: baseada na variação de posição de landmarks chave ao longo do tempo). O score de ritmo/velocidade é combinado com o score de similaridade de pose (DTW) usando um peso significativo.
- **HU3.5:** Como pesquisador, quero poder ajustar, através da UI, a sensibilidade da comparação de poses (margem de erro) para a abordagem híbrida.
  - **AC:** A UI permite input para definir limiares de distância e/ou ângulo para a correspondência de poses. Esses limiares são usados pela função de custo dentro do DTW ou na comparação de poses individuais.

### Épico 4: Integração Final, Testes e Geração de Resultados

**Objetivo:** Integrar completamente o motor de comparação com a interface do usuário, permitir que o usuário dispare a análise com os parâmetros definidos, exiba o score final na UI e salve os resultados detalhados em arquivos. Realizar testes de ponta a ponta com vídeos de exemplo (K-pop, Sapateado).

**Histórias de Usuário:**

- **HU4.1:** Como pesquisador, quero que os parâmetros de pesos de landmarks e sensibilidade definidos na UI sejam corretamente utilizados pelo motor de comparação Python.
  - **AC:** Os valores da UI são passados para o backend Python e aplicados na lógica de cálculo de similaridade.
- **HU4.2:** Como pesquisador, quero, após clicar em "Iniciar Comparação", ver o score final de similaridade exibido na UI.
  - **AC:** O score calculado pelo motor Python é retornado para a UI e exibido na área de resultados designada. O processamento acontece em background para não travar a UI (feedback de "processando..." é desejável).
- **HU4.3:** Como pesquisador, quero que os resultados da comparação (score final, parâmetros usados, talvez scores intermediários se aplicável) sejam salvos automaticamente em um arquivo (`JSON` ou `CSV`) em um diretório conhecido.
  - **AC:** Um arquivo de resultado é gerado no diretório `results-output/` após cada comparação bem-sucedida, contendo o score principal e os parâmetros de entrada que o geraram. O nome do arquivo pode ser baseado nos vídeos de entrada ou timestamp.
- **HU4.4:** Como pesquisador, quero testar o sistema completo com pelo menos dois pares de vídeos de K-pop e dois pares de vídeos de Sapateado para validar a funcionalidade e observar os scores.
  - **AC:** O sistema processa os vídeos de teste sem erros. Os scores gerados são plausíveis e refletem as diferenças/similaridades esperadas (qualitativamente). Os resultados são salvos corretamente.

## Documentos de Referência Chave

- Este PRD.
- (Futuro) Documentação técnica e de arquitetura derivada deste PRD.
- (Futuro) Relatório de TCC do usuário.

## Ideias Fora do Escopo (Pós-MVP)

- Sincronização automática de vídeo baseada em análise de áudio ou características visuais.
- Visualizações avançadas na UI mostrando as diferenças de pose frame a frame ou destacando seções de baixa similaridade.
- Suporte para comparação em tempo real (ex: com webcam).
- Análise e relatório detalhado de similaridade para sub-sequências específicas da dança.
- Implementação de um sistema de banco de dados formal para gerenciamento de resultados e vídeos.
- Processamento ou implantação baseada em nuvem.
- Interface de linha de comando (CLI) para processamento em lote.

## [OPCIONAL: Para Fluxo de Trabalho Simplificado de PM para Desenvolvimento Apenas] Decisões Técnicas Centrais e Estrutura da Aplicação

### Seleções da Pilha Tecnológica

- **Linguagem/Framework Principal de Backend:** Python (v3.8+). (Considerar `Flask`/`FastAPI` para comunicação com `Electron` se chamadas diretas de processo se mostrarem limitadas, mas iniciar com chamadas de processo).
- **Linguagem/Framework Principal de Frontend:** `Electron` com `Angular` (versões LTS recentes).
- **Banco de Dados:** Armazenamento de resultados e parâmetros de execução em arquivos (`JSON` para estrutura, `CSV` para dados tabulares). `SQLite` pode ser considerado para futuras necessidades de consulta simples.
- **Bibliotecas/Serviços Chave (Backend):** `MediaPipe`, `NumPy`, `OpenCV` (para manipulação de vídeo, se necessário além do que o `MediaPipe` oferece diretamente).
- **Bibliotecas/Serviços Chave (Frontend):** Framework `Angular`, bibliotecas padrão do `Electron` para IPC e interações com sistema de arquivos.
- **Plataforma/Ambiente de Implantação:** Desktop local (Windows, macOS, Linux).
- **Sistema de Controle de Versão:** Git em um Monorepo.

### Estrutura Proposta da Aplicação

```plaintext
{project-root}/
├── app-ui/               # Aplicação Frontend (Electron + Angular)
│   ├── src/              # Código fonte do Angular
│   ├── main.js           # Ponto de entrada principal do Electron
│   ├── preload.js        # Script de preload do Electron (para comunicação segura com o core)
│   └── package.json      # Dependências do Node/Electron/Angular
├── core-logic/           # Lógica principal em Python
│   ├── video_processing/   # Módulo para carregar vídeo, extrair frames
│   ├── pose_estimation/    # Módulo para integração com MediaPipe, normalização
│   ├── comparison/         # Módulo para representação de pose, DTW, métricas de similaridade, ritmo
│   ├── results_management/ # Módulo para salvar/carregar resultados (arquivos)
│   └── utils/              # Utilitários gerais para o core (ex: cálculos de ângulo)
├── results-output/       # Diretório padrão para salvar os arquivos de resultado gerados
├── scripts/              # Scripts auxiliares (ex: para testes, conversão de dados, etc.)
├── main_core.py          # Script Python principal que orquestra a lógica do core (pode ser chamado pelo Electron)
├── requirements.txt      # Dependências Python (mediapipe, numpy, opencv-python, etc.)
└── README.md             # Documentação principal do projeto
```

- **Monorepo/Polyrepo:** Monorepo.

- **Módulos/Componentes Chave e Responsabilidades:**
  - **`app-ui`:** Interface gráfica do usuário. Responsável por:
    - Permitir seleção de arquivos de vídeo.
    - Coletar parâmetros de análise do usuário (pesos, sensibilidade, toggle de ritmo).
    - Iniciar o processo de análise (comunicando-se com `core-logic`).
    - Exibir o score de similaridade final.
    - Indicar onde os arquivos de resultado foram salvos.
  - **`core-logic/video_processing`:** Responsável por carregar os arquivos de vídeo e extrair os frames sequencialmente para processamento.
  - **`core-logic/pose_estimation`:** Responsável por utilizar o `MediaPipe` em cada frame para detectar landmarks de pose, realizar a normalização de tamanho e posição.
  - **`core-logic/comparison`:** Componente central. Responsável por:
    - Converter poses normalizadas na representação híbrida (vetor de características).
    - Aplicar pesos de landmarks.
    - Implementar o cálculo de distância/similaridade entre poses individuais (abordagem híbrida).
    - Executar o DTW nas sequências de pose.
    - Calcular a similaridade de ritmo/velocidade (se habilitado).
    - Combinar scores para produzir o resultado final.
  - **`core-logic/results_management`:** Responsável por formatar e salvar os dados da comparação (score, parâmetros) em arquivos `JSON` ou `CSV` no diretório `results-output/`.
  - **`main_core.py`:** Ponto de entrada que recebe os parâmetros da `app-ui` (caminhos de vídeo, configurações de análise) e orquestra as chamadas para os outros módulos do `core-logic`.

### Visão Geral do Fluxo de Dados (Conceitual):

1.  Usuário interage com `app-ui` para selecionar vídeos e definir parâmetros.
2.  `app-ui` (`Electron` `main.js`) envia uma mensagem (IPC) ou executa `main_core.py` com os caminhos dos vídeos e os parâmetros de análise como argumentos.
3.  `main_core.py` chama:
    - `video_processing` para abrir os vídeos.
    - `pose_estimation` para cada frame para obter landmarks normalizados.
    - `comparison` para gerar as representações de pose, executar DTW e calcular o score final.
    - `results_management` salva os resultados em um arquivo.
4.  `main_core.py` retorna o score principal (e talvez o caminho do arquivo de resultado) para `app-ui`.
5.  `app-ui` exibe o score.
