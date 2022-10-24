import {
  PRE_GAME_STEPS,
  GAME_STEPS,
  STEP_LABELS,
  CHALLANGE_STEPS,
  SCORE_STEPS,
} from "@/const/steps.js";

const stepsForQuestion = (question) => {
  switch (question.type) {
    case "pre":
      return PRE_GAME_STEPS;
    case "game":
      return GAME_STEPS;
    case "score":
      return SCORE_STEPS;
    case "challange":
      return CHALLANGE_STEPS;
  }
};

export const getSteps = (question) =>
  stepsForQuestion(question).map((step) => ({
    step,
    name: STEP_LABELS[step],
    active: step === question.step,
    completed: step < question.step,
  }));

export const getNextStepForQuestion = (question) => {
  const steps = stepsForQuestion(question);
  const index = steps.indexOf(question.step);

  if (steps.length - 1 > index) {
    return steps[index + 1];
  }
  return false;
};

export const getPrevStepForQuestion = (question) => {
  const steps = stepsForQuestion(question);
  const index = steps.indexOf(question.step);

  if (index > 0) {
    return steps[index - 1];
  }
  return false;
};
