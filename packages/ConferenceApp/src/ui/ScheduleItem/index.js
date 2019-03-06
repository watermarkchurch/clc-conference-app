import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Cell,
  CellContent,
  Divider,
  styled,
  UIText,
  Touchable,
} from '@apollosproject/ui-kit';

import Icon from '../Icon';

import Liked from './Liked';

const TimeContainer = styled({
  width: 75,
  alignItems: 'flex-start',
  paddingRight: 0,
})(CellContent);

const EventInfo = styled({
  width: '100%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})(CellContent);

const ScheduleCell = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 5,
}))(Cell);

const ScheduleCellRowPositioner = styled({
  alignItems: 'flex-start',
})(Cell);

const Caret = styled(({ theme }) => ({
  alignSelf: 'center',
  marginTop: 12,
  marginRight: -theme.sizing.baseUnit,
  opacity: 0.5,
}))((props) => <Icon name="arrow-right" {...props} />);

const SecondaryText = styled({ opacity: 0.5 })(UIText);

const formatTime = (time) => moment(time).format('h:mma');

const ScheduleItem = ({ id, startTime, endTime, title, summary, onPress }) => {
  let cell = (
    <ScheduleCell>
      <ScheduleCellRowPositioner>
        <TimeContainer>
          <UIText>{formatTime(startTime)}</UIText>
          <SecondaryText>{formatTime(endTime)}</SecondaryText>
        </TimeContainer>
        <EventInfo>
          <UIText>{title}</UIText>
          {summary ? <SecondaryText>{summary}</SecondaryText> : null}
        </EventInfo>
        <Liked id={id} />
        {onPress ? <Caret /> : null}
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
};

export default ScheduleItem;
