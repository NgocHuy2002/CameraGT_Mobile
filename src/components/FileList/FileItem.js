import { Icon, ListItem } from '@ui-kitten/components';
import * as ExpoWebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Toast from '@modules/Toast/Toast';

export default function FileItem(props) {
  const { file, variant = 'filled', onRemovePress } = props;

  const fileUri = file.uri;
  const fileName = file.name;

  const _onPress = React.useCallback(() => {
    const canOpen = /^(http|https)/.test(fileUri);
    if (canOpen) {
      const url = `https://docs.google.com/viewer?url=${fileUri}&embedded=true`;
      ExpoWebBrowser.openBrowserAsync(url);
    } else {
      Toast.showText('Tệp tin chưa được tải lên');
    }
  }, [fileUri]);

  const _onRemovePress = React.useCallback(() => {
    if (onRemovePress) {
      onRemovePress(file);
    }
  }, [file]);

  const _renderIcon = React.useCallback(
    (iconProps) => (
      <TouchableOpacity onPress={_onRemovePress}>
        <Icon {...iconProps} name="close" />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <ListItem
      title={fileName}
      variant={variant}
      accessoryRight={_renderIcon}
      onPress={_onPress}
    />
  );
}
