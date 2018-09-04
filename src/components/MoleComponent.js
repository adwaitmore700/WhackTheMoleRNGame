import React, { Component } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  Easing
} from "react-native";
import { connect } from "react-redux";
import { HOLE_HIT_SUCCESSFULLY, HOLE_HIT_MISSED } from "../redux/actions";
import * as Metrics from "../utils/Metrics";
import lodash from "lodash";

class MoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      molePosition: new Animated.Value(1),
      yPosition: new Animated.Value(0),
      opacity: new Animated.Value(0),
      bubbleText: ""
    };
    this.isAnimating = false;
  }

  componentDidMount() {
    this.animateMole(
      this.props.currentMoleIndex,
      this.props.moleIndex,
      this.props.gameSpeed
    );
  }

  componentWillReceiveProps(nextProps) {
    this.animateMole(
      nextProps.currentMoleIndex,
      nextProps.moleIndex,
      nextProps.gameSpeed
    );
    if (nextProps.gameEnded != this.props.gameEnded && nextProps.gameEnded) {
      this.state.molePosition.setValue(1);
      this.state.molePosition.stopAnimation();
    }
  }

  animateMole = (currentMoleIndex, moleIndex, gameSpeed) => {
    if (!this.isAnimating && lodash.includes(currentMoleIndex, moleIndex)) {
      //begin animating the mole when randomly selected
      this.isAnimating = true;
      Animated.sequence([
        Animated.timing(this.state.molePosition, {
          toValue: 0,
          duration: gameSpeed,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(this.state.molePosition, {
          toValue: 1,
          duration: gameSpeed,
          delay: 100,
          useNativeDriver: true
        })
      ]).start(finished => {
        this.isAnimating = false;
        if (finished.finished && !this.props.hasGameEnded) {
          this.setState({ bubbleText: "- 3" }, () => {
            this.animateBubble();
          });
          this.props.dispatch(HOLE_HIT_MISSED());
        }
      });
    }
  };

  animateBubble = () => {
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 0.85,
        duration: 0,
        useNativeDriver: true
      }),
      Animated.parallel([
        Animated.timing(this.state.yPosition, {
          toValue: -100,
          duration: 1500,
          easing: Easing.in,
          useNativeDriver: true
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      this.state.yPosition.setValue(0);
    });
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            left: this.props.left,
            top: this.props.top
          }
        ]}
      >
        <Animated.Image
          source={require("../assets/hole.png")}
          style={styles.holeImage}
        />
        <Animated.Image
          source={require("../assets/holeMask.png")}
          style={styles.holeMaskImage}
        />
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 10,
              left: 45,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 110,
              opacity: this.state.opacity,
              transform: [
                {
                  translateY: this.state.yPosition
                }
              ]
            }
          ]}
        >
          <Text
            style={{
              alignSelf: "center",
              color: this.state.bubbleText === "- 3" ? "red" : "green",
              fontSize: 20,
              fontWeight: "600"
            }}
          >
            {this.state.bubbleText}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.moleImageContainer,
            {
              transform: [
                {
                  translateY: this.state.molePosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 120]
                  })
                }
              ]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.moleImageButton}
            activeOpacity={0.8}
            onPress={e => {
              this.setState({ bubbleText: "+ 10" }, () => {
                this.animateBubble();
              });
              this.props.dispatch(HOLE_HIT_SUCCESSFULLY());
              this.state.molePosition.setValue(1);
            }}
          >
            <Animated.Image
              source={require("../assets/mole.png")}
              style={styles.moleImage}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

mapStateToProps = state => {
  return { gameEnded: state.hasGameEnded };
};

export default connect(mapStateToProps)(MoleComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    position: "absolute",
    height: 90,
    width: 120
  },
  holeImage: {
    position: "absolute",
    resizeMode: "center",
    height: 50,
    width: 100,
    bottom: -8,
    left: 10,
    zIndex: 10
  },
  holeMaskImage: {
    position: "absolute",
    resizeMode: "cover",
    height: 20,
    width: 120,
    bottom: 0,
    left: 0,
    zIndex: 100
  },
  moleImageContainer: {
    position: "absolute",
    height: 150,
    width: 90,
    bottom: -60,
    left: 15,
    zIndex: 15
  },
  moleImage: {
    position: "absolute",
    resizeMode: "cover",
    height: 150,
    width: 90
  },
  moleImageButton: {
    height: 150,
    width: 90
  }
});
