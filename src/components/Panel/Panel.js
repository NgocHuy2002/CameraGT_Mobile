import React, { useState } from 'react';
import { color, tw } from 'react-native-tailwindcss';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

import { Column, Row } from '../Stack';

export default function Panel({
  children,
  title,
  icon,
  open = true,
  ...props
}: PanelProps) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Column space={2} {...props}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Row space={2}>
          <View style={tw.flex1}>{title}</View>
          {icon || (
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              fill={color.primary}
              width={24}
              height={24}
            />
          )}
        </Row>
      </TouchableOpacity>
      {isOpen && children}
    </Column>
  );
}
