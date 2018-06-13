// @flow
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import type { Pic } from 'ic-rn-cc/api/types';

const spacing = 10;

const imageSize = 75;

const smallFont = {
  color: 'darkgrey',
  fontSize: 12,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing,
  },
  thumbnail: {
    height: imageSize,
    width: imageSize,
    backgroundColor: 'lightgrey',
  },
  content: {
    flex: 1,
    marginLeft: spacing,
    justifyContent: 'space-between',
  },
  date: {
    alignSelf: 'flex-end',
    ...smallFont,
  },
  title: {
    marginVertical: 5,
    color: 'grey',
    fontSize: 15,
  },
  misc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    flex: 1,
    ...smallFont,
  },
  stats: {
    ...smallFont,
  },
});

const formatDate = (utc: number): string =>
  new Date(utc * 1000).toLocaleString();

const formatStats = ({
  score,
  num_comments,
}: {
  score: number,
  num_comments: number,
}): string =>
  `${score} ${score == 1 ? 'pt' : 'pts'} · ${num_comments} ${
    num_comments == 1 ? 'com' : 'coms'
  }`;

type Props = {
  item: Pic,
  onSelect: Pic => void,
};

export default class extends React.PureComponent<Props> {
  onPress = () => this.props.onSelect(this.props.item);

  render() {
    const { item } = this.props;
    const {
      data: { thumbnail, created_utc, title, author, score, num_comments },
    } = item;
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: thumbnail,
          }}
        />
        <View style={styles.content}>
          <Text style={styles.date}>{formatDate(created_utc)}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.misc}>
            <Text style={styles.author} numberOfLines={1}>
              {author}
            </Text>
            <Text style={styles.stats}>
              {formatStats({ score, num_comments })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
