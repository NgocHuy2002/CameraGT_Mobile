import { Text } from '@ui-kitten/components';
// import { Wheel } from 'teaset';
import { usePersistFn } from 'ahooks';
import React from 'react';
import { tw } from 'react-native-tailwindcss';

function Wheel() {
  return null;
}

export default function TimeUnit(props) {
  const { visible, data, value, ...restProps } = props;

  const currentIndex = React.useMemo(() => {
    const foundIndex = data.findIndex((item) => item.value === value);
    if (foundIndex !== -1) {
      return foundIndex;
    }
    return null;
  }, [value]);

  const onChange = usePersistFn((selectedIndex) => {
    if (currentIndex !== selectedIndex) {
      const selectedItem = data[selectedIndex];
      if (selectedItem && props.onChange) {
        props.onChange(selectedItem.value);
      }
    }
  });

  const renderText = usePersistFn(({ label }) => (
    <Text category="s1" style={[tw.textLg, tw.textCenter]}>
      {label}
    </Text>
  ));

  if (visible) {
    return (
      <Wheel
        style={[tw.w10, tw.h24]}
        holeLine={0}
        maskStyle={tw.opacity75}
        {...restProps}
        index={currentIndex}
        items={data.map(renderText)}
        onChange={onChange}
      />
    );
  }
  return null;
}
