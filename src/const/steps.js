export const NO_STEP = 0;
export const SHOW_QUESTION_STEP = 1;
export const START_CLOCK_STEP = 2;
export const STOP_CLOCK_STEP = 3;
export const SHOW_ANSWERS_STEP = 4;
export const SCORE_STEP = 10;
export const PENALTY_STEP = 20;
export const APPLY_PENALTY_STEP = 21;
export const RESULT_STEP = 30;
export const WINNER_STEP = 40;

export const STEP_LABELS = {
  [NO_STEP]: "Vis",
  [SHOW_QUESTION_STEP]: "Vis",
  [START_CLOCK_STEP]: "Start Nedtelling",
  [STOP_CLOCK_STEP]: "Nedtelling ferdig",
  [SHOW_ANSWERS_STEP]: "Vis riktig svar",
  [SCORE_STEP]: "Vis Resultat",
  [PENALTY_STEP]: "Vis Straff",
  [APPLY_PENALTY_STEP]: "Set Straff",
  [RESULT_STEP]: "Vis total resutlat",
  [WINNER_STEP]: "Vis Winner",
};

export const PRE_GAME_STEPS = [
  SHOW_QUESTION_STEP,
  START_CLOCK_STEP,
  STOP_CLOCK_STEP,
  SHOW_ANSWERS_STEP,
  SCORE_STEP,
];

export const GAME_STEPS = [
  SHOW_QUESTION_STEP,
  START_CLOCK_STEP,
  STOP_CLOCK_STEP,
  SHOW_ANSWERS_STEP,
  SCORE_STEP,
  PENALTY_STEP,
  APPLY_PENALTY_STEP,
  RESULT_STEP,
];

export const CHALLANGE_STEPS = [NO_STEP, RESULT_STEP];
export const SCORE_STEPS = [NO_STEP, RESULT_STEP];
