import {
  Button,
  Icon,
  IconElement,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { TouchableWebElement } from '@ui-kitten/components/devsupport';
import React from 'react';
import { StyleSheet } from 'react-native';

const TopNavigationCustom = ({ isReturnable, title, renderRightActions }) => {
  const BackIcon = (props) => <Icon name="arrow-back" {...props} />;
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;
  return (
    <TopNavigation
      title={title}
      alignment="center"
      accessoryLeft={isReturnable ? BackAction : null}
      accessoryRight={renderRightActions ? renderRightActions : null}
    />
  );
};
export default TopNavigationCustom;
