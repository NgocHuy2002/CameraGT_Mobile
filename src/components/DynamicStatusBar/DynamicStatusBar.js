import { useTheme } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import makeStyles from '@helpers/makeStyles';

const useStyles = makeStyles({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
});

export default function DynamicStatusBar(props) {
  const { darkTheme } = props;

  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <StatusBar
        style={darkTheme ? 'light' : 'dark'}
        backgroundColor={theme['background-basic-color-1']}
      />
    </View>
  );
}
