import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import { ROUTER } from '@constants/router';

import { selectToken } from '@containers/Auth/saga/selectors';
import { HomeScreen } from '@containers/HomeScreen';
import MenuScreen from '@containers/MenuScreen';
import { PostsScreen } from '@containers/PostsScreen';

import AppLoaderScreen from './appLoaderScreen';

const Stack = createStackNavigator();

export default function SubMainNavigator({ navigation }) {
  const token = useSelector(selectToken);

  React.useEffect(() => {
    if (token) {
      navigation.replace(ROUTER.MAIN_NAVIGATOR);
    } else {
      navigation.replace(ROUTER.AUTH_NAVIGATOR);
    }
  }, []);
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTER.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTER.MENU} component={MenuScreen} />
      <Stack.Screen name={ROUTER.POSTS} component={PostsScreen} />
    </Stack.Navigator>
  );
}
