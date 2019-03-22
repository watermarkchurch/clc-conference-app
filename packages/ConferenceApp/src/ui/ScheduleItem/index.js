import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View } from 'react-native';
import {
  Cell,
  Divider,
  styled,
  UIText,
  H5,
  H6,
  Touchable,
} from '@apollosproject/ui-kit';

import Icon from '../Icon';

import Liked from './Liked';

const LabelText = styled(({ theme, expired }) => ({
  ...(!expired ? { color: theme.colors.primary } : {}),
  fontSize: 10,
}))(H6);

const TimeContainer = styled(({ theme }) => ({
  width: 80,
  alignItems: 'flex-start',
  paddingLeft: theme.sizing.baseUnit / 2,
}))(View);

const EventInfo = styled(({ theme }) => ({
  paddingRight: theme.sizing.baseUnit / 2,
  flexGrow: 1,
  flexShrink: 1,
}))(View);

const ScheduleCell = styled(({ theme, expired }) => ({
  height: theme.sizing.baseUnit * 5,
  opacity: expired ? 0.6 : 1,
}))(Cell);

const ScheduleCellRowPositioner = styled({
  flexDirection: 'row',
})(View);

const Actions = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: 50,
})(View);

export const Caret = styled(({ theme }) => ({
  alignSelf: 'center',
  marginTop: 9,
  marginRight: -theme.sizing.baseUnit * 0.5,
  opacity: 0.5,
}))((props) => <Icon name="arrow-right" size={20} {...props} />);

const SecondaryText = styled({ opacity: 0.6 })(UIText);

const formatTime = (time) => moment(time).format('h:mma');

const ScheduleItem = ({
  id,
  startTime,
  endTime,
  title,
  summary,
  label,
  onPress,
  ...other
}) => {
  let cell = (
    <ScheduleCell expired={moment(endTime) < new Date()} {...other}>
      <ScheduleCellRowPositioner>
        {startTime ? (
          <TimeContainer>
            <UIText>{formatTime(startTime)}</UIText>
            <SecondaryText>{formatTime(endTime)}</SecondaryText>
          </TimeContainer>
        ) : null}
        <EventInfo>
          {label ? (
            <LabelText expired={moment(endTime) < new Date()}>
              {label}
            </LabelText>
          ) : null}
          <H5 numberOfLines={2}>{title}</H5>
          {summary && !label ? (
            <SecondaryText numberOfLines={title.length > 30 ? 1 : 2}>
              {summary}
            </SecondaryText>
          ) : null}
        </EventInfo>
        <Actions>
          <Liked id={id} />
          {onPress ? <Caret /> : null}
        </Actions>
      </ScheduleCellRowPositioner>
    </ScheduleCell>
  );
  if (onPress) cell = <Touchable onPress={onPress}>{cell}</Touchable>;
  return (
    <React.Fragment>
      {cell}
      <Divider />
    </React.Fragment>
  );
};

ScheduleItem.propTypes = {
  id: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  onPress: PropTypes.func,
  label: PropTypes.string,
};

export default ScheduleItem;
