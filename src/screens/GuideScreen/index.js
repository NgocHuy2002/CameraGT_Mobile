import {
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
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

import { ROUTER } from '@constants/router';

import { getGuideApi } from '@services/GuideService/GuideService';

export const GuideScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [guide, setGuide] = useState();
  const [source, setSource] = useState();
  const { width } = useWindowDimensions();
  // ------------- useEffect -------------
  useEffect(() => {
    handleGetGuide('C_HDSD_CTT', 1, 10);
  }, []);
  // -------------------------------------
  // ------------- Action ----------------
  const handleGetGuide = async (type, page, size) => {
    const data = await getGuideApi(type, page, size);
    setGuide(data.items);
  };
  // -------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Hướng dẫn kết nối"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <Menu
          selectedIndex={selectedIndex}
          style={{ paddingHorizontal: 10, marginVertical: 10 }}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {guide?.map((item) => {
            return (
              <MenuGroup
                title={(evaProps) => (
                  <Text
                    {...evaProps}
                    style={{ fontSize: 15, fontWeight: '700' }}
                  >
                    {item.name}
                  </Text>
                )}
                key={item.id}
              >
                {item.child.map((subItem) => {
                  return (
                    <MenuItem
                      onPress={() =>
                        navigation.navigate(ROUTER.GUIDE_ID, {
                          title: subItem.name,
                          id: subItem.id,
                        })
                      }
                      title={subItem.name}
                      key={subItem.id}
                      style={{ borderBottomWidth: 1, borderColor: '#E8E8E8' }}
                    />
                  );
                })}
              </MenuGroup>
            );
          })}
        </Menu>
        {/* <RenderHtml
          contentWidth={width}
          source={source ? source : { html: `<div></div>` }}
        /> */}
      </Content>
    </Container>
  );
};
