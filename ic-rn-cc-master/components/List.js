// @flow
import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Item from './Item';
import type { Pic } from 'ic-rn-cc/api/types';

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
  },
});

type Props = {
  data: Pic[],
  refreshing: boolean,
  onRefresh: () => void,
  onEndReached: () => void,
  onSelectItem: Pic => void,
};

export default class extends React.Component<Props> {
  keyExtractor = (item: Pic): string => item.data.id;

  renderItem = ({ item }: { item: Pic }) => (
    <Item item={item} onSelect={this.props.onSelectItem} />
  );

  render() {
    const { data, refreshing, onRefresh, onEndReached } = this.props;
    return (
      <FlatList
        data={data}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={styles.list}
      />
    );
  }
}
