import { Divider, Layout, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSafeArea } from 'react-native-safe-area-context';
import { tw } from 'react-native-tailwindcss';

import ActionSheetItem from './ActionSheetItem';

const ActionSheet = React.forwardRef(function ActionSheet(props, ref) {
  const { children, title, message, options, ...restProps } = props;

  const insets = useSafeArea();

  const close = React.useCallback(() => {
    ref.current?.close();
  }, []);

  const onItemPress = React.useCallback(
    (itemProps) => () => {
      itemProps?.onPress();
      close();
    },
    [],
  );

  const renderList = React.useCallback(() => {
    if (options) {
      return options.reduce(
        (acc, cur) => (
          <>
            {acc}
            {acc !== null && <Divider />}
            {renderItem(cur)}
          </>
        ),
        null,
      );
    }
    return children;
  }, [options, children]);

  const renderItem = React.useCallback((itemProps) => {
    return <ActionSheetItem {...itemProps} onPress={onItemPress(itemProps)} />;
  }, []);

  const renderHeader = React.useCallback(() => {
    if (title || message) {
      return (
        <React.Fragment>
          <View style={[tw.p4, tw.itemsCenter]}>
            <Text category="s1">{title}</Text>
            {message && (
              <Text appearance="hint" category="p2" style={[title && tw.mT1]}>
                {message}
              </Text>
            )}
          </View>
          <Divider />
        </React.Fragment>
      );
    }
    return null;
  }, [title, message]);

  const renderFooter = React.useCallback(
    () => (
      <View style={[tw.mT2, tw.rounded, tw.bgWhite, tw.overflowHidden]}>
        <ActionSheetItem title="Huỷ" onPress={close} />
      </View>
    ),
    [],
  );

  return (
    <Portal>
      <Modalize
        ref={ref}
        {...restProps}
        withHandle={false}
        modalStyle={tw.bgTransparent}
        adjustToContentHeight={true}
      >
        <View style={[tw.pX4, tw.pY2, { marginBottom: insets.bottom }]}>
          <Layout style={[tw.rounded, tw.overflowHidden]}>
            {renderHeader()}
            {renderList()}
          </Layout>
          {renderFooter()}
        </View>
      </Modalize>
    </Portal>
  );
});

ActionSheet.Item = ActionSheetItem;

export default ActionSheet;
