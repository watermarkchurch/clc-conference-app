import React, { Component } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { PaddedView, H4 } from '@apollosproject/ui-kit';
import ScheduleItem from '../../ui/ScheduleItem';

import getChildContent from './getChildContent';

class HorizontalContentFeed extends Component {
  static propTypes = {
    contentId: PropTypes.string,
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  handleOnPressItem = (item) => {
    this.props.navigation.push('ContentSingle', {
      itemId: item.id,
    });
  };

  renderItem = (item) => (
    <ScheduleItem
      {...item}
      startTime={null}
      endTime={null}
      key={item.id}
      onPress={() => this.handleOnPressItem(item)}
    />
  );

  renderFeed = ({ data, loading, error }) => {
    if (error) return null;

    const childContent = get(
      data,
      'node.childContentItemsConnection.edges',
      []
    ).map((edge) => edge.node);

    const content = childContent;

    return (content && content.length) || loading ? (
      <React.Fragment>
        <PaddedView
          vertical={false}
          isLoading={(!content || !content.length) && loading}
        >
          <H4 padded>Sessions</H4>
        </PaddedView>
        {content.map(this.renderItem)}
      </React.Fragment>
    ) : null;
  };

  render() {
    if (!this.props.contentId) return this.renderFeed({ loading: true });

    return (
      <Query
        query={getChildContent}
        fetchPolicy="cache-and-network"
        variables={{ itemId: this.props.contentId }}
      >
        {this.renderFeed}
      </Query>
    );
  }
}

export default withNavigation(HorizontalContentFeed);
