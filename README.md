# Validação das Expressões do Roboldo

Frontend do estudo presencial do Laboratório de Aprendizado em Robótica (LAR/UERN). A aplicação conduz o participante pelo consentimento, dados demográficos, oito avaliações em ordem fixa, pós-questionário e envio simulado.

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
- `src/services/googleSheetsService.ts`: mock que será substituído pela integração.

## Integração futura

O envio acontece uma única vez, no fim do estudo. Para integrar ao Google Sheets, publique um Google Apps Script como aplicativo da web e troque o mock em `src/services/googleSheetsService.ts` por uma chamada `fetch` com `POST`, serializando o objeto `ExperimentData` em JSON. O Apps Script deverá validar o corpo, gravar os dados nas colunas desejadas e retornar um resultado de sucesso.
