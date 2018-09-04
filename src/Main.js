import { createSwitchNavigator } from "react-navigation";
import StartPage from "./screens/StartPage";
import GamePlayPage from "./screens/GamePlayPage";

const GameNavigator = createSwitchNavigator(
  {
    StartPage: StartPage,
    GamePlayPage: GamePlayPage
  },
  {
    initialRouteName: "StartPage"
  }
);

export default GameNavigator;
