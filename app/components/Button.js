import React from 'react'
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { lighterWhite } from '../utils/Colors';

const Button = ({ deleteAll }) => (
  <TouchableOpacity onPress={deleteAll}>
    <MaterialCommunityIcons name="delete-empty" size={24} color={lighterWhite} />
  </TouchableOpacity>
)

export default Button;
