import { Divider, Icon, ListItem, Text } from '@ui-kitten/components';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import makeStyles from '@helpers/makeStyles';

const useStyles = makeStyles({
  icon: {
    width: 22,
    height: 22,
    tintColor: 'text-basic-color',
  },
});

export default function TableView(props) {
  const {
    children,
    title,
    style,
    expanded = true,
    description,
    ...restProps
  } = props;

  const styles = useStyles();

  const animatedValue = React.useRef(
    new Animated.Value(expanded ? 1 : 0),
  ).current;

  const [visible, setVisible] = React.useState(expanded);

  const iconStyle = {
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '0deg'],
        }),
      },
    ],
  };

  const togglePanel = () => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
      }).start();
    }
    setVisible(!visible);
  };

  return (
    <View {...restProps} style={[tw.flex1, style]}>
      <View style={tw.flexRow}>
        <View style={tw.flex1}>
          <Text category="s2">{title}</Text>
          {description && (
            <Text appearance="hint" category="c1">
              {description}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={togglePanel}>
          <Animated.View style={[tw._mX4, tw.pX4, iconStyle]}>
            <Icon name="arrow-ios-upward" style={styles.icon} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {visible && (
        <View>
          <Divider style={tw.mT2} />
          {children}
        </View>
      )}
    </View>
  );
}
