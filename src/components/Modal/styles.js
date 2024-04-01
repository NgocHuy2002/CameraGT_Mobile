import { Dimensions, StyleSheet } from 'react-native';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  modal: {
    width: screen.width * 0.9,
  },
  backdrop: {
    height: screen.height,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default styles;
