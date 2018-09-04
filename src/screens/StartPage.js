import React, { Component } from "react";
import {
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import RNExitApp from "react-native-exit-app";
import { connect } from "react-redux";
import { START_GAME } from "../redux/actions";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      molePosition: new Animated.Value(0)
    };
  }

  componentDidMount() {
    //Animation config, playing loop for 100 times, and in sequence for going up and down
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.molePosition, {
          toValue: 1,
          duration: 2000,
          delay: 500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.molePosition, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        })
      ]),
      {
        iterations: 100
      }
    ).start();
  }

  //
  //<Animated.Image
  //source={require("../assets/holeMask.png")}
  //style={styles.holeMaskImage}
  ///>

  render() {
    return (
      <LinearGradient
        colors={["#53960f", "#7fe83a", "#aee83a", "#eded6d", "#f9e936"]}
        style={styles.pageContainer}
      >
        <Text style={styles.pageHeaderFont}>Whack the Mole</Text>
        <Animated.View style={styles.imageContainer}>
          <Animated.Image
            source={require("../assets/hole.png")}
            style={styles.holeImage}
          />
          <Animated.Image
            source={require("../assets/mole.png")}
            style={[
              styles.moleImage,
              {
                transform: [
                  {
                    translateY: this.state.molePosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 168]
                    })
                  }
                ]
              }
            ]}
          />
        </Animated.View>
        <TouchableOpacity
          style={styles.actionButtonContainer}
          activeOpacity={0.6}
          onPress={() => {
            this.props.navigation.navigate("GamePlayPage");
            this.props.dispatch(START_GAME());
          }}
        >
          <Image
            source={require("../assets/gameBtn.png")}
            style={styles.actionButtonImage}
          />
          <Text style={styles.actionButtonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButtonContainer}
          activeOpacity={0.7}
          onPress={() => {
            RNExitApp.exitApp();
          }}
        >
          <Image
            source={require("../assets/gameBtn.png")}
            style={styles.actionButtonImage}
          />
          <Text style={styles.actionButtonText}>Exit</Text>
        </TouchableOpacity>
        <View style={styles.highScoreContainer}>
          <Text style={styles.highScoreText}>
            {`High Score : ${this.props.highScore}`}
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

mapStateToProps = state => {
  return { highScore: state.highScore };
};

export default connect(mapStateToProps)(StartPage);

const styles = StyleSheet.create({
  pageContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  pageHeaderFont: {
    fontWeight: "700",
    fontSize: 30,
    color: "#000",
    alignSelf: "center",
    marginBottom: 15
  },
  imageContainer: {
    backgroundColor: "transparent",
    height: 160,
    width: 170,
    marginBottom: 15
  },
  holeImage: {
    position: "absolute",
    resizeMode: "center",
    height: 80,
    width: 170,
    left: 0,
    bottom: -25,
    zIndex: 10
  },
  holeMaskImage: {
    position: "absolute",
    resizeMode: "cover",
    height: 30,
    width: 150,
    bottom: 0,
    left: 5,
    zIndex: 100
  },
  moleImage: {
    position: "absolute",
    resizeMode: "cover",
    height: 250,
    width: 150,
    bottom: -100,
    left: 10,
    zIndex: 15
  },
  actionButtonContainer: {
    height: 64,
    width: 200,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: "center"
  },
  actionButtonImage: {
    resizeMode: "contain",
    position: "absolute",
    height: 64,
    width: 200,
    top: 0,
    left: 0
  },
  actionButtonText: {
    fontWeight: "700",
    fontSize: 22,
    color: "#000",
    paddingBottom: 10,
    alignSelf: "center"
  },
  highScoreContainer: {
    position: "absolute",
    bottom: 20,
    padding: 5,
    backgroundColor: "#47d147",
    borderRadius: 5
  },
  highScoreText: { fontSize: 14, fontWeight: "500", color: "#000" }
});
