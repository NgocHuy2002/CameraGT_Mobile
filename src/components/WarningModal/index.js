import { Button, Card, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Exclamation from '@assets/icons/exclamation.svg';
import Warning from '@assets/icons/warning.svg';

import { Column, Row } from '@components/Stack';

export const WarningModal = ({
  status,
  title,
  content,
  contentTitle,
  visible,
  onRequestClose,
}) => {
  const renderIcon = () => {
    switch (status) {
      case 'danger':
        return <Exclamation />;
      case 'success':
        return (
          <Icon
            name={'checkmark-circle-2'}
            fill="#57BF99"
            style={{ width: 59.58, height: 59.58, alignSelf: 'center' }}
          />
        );
      case 'danger':
        return <Warning />;
      default:
        return null;
        break;
    }
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            disabled={true}
            style={{ height: 363, width: 343, borderRadius: 15 }}
          >
            <Column space={4}>
              {status === 'danger' ? (
                <Exclamation style={{ alignSelf: 'center' }} />
              ) : status === 'success' ? (
                <Icon
                  name={'checkmark-circle-2'}
                  fill="#57BF99"
                  style={{ width: 59.58, height: 59.58, alignSelf: 'center' }}
                />
              ) : status === 'warning' ? (
                <Warning style={{ alignSelf: 'center' }} />
              ) : null}
              <Column space={4}>
                <Text
                  style={{
                    fontSize: 30,
                    color: '#DD4066',
                    alignSelf: 'center',
                  }}
                >
                  Xác thực thao tác!
                </Text>
                <Text style={{ fontSize: 16, alignSelf: 'center' }}>
                  {title}
                </Text>
                <Row style={{ alignSelf: 'center' }}>
                  <Text style={{ fontSize: 16 }}>{contentTitle}</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {content}
                  </Text>
                </Row>
                <Button status="danger" style={{ borderRadius: 100 }}>
                  Đồng ý
                </Button>
                <Button
                  appearance="ghost"
                  status="basic"
                  onPress={onRequestClose}
                >
                  Bỏ qua
                </Button>
              </Column>
            </Column>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
