const PARTICIPANTS_SHEET = 'Participacoes';
const EXPRESSIONS_SHEET = 'Expressoes';

const PARTICIPANTS_HEADERS = [
  'participantId',
  'startedAt',
  'finishedAt',
  'gender',
  'age',
  'education',
  'previousSocialRobotInteraction',
  'technologyArea',
  'overallEase',
  'naturalness',
  'appearanceCompatibility',
  'comment',
  'godspeedAnthropomorphismFakeNatural',
  'godspeedAnthropomorphismMachinelikeHumanlike',
  'godspeedAnthropomorphismUnconsciousConscious',
  'godspeedAnthropomorphismArtificialLifelike',
  'godspeedAnthropomorphismRigidFluidMovement',
  'godspeedAnimacyDeadAlive',
  'godspeedAnimacyStagnantLively',
  'godspeedAnimacyMechanicalOrganic',
  'godspeedAnimacyArtificialLifelike',
  'godspeedAnimacyInertInteractive',
  'godspeedLikeabilityDislikeLike',
  'godspeedLikeabilityUnfriendlyFriendly',
  'godspeedLikeabilityUnkindKind',
  'godspeedLikeabilityUnpleasantPleasant',
  'godspeedLikeabilityAwfulNice',
  'scenario',
];

const EXPRESSIONS_HEADERS = createExpressionHeaders();

function createExpressionHeaders() {
  const headers = ['participantId', 'scenario'];
  for (let order = 1; order <= 8; order += 1) {
    headers.push(
      `expression${order}Order`,
      `expression${order}Displayed`,
      `expression${order}Selected`,
      `expression${order}IdentificationEase`,
      `expression${order}Timestamp`,
    );
  }
  return headers;
}

function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  prepareSheet(spreadsheet, PARTICIPANTS_SHEET, PARTICIPANTS_HEADERS);
  prepareSheet(spreadsheet, EXPRESSIONS_SHEET, EXPRESSIONS_HEADERS);
}

function prepareSheet(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);

  const missingColumns = headers.length - sheet.getMaxColumns();
  if (missingColumns > 0) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), missingColumns);
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function doGet() {
  return jsonResponse({ success: true, service: 'roboldo' });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000);
    const data = JSON.parse(event.postData.contents);
    validateExperiment(data);

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const participantsSheet = spreadsheet.getSheetByName(PARTICIPANTS_SHEET);
    const expressionsSheet = spreadsheet.getSheetByName(EXPRESSIONS_SHEET);

    if (!participantsSheet || !expressionsSheet) {
      throw new Error('Execute a função setup antes de receber dados.');
    }

    const participantRecorded = rowExists(participantsSheet, data.participantId);
    const expressionsRecorded = rowExists(expressionsSheet, data.participantId);

    if (participantRecorded && expressionsRecorded) {
      return jsonResponse({ success: true, duplicate: true });
    }

    const demographics = data.demographics;
    const post = data.postQuestionnaire;
    const godspeed = post.godspeed;

    const expressionRow = [safeText(data.participantId), safeText(data.scenario)];
    [...data.expressionTrials]
      .sort((first, second) => first.order - second.order)
      .forEach((trial) => {
        expressionRow.push(
          trial.order,
          safeText(trial.displayedExpression),
          safeText(trial.selectedExpression),
          trial.identificationEase,
          new Date(trial.timestamp),
        );
      });
    if (!expressionsRecorded) {
      expressionsSheet.appendRow(expressionRow);
    }

    const participantRow = [
      safeText(data.participantId),
      new Date(data.startedAt),
      new Date(data.finishedAt),
      safeText(demographics.gender),
      demographics.age,
      safeText(demographics.education),
      safeText(demographics.previousSocialRobotInteraction),
      demographics.technologyArea,
      post.overallEase,
      post.naturalness,
      post.appearanceCompatibility,
      safeText(post.comment || ''),
      godspeed.anthropomorphism.fakeNatural,
      godspeed.anthropomorphism.machinelikeHumanlike,
      godspeed.anthropomorphism.unconsciousConscious,
      godspeed.anthropomorphism.artificialLifelike,
      godspeed.anthropomorphism.rigidFluidMovement,
      godspeed.animacy.deadAlive,
      godspeed.animacy.stagnantLively,
      godspeed.animacy.mechanicalOrganic,
      godspeed.animacy.artificialLifelike,
      godspeed.animacy.inertInteractive,
      godspeed.likeability.dislikeLike,
      godspeed.likeability.unfriendlyFriendly,
      godspeed.likeability.unkindKind,
      godspeed.likeability.unpleasantPleasant,
      godspeed.likeability.awfulNice,
      safeText(data.scenario),
    ];

    if (!participantRecorded) {
      participantsSheet.appendRow(participantRow);
    }

    SpreadsheetApp.flush();
    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      success: false,
      error: String(error.message || error),
    });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function validateExperiment(data) {
  if (!data || !/^P-\d{6}$/.test(data.participantId || '')) {
    throw new Error('Identificador de participante inválido.');
  }
  if (data.scenario !== 'cenario1' && data.scenario !== 'cenario2') {
    throw new Error('Cenário inválido.');
  }
  if (!data.demographics) {
    throw new Error('Dados demográficos ausentes.');
  }
  if (!Array.isArray(data.expressionTrials) || data.expressionTrials.length !== 8) {
    throw new Error('A participação deve conter 8 expressões.');
  }
  if (!data.postQuestionnaire || !data.postQuestionnaire.godspeed || !data.finishedAt) {
    throw new Error('Pós-questionário incompleto.');
  }
}

function rowExists(sheet, participantId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  return sheet
    .getRange(2, 1, lastRow - 1, 1)
    .getDisplayValues()
    .some(([value]) => value === participantId);
}

function safeText(value) {
  const text = String(value ?? '');
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
