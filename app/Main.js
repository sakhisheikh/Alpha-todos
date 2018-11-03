import React, { Component } from 'react';
import {
  Platform,
  AsyncStorage, StyleSheet, View, StatusBar, ScrollView, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo';
import uuid from 'uuid/v1';
import { primaryGradientArray } from './utils/Colors';
import Header from './components/Header';
import Input from './components/Input';
import Subtitle from './components/Subtitle';
import Button from './components/Button';
import List from './components/List';

const title = 'Daily ToDos';

export default class Main extends Component {
  state = {
    inputValue: '',
    loadingItems: false,
    todos: {},
    isCompleted: false,
  }

  componentDidMount() {
    this.loadingItems();
  };

  loadingItems = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      this.setState({
        loadingItems: true,
        todos: JSON.parse(todos) || {}
      })
    } catch (error) {
      console.log(error);
    }
  }

  onInputChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  onDone = () => {
    const { inputValue } = this.state;
    if (inputValue) {
      this.setState(state => {
        const id = uuid();
        return {
          ...state,
          inputValue: '',
          todos: {
            ...state.todos, [id]: {
              id,
              isCompleted: false,
              text: inputValue,
              createdAt: Date.now(),
            }
          }
        }
      }, () => {
        const { todos } = this.state;
        this.saveItems(todos);
      });
    }
  };

  saveItems = todos => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }

  deleteTodo = id => () => {
    this.setState(state => {
      delete state.todos[id];
      return {
        ...state,
      }
    }, () => {
      const { todos } = this.state;
      this.saveItems(todos);
    });
  };

  toggleTodo = id => () => {
    this.setState(state => {
      return {
        ...state,
        todos: {
          ...state.todos, [id]: {
            ...state.todos[id],
            isCompleted: !state.todos[id].isCompleted,
          }
        }
      }
    }, () => {
      const { todos } = this.state;
      this.saveItems(todos);
    });
  };

  deleteAll = () => {
    this.setState({
      todos: {},
    }, () => {
      const { todos } = this.state;
      this.saveItems(todos);
    })
  }



  render() {
    const { inputValue, loadingItems, todos } = this.state;

    return (
      <LinearGradient colors={primaryGradientArray} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centered}>
          <Header {...{ title }} />
        </View>
        <View style={styles.inputContainer}>
          <Subtitle subtitle={"What's Next?"} />
          <Input onChangeText={this.onInputChange} onDone={this.onDone} {...{ inputValue }} />
        </View>
        <View style={styles.listContainer}>
          <View style={styles.column}>
            <Subtitle subtitle={"Recent Notes"} />
            <View style={styles.deleteAll}>
              <Button deleteAll={this.deleteAll} />
            </View>
          </View>
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollable}>
              {Object.values(todos).reverse().map(todo => (
                <List
                  key={todo.id}
                  {...todo}
                  deleteTodo={this.deleteTodo}
                  toggleTodo={this.toggleTodo}
                />
              ))}
            </ScrollView>
          ) : (
              <ActivityIndicator size="large" color="white" />
            )}
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
    paddingLeft: 15,
    marginTop: 40,
  },
  listContainer: {
    flex: 1,
    marginTop: 70,
    paddingLeft: 15,
    marginBottom: 10
  },
  deleteAll: {
    marginRight: 40,
  },
  column: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollable: {
    marginTop: 15,
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

