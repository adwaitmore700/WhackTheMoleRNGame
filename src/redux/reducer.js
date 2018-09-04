import * as GameActions from "./actionTypes";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const initialState = {
  hasGameStarted: false,
  isGameRunning: false,
  hasGameEnded: false,
  gameScore: 0,
  totalHits: 0,
  totalMissed: 0,
  highScore: 0
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GameActions.START_GAME:
      return {
        ...state,
        hasGameStarted: true,
        isGameRunning: true
      };
    case GameActions.END_GAME:
      return {
        ...state,
        isGameRunning: false,
        hasGameEnded: true
      };
    case GameActions.HOLE_HIT_SUCCESS:
      return {
        ...state,
        gameScore: (state.gameScore += 10),
        totalHits: (state.totalHits += 1)
      };
    case GameActions.HOLE_HIT_MISSED:
      return {
        ...state,
        gameScore: (state.gameScore -= 3),
        totalMissed: (state.totalMissed += 1)
      };
    case GameActions.RESET_GAME:
      return {
        hasGameStarted: false,
        isGameRunning: false,
        hasGameEnded: false,
        gameScore: 0,
        totalHits: 0,
        totalMissed: 0,
        highScore: state.highScore
      };
    case GameActions.UPDATE_HIGH_SCORE:
      return {
        ...state,
        highScore: action.highScore
      };
    default:
      return state;
  }
};

//Configuration for reducer persistence, only persisting the highScore value so WHITELISTED
const rootPersistConfig = {
  key: "root",
  whitelist: ["highScore"],
  storage: storage,
  stateReconciler: autoMergeLevel2
};

export default (pReducer = persistReducer(rootPersistConfig, gameReducer));
