import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ROUTER } from '@constants/router';

{
  /* <Tab.Screen name={ROUTER.HOME} component={HomeScreen}
options={{
    tabBarLabel: 'Trang chủ',
    tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
    ),
}}
/>
<Tab.Screen name={ROUTER.FIELD} component={Field} options={{ tabBarButton: () => <></> }} />
<Tab.Screen name={ROUTER.POST} component={PostDetail} options={{ tabBarButton: () => <></> }} />
<Tab.Screen name={ROUTER.CONTACT} component={ContactScreen} options={{ tabBarButton: () => <></> }} />
<Tab.Screen name={ROUTER.RESOURCES_DETAIL} component={ResourcesDetail} options={{ tabBarButton: () => <></> }} />
<Tab.Screen name={ROUTER.RESOURCES_LIST} component={ResourcesList} options={{ tabBarButton: () => <></> }} />
<Tab.Screen name={ROUTER.DATA_DETAIL} component={DataDetail} options={{ tabBarButton: () => <></> }} />
<Tab.Screen name={ROUTER.RESOURCES} component={ResourcesScreen}
options={{
    tabBarLabel: 'Tài nguyên',
    tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="database" color={color} size={size} />
    ),
}}
/>
<Tab.Screen name={ROUTER.POSTS} component={PostsScreen}
options={{
    tabBarLabel: 'Bài viết',
    tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="newspaper-variant-multiple" size={size} color={color} />
    ),
}}
/>
<Tab.Screen name={ROUTER.MENU} component={MenuScreen}
options={{
    tabBarLabel: 'Thêm',
    tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="menu" color={color} size={size} />
    ),
}}
/> */
}
export const routes = {
  home: { name: ROUTER.HOME, icon: 'home' },
  field: { name: ROUTER.FIELD },
  post: { name: ROUTER.POST },
  contact: { name: ROUTER.CONTACT },
  resources_detail: { name: ROUTER.RESOURCES_DETAIL },
  resources_list: { name: ROUTER.RESOURCES_LIST },
  data_detail: { name: ROUTER.DATA_DETAIL },
  resources: { name: ROUTER.RESOURCES, icon: 'database' },
  posts: { name: ROUTER.POSTS, icon: 'newspaper-variant-multiple' },
  settings: { name: ROUTER.MENU, icon: 'menu' },
};

const { width } = Dimensions.get('window');

// 20 on each side for absolute positioning of the tab bar
// 20 on each side for the internal padding
const TAB_WIDTH = (width - 40 * 2) / 4;

const TabBarComponent = ({ state, navigation, descriptors }) => {
  const translateX = useSharedValue(0);
  const focusedTab = state.index;

  const handleAnimate = (index) => {
    'worklet';
    translateX.value = withTiming(index * TAB_WIDTH, {
      duration: 1000,
    });
  };
  useEffect(() => {
    runOnUI(handleAnimate)(focusedTab);
  }, [focusedTab]);

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <>
      <Animated.View style={[styles.container, rnStyle]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
              params: {},
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const routeName = route.name.toLowerCase();
        const icon = routes[routeName]?.icon;
        return (
          <Pressable
            key={`route-${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}
          >
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={isFocused ? '#A9A9A9' : 'black'}
            />
          </Pressable>
        );
      })}
    </>
  );
};

export default TabBarComponent;

const styles = StyleSheet.create({
  container: {
    width: TAB_WIDTH,
    height: 40,
    backgroundColor: 'blue',
    zIndex: 0,
    position: 'absolute',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
