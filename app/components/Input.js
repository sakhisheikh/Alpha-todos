import React from 'react'
import { StyleSheet, TextInput } from 'react-native';
import { inputPlaceholder } from '../utils/Colors';

const Input = ({ inputValue, onChangeText, onDone }) => (
  <TextInput
    value={inputValue}
    {...{ onChangeText }}
    onSubmitEditing={onDone}
    style={styles.input}
    placeholderTextColor={inputPlaceholder}
    placeholder="Type here your to do"
    multiline={true}
    autoCapitalize="sentences"
    autoCorrect={false}
    blurOnSubmit={true}
    underlineColorAndroid="transparent"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
  />
);

const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: 'white',
    fontWeight: '500',
  },
})

export default Input
