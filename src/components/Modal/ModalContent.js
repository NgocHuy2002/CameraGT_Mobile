import { usePersistFn } from 'ahooks';
import PropTypes from 'prop-types';
import React from 'react';
import { BackHandler } from 'react-native';

const ModalContent = (props) => {
  const { children, backPressEnabled } = props;

  const backButtonListenerRef = React.useRef(null);

  React.useEffect(() => {
    props.onModalShow?.();
  }, []);

  React.useEffect(
    () => () => {
      props.onModalHide?.();
    },
    [],
  );

  const onBackPress = usePersistFn(() => {
    if (!backPressEnabled) {
      return true;
    }
    return props.onBackButtonPress?.();
  });

  React.useEffect(() => {
    backButtonListenerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
  }, []);

  React.useEffect(
    () => () => {
      backButtonListenerRef.current?.remove();
    },
    [],
  );

  return children;
};

ModalContent.propTypes = {
  backPressEnabled: PropTypes.bool,
};

ModalContent.defaultProps = {
  backPressEnabled: true,
};

export default ModalContent;
