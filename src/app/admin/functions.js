import { PRE_GAME_STEPS, GAME_STEPS, STEP_LABELS } from "@/const/steps.js";

const stepsForQuestion = (question) =>
  question.type === "pre" ? PRE_GAME_STEPS : GAME_STEPS;

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
