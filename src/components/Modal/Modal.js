import { Modal as RkModal } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';

import ModalContent from './ModalContent';
import styles from './styles';

const Modal = React.forwardRef((props, ref) => {
  const { onModalShow, onModalHide, backPressEnabled, ...restProps } = props;

  const onBackdropPress = () => {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    } else {
      ref.current?.hide();
    }
  };

  const onBackButtonPress = () => {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    } else {
      ref.current?.hide();
    }
  };

  return (
    <RkModal
      ref={ref}
      {...restProps}
      style={[styles.modal, props.style]}
      backdropStyle={[styles.backdrop, props.backdropStyle]}
      onBackdropPress={onBackdropPress}
    >
      <ModalContent
        onModalShow={onModalShow}
        onModalHide={onModalHide}
        backPressEnabled={backPressEnabled}
        onBackButtonPress={onBackButtonPress}
      >
        {props.children}
      </ModalContent>
    </RkModal>
  );
});

Modal.propTypes = {
  visible: PropTypes.bool,
  onModalShow: PropTypes.func,
  onModalHide: PropTypes.func,
  onBackdropPress: PropTypes.func,
};

export default Modal;
