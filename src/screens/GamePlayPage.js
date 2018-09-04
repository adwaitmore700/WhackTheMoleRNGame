import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import {
  START_GAME,
  END_GAME,
  RESET_GAME,
  UPDATE_HIGH_SCORE
} from "../redux/actions";
import MoleComponent from "../components/MoleComponent";
import ScoreAlertComponent from "../components/ScoreAlertComponent";
import * as METRICS from "../utils/Metrics";

class GamePlayPage extends Component {
  constructor(props) {
    super(props);
    //setting the initial state with one random mole to show and
    //a timer for 2minutes with start speed in 1500ms
    this.state = {
      startTimer: moment()
        .minutes(2)
        .seconds(0),
      currentMoleIndex: [
        Math.round(Math.random() * METRICS.NO_OF_MOLES_TO_DISPLAY + 1)
      ],
      gameSpeedInMs: 1200
    };
  }

  componentDidMount() {
    this.startGame();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameEnded != this.props.gameEnded && nextProps.gameEnded) {
      clearInterval(this.animateMoles);
      if (nextProps.gameScore > nextProps.highScore) {
        this.props.dispatch(UPDATE_HIGH_SCORE(nextProps.gameScore));
      }
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <ScoreAlertComponent
          goToStartPage={this.goToStartPage}
          restartGame={this.restartGamePressed}
        />
        <View style={{ height: 180 }}>
          <Image
            source={require("../assets/game-screen-top.png")}
            style={styles.topHeaderImage}
          />
          <View style={[styles.topHeaderButtonContainer, { left: 20 }]}>
            <Image
              source={require("../assets/gameBtn.png")}
              style={styles.topHeaderButtonImage}
            />
            <Text style={styles.topHeaderButtonText}>
              {this.props.gameScore}
            </Text>
          </View>
          <View style={[styles.topHeaderButtonContainer, { right: 20 }]}>
            <Image
              source={require("../assets/gameBtn.png")}
              style={styles.topHeaderButtonImage}
            />
            <Text style={styles.topHeaderButtonText}>
              {this.state.startTimer.format("mm:ss")}
            </Text>
          </View>
        </View>
        <View style={styles.gamePlayContainer}>
          {this.renderMoleComponent()}
        </View>
      </View>
    );
  }

  renderMoleComponent() {
    let moles = [];
    let rowCount = 0;
    let moleIndex = 1;
    //rendering the moles and calculating the left and top positions
    do {
      if (rowCount % 2 == 0) {
        //for Oddth row, display two moles
        for (let i = 1; i < 3; i++) {
          let left =
            i == 1
              ? METRICS.ODD_ROW_ODD_MOLE_LEFT_POSITION
              : METRICS.ODD_ROW_EVEN_MOLE_LEFT_POSITION;
          let top =
            rowCount == 0
              ? METRICS.DEFAULT_MOLE_TOP_POSITION
              : rowCount * METRICS.DEFAULT_ROW_HEIGHT;
          moles.push(
            <MoleComponent
              key={`M${i}${rowCount}`}
              moleIndex={moleIndex}
              currentMoleIndex={this.state.currentMoleIndex}
              gameSpeed={this.state.gameSpeedInMs}
              left={left}
              top={top}
            />
          );
          moleIndex++;
        }
      } else {
        //for Eventh row, display only one moles
        moles.push(
          <MoleComponent
            key={`M${"blank"}${rowCount}`}
            moleIndex={moleIndex}
            currentMoleIndex={this.state.currentMoleIndex}
            gameSpeed={this.state.gameSpeedInMs}
            left={METRICS.EVEN_ROW_MOLE_LEFT_POSITION}
            top={rowCount * METRICS.DEFAULT_ROW_HEIGHT}
          />
        );
        moleIndex++;
      }
      rowCount++;
    } while (rowCount !== METRICS.NO_OF_ROWS); //no of rows calculated based on screen height
    return moles;
  }

  goToStartPage = () => {
    this.props.dispatch(RESET_GAME());
    this.props.navigation.navigate("StartPage");
  };

  restartGamePressed = () => {
    this.setState(
      {
        gameSpeedInMs: 1200,
        startTimer: moment()
          .minutes(2)
          .seconds(0)
      },
      () => {
        this.props.dispatch(RESET_GAME());
        this.props.dispatch(START_GAME());
        this.startGame();
      }
    );
  };

  startGame = () => {
    this.timerId = setInterval(this.updateTimer, 1000);
    this.animateMoles = setInterval(() => {
      this.setState({ currentMoleIndex: this.generateRandomHolesToDisplay() });
    }, 1800); //this will animate the moles every 1.8 seconds
  };

  updateTimer = () => {
    this.state.startTimer.subtract(1, "seconds");
    let newSpeed = this.state.gameSpeedInMs;
    if (this.state.startTimer.format("mm:ss") == "00:00") {
      clearInterval(this.timerId);
      this.props.dispatch(END_GAME());
      return;
    }
    if (this.state.startTimer.get("seconds") % 20 == 0) {
      newSpeed = this.state.gameSpeedInMs - 160;
    }
    this.setState({
      startTimer: this.state.startTimer,
      gameSpeedInMs: newSpeed
    });
  };

  generateRandomHolesToDisplay = () => {
    let holes = [];
    let noOfHoles = Math.round(Math.random() + 1); //result would be either 1 or 2
    for (let i = 0; i < noOfHoles; i++) {
      holes[i] = Math.floor(Math.random() * METRICS.NO_OF_MOLES_TO_DISPLAY + 1);
    }
    return holes;
  };
}

mapStateToProps = state => {
  return {
    gameScore: state.gameScore,
    gameEnded: state.hasGameEnded,
    highScore: state.highScore
  };
};

export default connect(mapStateToProps)(GamePlayPage);

const styles = StyleSheet.create({
  pageContainer: { flex: 1, backgroundColor: "#C9BF9C" },
  topHeaderImage: {
    position: "absolute",
    resizeMode: "cover",
    height: 180,
    width: METRICS.APP_WIDTH,
    top: 0
  },
  topHeaderButtonContainer: {
    position: "absolute",
    top: 20,
    height: 40,
    width: 110,
    borderRadius: 20,
    justifyContent: "center"
  },
  topHeaderButtonImage: {
    resizeMode: "stretch",
    position: "absolute",
    height: 40,
    width: 110,
    top: 0,
    left: 0
  },
  topHeaderButtonText: {
    fontWeight: "700",
    fontSize: 22,
    color: "#000",
    paddingBottom: 5,
    alignSelf: "center"
  },
  gamePlayContainer: {
    flex: 1,
    position: "absolute",
    height: METRICS.GAME_PLAY_BOARD_HEIGHT + 15,
    width: METRICS.APP_WIDTH,
    zIndex: 100,
    top: 165
  }
});
