/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.spinValue = new Animated.Value(0)
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.spin()
    this.animate()
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.bounce
      }
    ).start(() => this.animate())
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render() {

    const width = Dimensions.get("window").width
    const spin = this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '360deg', '0deg']
    })

    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, width, 0]
    })

    const color = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange:['blue','red','blue']
    })

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image
          style={{
            marginBottom: 16,
            width: 146,
            height: 130,
            transform: [{ rotate: spin }]
          }}
          source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
        />
        <Animated.Image
          style={{
            marginTop: movingMargin,
            width: 146,
            height: 130,
            transform: [{ rotate: spin }]
          }}
          source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
        />
        <Animated.View
          style={{
            width:100,
            height:100,
            backgroundColor:color
          }}
        />
      </View>
    )
  }
}
