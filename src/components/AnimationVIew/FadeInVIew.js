import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const FadeInView = (props, { navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animatable.View animation={'bounceInLeft'} duration={600}>
      {props.children}
    </Animatable.View>
  );
};
