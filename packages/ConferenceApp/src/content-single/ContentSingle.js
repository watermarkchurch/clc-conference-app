import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard, ThemeMixin } from '@apollosproject/ui-kit';

import TrackEventWhenLoaded from 'ConferenceApp/src/analytics/TrackEventWhenLoaded';
import { events } from 'ConferenceApp/src/analytics';

import getContentItem from './getContentItem';

import UniversalContentItem from './UniversalContentItem';

import NavigationHeader from './NavigationHeader';

import ActionContainer from './ActionContainer';

class ContentSingle extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  static navigationOptions = {
    header: NavigationHeader,
  };

  get itemId() {
    return this.props.navigation.getParam('itemId', []);
  }

  get queryVariables() {
    return { itemId: this.itemId };
  }

  renderContent = ({ content, loading, error }) => {
    let { __typename } = content;
    if (!__typename && this.itemId) {
      [__typename] = this.itemId.split(':');
    }
    switch (__typename) {
      case 'UniversalContentItem':
      default:
        return (
          <UniversalContentItem
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
          />
        );
    }
  };

  renderWithData = ({ loading, error, data }) => {
    if (error) return <ErrorCard error={error} />;

    const content = data.node || {};

    const { theme = {} } = content;

    return (
      <ThemeMixin
        mixin={{
          type: get(theme, 'type', 'light').toLowerCase(),
          colors: get(theme, 'colors'),
        }}
      >
        <TrackEventWhenLoaded
          loaded={!!(!loading && content.title)}
          eventName={events.ViewContent}
          properties={{
            title: content.title,
            itemId: this.itemId,
          }}
        />
        {this.renderContent({ content, loading, error })}
        <ActionContainer {...this.queryVariables} />
      </ThemeMixin>
    );
  };

  render() {
    return (
      <Query
        query={getContentItem}
        variables={this.queryVariables}
        fetchPolicy="cache-and-network"
      >
        {this.renderWithData}
      </Query>
    );
  }
}

export default ContentSingle;
