# Validação das Expressões do Roboldo

Frontend do estudo presencial do Laboratório de Aprendizagem em Robótica (LAR/UERN). A aplicação permite ao pesquisador escolher um de dois cenários e conduz o participante pelo consentimento, dados demográficos, oito avaliações, pós-questionário e envio ao Google Sheets.

## Executar

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run build
npm run preview
```

## Organização

- `src/pages`: telas do fluxo.
- `src/components`: controles reutilizáveis e acessíveis.
- `src/hooks/useExperiment.ts`: estado, navegação e envio final.
- `src/config/expressions.ts`: ordem fixa e rótulos das expressões.
- `src/types/experiment.ts`: estrutura TypeScript dos dados.
- `src/utils/storage.ts`: persistência temporária no `localStorage`.
- `src/services/googleSheetsService.ts`: envio dos dados para o Apps Script.
- `google-apps-script/Code.gs`: endpoint do Apps Script sincronizado com as colunas da planilha.

## Integração com Google Sheets

O envio acontece uma única vez, no fim do estudo. `src/services/googleSheetsService.ts` envia o objeto `ExperimentData` para o aplicativo da web do Google Apps Script. A versão sincronizada do endpoint está em `google-apps-script/Code.gs`.

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` compila e publica a aplicação automaticamente a cada push na branch `main`. No GitHub, configure `Settings → Pages → Source` como `GitHub Actions`. O endereço esperado é `https://mklaras.github.io/validacao-roboldo/`.
