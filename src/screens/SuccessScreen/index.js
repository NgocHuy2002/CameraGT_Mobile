import { Button, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import { Column } from '@components/Stack';

import { ROUTER } from '@constants/router';

import { userLogoutRoutine } from '@containers/Auth/saga/routines';

export const SuccessScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { content, subContent } = route.params;
  const handleLogout = async () => {
    console.log('logout');
    await navigation.navigate(ROUTER.LOGIN);
    dispatch(userLogoutRoutine.trigger());
  };
  return (
    <Container>
      <Content>
        <Column space={4} style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ marginTop: 50 }}>
            <Icon
              name={'checkmark-circle-2'}
              fill="#57BF99"
              style={{ width: 151, height: 151, alignSelf: 'center' }}
            />
            <Text style={{ alignSelf: 'center' }}>{content}</Text>
            {subContent ? (
              <Text style={{ alignSelf: 'center' }}>{subContent}</Text>
            ) : null}
          </View>
          <Button
            style={{
              borderRadius: 100,
              width: 343,
              height: 51,
              alignSelf: 'center',
              marginBottom: '10%',
            }}
            onPress={handleLogout}
          >
            Đăng nhập
          </Button>
        </Column>
      </Content>
    </Container>
  );
};
