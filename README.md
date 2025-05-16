# Sistema de Análise Comparativa de Movimentos de Dança

Este projeto é um sistema de software desenvolvido como Trabalho de Conclusão de Curso (TCC) em Sistemas de Informação, capaz de receber dois arquivos de vídeo e realizar uma análise comparativa para determinar se os sujeitos nos vídeos executaram os mesmos movimentos de dança.

## Requisitos do Sistema

- Python 3.8 ou superior
- Node.js 18 LTS ou superior
- npm 9 ou superior
- Git

## Estrutura do Projeto

```
/
├── app-ui/           # Aplicação Frontend (Electron + Angular)
├── core-logic/       # Lógica principal em Python
├── results-output/   # Diretório para resultados
├── scripts/          # Scripts auxiliares
└── docs/            # Documentação do projeto
```

## Instalação

1. Clone o repositório:

```bash
git clone [https://github.com/NicolasSampaio/Sistema-de-Analise-Comparativa-de-Movimentos-de-Danca]
cd dance-comparison-app
```

2. Instale as dependências Python:

```bash
pip install -r requirements.txt
```

3. Instale as dependências Node.js:

```bash
cd app-ui
npm install
```

## Desenvolvimento

### Backend (Python)

Para executar os testes do backend:

```bash
pytest
```

### Frontend (Angular + Electron)

Para iniciar o ambiente de desenvolvimento:

```bash
cd app-ui
npm start        # Inicia o servidor Angular
npm run electron:start  # Inicia o Electron
```

Para build do projeto:

```bash
cd app-ui
npm run build
npm run electron:build
```

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento Angular
- `npm run electron:start`: Inicia a aplicação Electron
- `npm run build`: Compila o projeto Angular
- `npm run electron:build`: Cria o executável da aplicação
- `npm test`: Executa os testes do frontend
- `pytest`: Executa os testes do backend

## Documentação

A documentação completa do projeto está disponível no diretório `docs/`:

- `docs/product-requirements.md`: Requisitos do produto
- `docs/tasks/`: Histórias de usuário e tarefas
- `docs/checklists/`: Checklists de desenvolvimento
- `docs/templates/`: Templates de documentação

## Contribuição

1. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
2. Faça commit das suas alterações (`git commit -m 'feat: adiciona nova feature'`)
3. Faça push para a branch (`git push origin feature/nova-feature`)
4. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
