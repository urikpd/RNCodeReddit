// @flow
import * as React from 'react';
import List from './List';
import Error from './Error';
import { getPics } from 'ic-rn-cc/api';
import type { Pics, Pic } from 'ic-rn-cc/api/types';

type Props = {
  onSelectItem: Pic => void,
};

type State = {
  data: Pic[],
  after: ?string,
  loading: boolean,
  error: ?string,
};

export default class extends React.Component<Props, State> {
  state = {
    data: [],
    after: null,
    loading: false,
    error: null,
  };

  showNewPics = ({ children, after }: Pics) => {
    this.setState(({ data }) => ({
      data: data.concat(children),
      after,
      loading: false,
    }));
  };

  showError = ({ message }: { message: string }) => {
    this.setState({ loading: false, error: message });
  };

  loadPics = (reset: boolean) => {
    if (this.state.loading) {
      return;
    }
    const { data, after } = reset ? { data: [], after: null } : this.state;
    this.setState({ data, after, loading: true, error: null }, () => {
      getPics(after).then(this.showNewPics, this.showError);
    });
  };

  refreshPics = () => this.loadPics(true);

  loadMorePics = () => this.loadPics(false);

  componentDidMount() {
    this.refreshPics();
  }

  render() {
    const { data, loading, error } = this.state;
    if (error != null) {
      return <Error error={error} onRetry={this.refreshPics} />;
    }
    const { onSelectItem } = this.props;
    return (
      <List
        data={data}
        refreshing={loading && data.length == 0}
        onRefresh={this.refreshPics}
        onEndReached={this.loadMorePics}
        onSelectItem={onSelectItem}
      />
    );
  }
}
