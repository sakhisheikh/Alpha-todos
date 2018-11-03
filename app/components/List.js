import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  itemListText,
  itemListTextStrike,
  circleInactive,
  circleActive,
  deleteIconColor
} from '../utils/Colors';

const { height, width } = Dimensions.get('window');

const List = ({ id, text, deleteTodo, isCompleted, toggleTodo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity onPress={toggleTodo(id)}>
          <View style={[styles.circle, {
            borderColor: isCompleted ?
              circleInactive : circleActive
          }]}></View>
        </TouchableOpacity>
        <Text style={[styles.text, isCompleted ? {
          color: itemListTextStrike,
          textDecorationLine: 'line-through'
        } : { color: itemListText }]}>
          {text}
        </Text>
      </View>
      {isCompleted && (
        <View style={styles.button}>
          <TouchableOpacity onPress={deleteTodo(id)}>
            <MaterialIcons
              name="delete-forever"
              size={24}
              color={deleteIconColor}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    height: width / 8,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  column: {
    alignItems: "center",
    flexDirection: "row",
    width: width / 1.5,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    margin: 10
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 5
  },
  button: {
    marginRight: 10,
  },
});

export default List;
