import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

import { getGuideByIdApi } from '@services/GuideService/GuideService';

const GuideDetail = ({ navigation, route }) => {
  const { title, id } = route.params;
  const [source, setSource] = useState();
  const { width } = useWindowDimensions();
  // -------------- useEffect ---------------------
  useEffect(() => {
    getGuide();
  }, []);
  // ----------------------------------------------
  // ------------- Action -------------------------
  const getGuide = async () => {
    if (id) {
      const data = await getGuideByIdApi(id);
      console.log(data);
    }
  };
  // ----------------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title={title}
        hideLeftIcon={false}
      />
      <Content>
        {/* <View style={{justifyContent: 'center', alignItems: 'center'}}></View> */}
        <RenderHtml
          contentWidth={width}
          source={
            source
              ? source
              : {
                  html: `<div style="display: flex;align-items: center; justify-content: center, padding-top: 10px">Không có hướng dẫn </div>`,
                }
          }
        />
      </Content>
    </Container>
  );
};
export default GuideDetail;
