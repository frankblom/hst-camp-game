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
  [SHOW_QUESTION_STEP]: "Show",
  [START_CLOCK_STEP]: "Start clock",
  [STOP_CLOCK_STEP]: "Stop clock",
  [SHOW_ANSWERS_STEP]: "Show answers",
  [SCORE_STEP]: "Show Score",
  [PENALTY_STEP]: "Show Straff",
  [APPLY_PENALTY_STEP]: "Apply Straff",
  [RESULT_STEP]: "Show Results",
  [WINNER_STEP]: "Show Winner",
};

export const PRE_GAME_STEPS = [
  SHOW_QUESTION_STEP,
  START_CLOCK_STEP,
  STOP_CLOCK_STEP,
  SHOW_ANSWERS_STEP,
  SCORE_STEP,
  RESULT_STEP,
  WINNER_STEP,
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
