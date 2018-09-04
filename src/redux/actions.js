import * as GAME_ACTIONS from "./actionTypes";

export const START_GAME = () => {
  return {
    type: GAME_ACTIONS.START_GAME
  };
};

export const END_GAME = () => {
  return {
    type: GAME_ACTIONS.END_GAME
  };
};

export const HOLE_HIT_SUCCESSFULLY = () => {
  return {
    type: GAME_ACTIONS.HOLE_HIT_SUCCESS
  };
};

export const HOLE_HIT_MISSED = () => {
  return {
    type: GAME_ACTIONS.HOLE_HIT_MISSED
  };
};

export const RESET_GAME = () => {
  return {
    type: GAME_ACTIONS.RESET_GAME
  };
};

export const UPDATE_HIGH_SCORE = highScore => {
  return {
    type: GAME_ACTIONS.UPDATE_HIGH_SCORE,
    highScore: highScore
  };
};
