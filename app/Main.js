import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { primaryGradientArray } from './utils/Colors';
import Header from './components/Header';
import Input from './components/Input';

const title = 'Daily To Dos';

export default class Main extends Component {
  state = {
    inputValue: '',
  }

  onInputChange = value => {
    this.setState({
      inputValue: value,
    });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <LinearGradient colors={primaryGradientArray} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centered}>
          <Header {...{ title }} />
        </View>
        <View style={styles.inputContainer}>
          <Input onChangeText={this.onInputChange} {...{ inputValue }} />
        </View>
      </LinearGradient >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15,
  },
  textView: {
    padding: 5,
    fontWeight: 'bold',
    color: 'wheat',
    fontSize: 35,
    ...Platform.select({
      ios: { fontFamily: 'AvenirNext-Bold' },
      android: { fontFamily: 'Roboto' }
    })
  },
});

class Counter extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(state => ({ count: state.count + 1 }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <center>
        <h3>
          {this.state.count}
        </h3>
      </center>
    )
  }
}
