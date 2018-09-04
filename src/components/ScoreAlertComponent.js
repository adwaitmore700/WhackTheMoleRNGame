import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  Text,
  Image
} from "react-native";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");

class ScoreAlertComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameEnded != this.props.gameEnded && nextProps.gameEnded) {
      this.setState({ showAlert: true });
    }
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={"fade"}
        visible={this.state.showAlert}
        onRequestClose={() => {}}
        key={this.props.id}
      >
        <View style={styles.summaryAlertContainer}>
          <View style={styles.summaryAlertBox}>
            <Image
              style={styles.imageIcon}
              source={require("../assets/summary-mole.png")}
            />
            <Text style={styles.largeFont}>{`You scored`}</Text>
            <Text style={styles.xLargeFont}>{`${this.props.gameScore}`}</Text>
            <View style={styles.alignHorizontal}>
              <Text style={styles.mediumFont}>
                {`Total Hits : ${this.props.totalHits}`}
              </Text>
              <Text style={styles.mediumFont}>
                {`Total Missed : ${this.props.totalMissed}`}
              </Text>
            </View>
            <View style={styles.alignHorizontal}>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={this.goToStartPage}
              >
                <Image
                  source={require("../assets/gameBtn.png")}
                  style={styles.actionButtonImage}
                />
                <Text style={styles.actionButtonText}>{"Start Page"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={this.restartGame}
              >
                <Image
                  source={require("../assets/gameBtn.png")}
                  style={styles.actionButtonImage}
                />
                <Text style={styles.actionButtonText}>{"Restart Game"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  goToStartPage = () => {
    this.setState({ showAlert: false }, () => {
      this.props.goToStartPage();
    });
  };

  restartGame = () => {
    this.setState({ showAlert: false }, () => {
      this.props.restartGame();
    });
  };
}

const styles = StyleSheet.create({
  summaryAlertContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  summaryAlertBox: {
    minWidth: width * 0.5,
    maxWidth: width * 0.8,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ffcc00",
    borderTopWidth: 2,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5
  },
  imageIcon: {
    resizeMode: "center",
    width: 80,
    height: 80,
    alignSelf: "center"
  },
  actionButton: {
    margin: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: width * 0.3,
    borderRadius: 20
  },
  actionButtonImage: {
    resizeMode: "stretch",
    position: "absolute",
    height: 40,
    width: width * 0.3,
    top: 0,
    left: 0
  },
  actionButtonText: {
    position: "absolute",
    fontWeight: "500",
    fontSize: 12,
    color: "#000",
    top: 9,
    alignSelf: "center"
  },
  alignHorizontal: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  largeFont: {
    fontSize: 20,
    paddingTop: 10,
    paddingHorizontal: 15,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000"
  },
  mediumFont: {
    fontSize: 16,
    paddingTop: 10,
    paddingHorizontal: 15,
    fontWeight: "300",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000"
  },
  xLargeFont: {
    fontSize: 36,
    paddingHorizontal: 15,
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000"
  }
});

mapStateToProps = state => {
  return {
    gameScore: state.gameScore,
    totalHits: state.totalHits,
    totalMissed: state.totalMissed,
    gameEnded: state.hasGameEnded
  };
};

export default connect(mapStateToProps)(ScoreAlertComponent);
