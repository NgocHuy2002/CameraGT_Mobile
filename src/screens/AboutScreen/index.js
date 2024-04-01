import {
  Avatar,
  Card,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import { Column, Row } from '@components/Stack';

import { getAboutApi } from '@services/AboutService/AboutService';

export const AboutScreen = ({ navigation }) => {
  const [source, setSource] = useState();
  const { width } = useWindowDimensions();
  const AvatarImageComponentShowcase = () => (
    <Avatar
      source={require('@assets/images/logo.png')}
      ImageComponent={ImageBackground}
      style={{ borderWidth: 1, borderColor: '#E8E8E8' }}
    />
  );
  // --------------------------- useEffect --------------------------
  useEffect(() => {
    handleGetAbout('noi-dung-hien-thi-so-1', 'C_TRANGTINH', 1, 10);
  }, []);
  // ----------------------------------------------------------------
  // --------------------------- Action -----------------------------
  const handleGetAbout = async (slug, type, page, size) => {
    const data = await getAboutApi(slug, type, page, size);
    setSource({ html: data?.noidung });
  };
  // ----------------------------------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Giới thiệu"
        hideLeftIcon={false}
      />
      <Content
        scrollEnabled={true}
        safeAreaEnabled={false}
        style={{ marginHorizontal: 10 }}
      >
        {/* <Card style={styles.card}>
          <Row space={4}>
            {AvatarImageComponentShowcase()}
            <Column space={2}>
              <Text>
                Cổng thông tin điện tử tỉnh Lạng Sơn
              </Text>
              <Text>
                Phiên bản 1.0
              </Text>
            </Column>
          </Row>
        </Card> */}
        <RenderHTML
          contentWidth={width - 20}
          source={
            source ? source : { html: `<div><p>Không có bài viết</p></div>` }
          }
          // tagsStyles={tagsStyles}
        />
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  card: {
    marginTop: 10,
    width: Dimensions.get('screen').width - 20,
    marginHorizontal: 10,
    height: 100,
    justifyContent: 'center',
  },
});
