import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const Subtitle = ({ subtitle }) => (
  <Text style={styles.subtitleText}>{subtitle.toUpperCase()}</Text>
);

const styles = StyleSheet.create({
  subtitleText: {
    color: '#f4e5e3',
    fontSize: 16,
    fontWeight: '500'
  }
});

export default Subtitle;
