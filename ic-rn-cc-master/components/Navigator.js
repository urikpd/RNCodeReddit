// @flow
import * as React from 'react';
import { StyleSheet, View, Platform, WebView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import ListContainer from './ListContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});

const postURL = ({ data: { permalink } }) =>
  `https://www.reddit.com${permalink}`;

const Navigator = StackNavigator({
  List: {
    screen: ({ navigation }) => (
      <ListContainer
        onSelectItem={item => navigation.navigate('Post', { item })}
      />
    ),
    navigationOptions: {
      headerTitle: 'Pics',
    },
  },
  Post: {
    screen: ({ navigation }) => (
      <WebView source={{ uri: postURL(navigation.state.params.item) }} />
    ),
    navigationOptions: {
      headerTitle: 'Pic',
    },
  },
});

export default () => (
  <View style={styles.container}>
    <Navigator />
  </View>
);
