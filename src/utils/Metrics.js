import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const APP_WIDTH = width;
export const APP_HEIGHT = height;
export const GAME_PLAY_BOARD_HEIGHT = height - 180;
export const NO_OF_ROWS = Math.floor(GAME_PLAY_BOARD_HEIGHT / 70); // 80 is the reduced height of the row to achieve layout
export const NO_OF_MOLES_TO_DISPLAY = Math.ceil(
  2 * (NO_OF_ROWS / 2) + NO_OF_ROWS / 2
);
export const ODD_ROW_EVEN_MOLE_LEFT_POSITION = width - 140;
export const ODD_ROW_ODD_MOLE_LEFT_POSITION = 20;
export const EVEN_ROW_MOLE_LEFT_POSITION = width / 2 - 60;
export const DEFAULT_MOLE_TOP_POSITION = 0;
export const DEFAULT_ROW_HEIGHT = 70;
