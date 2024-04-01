import { Button, Divider, Text } from '@ui-kitten/components';
import { usePersistFn } from 'ahooks';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { color, tw } from 'react-native-tailwindcss';

import dateService from './dateService';

const BaseCalendar = (props) => {
  const { component: Calendar, min, max, showToday, dateService } = props;

  const calendarRef = React.useRef(null);

  const minDate = React.useMemo(() => moment(min), [min]);
  const maxDate = React.useMemo(() => moment(max), [max]);

  const onTodayPress = usePersistFn(() => {
    calendarRef.current?.scrollToToday();
    props.onTodayPress?.();
  });

  const renderDay = usePersistFn((info, style) => (
    <View style={[tw.flex1, tw.itemsCenter, tw.justifyCenter, style.container]}>
      <Text
        style={[
          style.text,
          {
            color: dateService.getDayOfWeek(info.date)
              ? style.text.color
              : color.red500,
          },
        ]}
      >
        {dateService.getDate(info.date)}
      </Text>
    </View>
  ));

  const renderToday = usePersistFn(() => (
    <View style={tw.mB2}>
      <Divider />
      <Button
        size="small"
        style={[tw.mT4, tw.mR4, tw.selfEnd]}
        onPress={onTodayPress}
      >
        Hôm nay
      </Button>
    </View>
  ));

  return (
    <Calendar
      ref={calendarRef}
      {...props}
      min={minDate}
      max={maxDate}
      renderDay={renderDay}
      renderFooter={showToday && renderToday}
    />
  );
};

BaseCalendar.propTypes = {
  component: PropTypes.any,
  showToday: PropTypes.bool,
  onTodayPress: PropTypes.func,
};

BaseCalendar.defaultProps = {
  min: new Date(1900, 0),
  max: new Date(2100, 0),
  showToday: true,
  dateService: dateService,
};

export default BaseCalendar;
