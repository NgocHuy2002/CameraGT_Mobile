import { Radio, RadioGroup } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

export const LanguageScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Container>
      <Header
        // status='primary'
        title="Ngôn ngữ ứng dụng"
        color={'#286FC3'}
        hideLeftIcon={false}
        onBackPress={() => navigation.goBack()}
      />
      <Content>
        <View style={{ flex: 1, width: 341, height: 32 }}>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
            style={{ width: '100%', display: 'flex', padding: 15 }}
          >
            <Radio style={styles.radio}>Tiếng việt</Radio>
            <Radio style={styles.radio}>Tiếng việt</Radio>
            <Radio style={styles.radio}>Tiếng việt</Radio>
            <Radio style={styles.radio}>Tiếng việt</Radio>
          </RadioGroup>
        </View>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  radio: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 5,
    borderColor: '#E8E8E8',
  },
});
