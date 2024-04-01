import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { tw } from 'react-native-tailwindcss';

export function flattenChildren(children) {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.reduce((flatChildren, child) => {
    if (child.type === React.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children));
    }
    if (React.isValidElement(child)) {
      flatChildren.push(React.cloneElement(child));
    } else {
      flatChildren.push(child);
    }
    return flatChildren;
  }, []);
}

export const getSpacedChildren = (children, space, axis, divider) => {
  let childrenArray = React.Children.toArray(flattenChildren(children));

  if (divider) {
    const spacingStyle = axis === 'X' ? tw[`mX${space}`] : tw[`mY${space}`];
    divider = React.cloneElement(divider, {
      style: StyleSheet.compose(divider.props.style, spacingStyle),
    });
    childrenArray = childrenArray.map((child, index) => (
      <React.Fragment key={child.key ?? `child-${index}`}>
        {child}
        {index < childrenArray.length - 1 && divider}
      </React.Fragment>
    ));
  } else {
    const spacingStyle = axis === 'X' ? tw[`w${space}`] : tw[`h${space}`];
    childrenArray = childrenArray.map((child, index) => (
      <React.Fragment key={child.key ?? `child-${index}`}>
        {child}
        {index < childrenArray.length - 1 && <View style={spacingStyle} />}
      </React.Fragment>
    ));
  }

  return childrenArray;
};
