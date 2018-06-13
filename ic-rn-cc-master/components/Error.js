// @flow
import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const spacing = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing,
  },
  text: {
    marginBottom: spacing,
    textAlign: 'center',
  },
});

type Props = {
  error: string,
  onRetry: () => void,
};

export default ({ error, onRetry }: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>Ups! {error}</Text>
    <Button title="Try again!" onPress={onRetry} />
  </View>
);
