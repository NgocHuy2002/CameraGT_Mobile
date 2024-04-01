import { Button, Divider, Layout } from '@ui-kitten/components';
import { usePersistFn } from 'ahooks';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import Modal from '@components/Modal/Modal';
import Time from '@components/Time/Time';

const TimePicker = React.forwardRef((props, modalRef) => {
  const { visible, onModalShow, onModalHide, onBackdropPress, ...restProps } =
    props;

  const dateRef = React.useRef(null);

  const onPress = usePersistFn(() => {
    modalRef.current?.hide();
    props.onConfirm?.(dateRef.current?.selectedDate);
  });

  return (
    <Modal
      ref={modalRef}
      style={tw.wAuto}
      visible={visible}
      onModalShow={onModalShow}
      onModalHide={onModalHide}
      onBackdropPress={onBackdropPress}
    >
      <Layout style={tw.rounded}>
        <View style={[tw.w48, tw.itemsCenter]}>
          <Time ref={dateRef} {...restProps} />
        </View>
        <Divider />
        <View style={[tw.flexRow, tw.p2, tw.justifyEnd]}>
          <Button size="small" onPress={onPress}>
            Đồng ý
          </Button>
        </View>
      </Layout>
    </Modal>
  );
});

TimePicker.propTypes = {
  date: PropTypes.any,
  onConfirm: PropTypes.func,
};

export default TimePicker;
