import { useLayout } from '@react-native-community/hooks';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

export default function Grid(props) {
  const {
    children,
    style,
    spacing = 16,
    autoWidth = true,
    minWidth = 200,
    ...restProps
  } = props;

  const childs = React.Children.count(children);

  const { onLayout, width } = useLayout();

  const [columns, setColumns] = React.useState(() =>
    Math.floor(width / minWidth),
  );
  const [colWidth, setColWidth] = React.useState(100);

  React.useEffect(() => {
    let columns = Math.floor(width / minWidth);
    if (columns < 1) columns = 1;
    if (columns > childs) columns = childs;
    const colWidth = 100 / columns;

    setColumns(columns);
    setColWidth(colWidth);
  }, [width]);

  const gridStyle = React.useMemo(
    () => ({
      ...tw.flexRow,
      ...tw.flexWrap,
      marginTop: -spacing / 2,
      marginLeft: -spacing / 2,
      marginRight: -spacing / 2,
    }),
    [spacing],
  );

  const itemStyle = React.useMemo(
    () => ({
      width: autoWidth ? `${colWidth}%` : 'auto',
      padding: spacing / 2,
    }),
    [spacing, autoWidth, colWidth],
  );

  const isLastRow = React.useCallback(
    (colIndex) => {
      if (colIndex - 1 > (Math.ceil(childs / columns) - 1) * columns) {
        return true;
      }
      return false;
    },
    [childs, columns],
  );

  return (
    <View {...restProps} style={[style, gridStyle]} onLayout={onLayout}>
      {React.Children.toArray(children).map((child, i) => (
        <View key={i} style={[itemStyle, isLastRow(i) && tw.pB0]}>
          {child}
        </View>
      ))}
    </View>
  );
}
