import { StyleService, useStyleSheet } from '@ui-kitten/components';

export default function makeStyles(styles) {
  const themedStyles = StyleService.create(styles);
  const useStyles = () => useStyleSheet(themedStyles);
  return useStyles;
}
