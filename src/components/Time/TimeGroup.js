import { Text } from '@ui-kitten/components';
import { usePersistFn } from 'ahooks';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

const TimeGroup = (props) => {
  const { style } = props;

  const isChildValid = usePersistFn((child) => {
    if (child && child.type && child.type(child.props)) {
      return true;
    }
    return false;
  });

  const renderSeparator = usePersistFn(() => (
    <Text category="s1" style={[tw.pB1, tw.textLg]}>
      &#58;
    </Text>
  ));

  return (
    <View style={[tw.flexRow, tw.pY4, tw.itemsCenter, style]}>
      {props.children.filter(isChildValid).reduce(
        (acc, curr) => (
          <>
            {acc}
            {acc && renderSeparator()}
            {curr}
          </>
        ),
        null,
      )}
    </View>
  );
};

export default TimeGroup;
