/** @format */
import React, { Component } from "react";
import { AppRegistry, StatusBar, BackHandler, Platform } from "react-native";
import GameNavigator from "./src/Main";
import { Provider } from "react-redux";
import { persistor, pStore } from "./src/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { name as appName } from "./app.json";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (Platform.OS == "android") {
      BackHandler.addEventListener("hardwareBackPress", () => {
        return true;
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS == "android") {
      BackHandler.removeEventListener("hardwareBackPress", () => {
        return true;
      });
    }
  }

  render() {
    return (
      <Provider store={pStore}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar //doubt for ios
            hidden={true}
            backgroundColor={"#4d9900"}
            barStyle="light-content"
          />
          <GameNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
