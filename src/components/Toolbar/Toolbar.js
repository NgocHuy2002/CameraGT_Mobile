import { useNavigation } from '@react-navigation/native';
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  styled,
} from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import renderNode from '@helpers/renderNode';

import { Row } from '../Stack';

export const NavAction = styled('TopNavigationAction')(({ eva, ...props }) => {
  const { children, icon, text, style, ...restProps } = props;

  const computedStyle = {
    container: {
      marginHorizontal: eva.style.iconMarginHorizontal,
    },
    icon: {
      width: eva.style.iconWidth,
      height: eva.style.iconHeight,
      tintColor: eva.style.iconTintColor,
    },
    text: {
      color: eva.style.iconTintColor,
    },
  };

  return (
    <TouchableOpacity {...restProps} style={[computedStyle.container, style]}>
      <Row center space={1}>
        {icon && renderNode(Icon, icon, { style: computedStyle.icon })}
        {text && renderNode(Text, text, { style: computedStyle.text })}
        {children}
      </Row>
    </TouchableOpacity>
  );
});

export const BackNavAction = ({ color, onPress, ...props }) => {
  const navigation = useNavigation();

  const _onPress = () => {
    navigation.goBack();
  };

  return (
    <NavAction
      {...props}
      icon={{
        name: 'arrow-back-outline',
        width: 20,
        height: 20,
        fill: color ? color : '#000000',
      }}
      onPress={onPress || _onPress}
    />
  );
};

function Toolbar(props) {
  const {
    status = 'default',
    title,
    leftIcon,
    hideLeftIcon,
    onBackPress,
    color,
    renderRightActions,
    ...restProps
  } = props;

  const renderTitle = (textProps) => (
    <Text
      {...textProps}
      style={[
        textProps.style,
        tw.pL2,
        tw.textXl,
        tw.textXl,
        tw.fontBold,
        { color: color ? color : '#000000' },
      ]}
    >
      {title}
    </Text>
  );

  const renderLeftAction = () => (
    <BackNavAction status={status} color={color} onPress={onBackPress} />
  );

  const renderRightAction = () => <Row center>{renderRightActions()}</Row>;

  return (
    <TopNavigation
      status={status}
      title={renderTitle}
      alignment="center"
      accessoryLeft={!hideLeftIcon && renderLeftAction}
      accessoryRight={!!renderRightActions && renderRightAction}
      {...restProps}
    />
  );
}

export default Toolbar;
