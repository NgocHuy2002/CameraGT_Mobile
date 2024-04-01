import { Button, Icon, Radio, RadioGroup, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { color, tw } from 'react-native-tailwindcss';

import FormikInput from '@components/FormInput/FormikInput';
import FormLabel from '@components/FormLabel/FormLabel';
import FormikRadio from '@components/FormRadio/FormikRadio';
import useSafeAreaStyle from '@components/SafeAreaView/useSafeAreaStyle';
import { Column, Row } from '@components/Stack';

import ImagePicker from '@modules/ImagePicker/ImagePicker';

export default function UploadButton({
  onImageChange,
  onVideoChange,
  containerStyle,
}) {
  const modalRef = useRef(null);
  const contentStyle = useSafeAreaStyle(['bottom'], tw.p4);

  const [selected, setSelected] = useState(0);
  const [formValues, setFormValues] = useState({
    type: 'image',
    import: false,
  });

  const onGalleryOpen = async () => {
    const imageUri = await ImagePicker.launchImageLibrary();
    if (imageUri) {
      modalRef.current?.close();
      onImageChange?.({ uri: imageUri });
    }
  };

  const onCameraOpen = async () => {
    const imageUri = await ImagePicker.launchCamera();
    if (imageUri) {
      modalRef.current?.close();
      onImageChange?.({ uri: imageUri });
    }
  };

  const onVideoOpen = async () => {
    const videoUri = await ImagePicker.launchVideoLibrary();
    if (videoUri) {
      modalRef.current?.close();
      onVideoChange?.({ uri: videoUri });
    }
  };

  const onVideoImport = (values) => {
    if (values.url) {
      modalRef.current?.close();
      onVideoChange?.({ uri: values.url, import: true });
    }
  };

  const renderForm = ({ values, ...formik }) => (
    <Column space={4} style={[tw.bgWhite, contentStyle]}>
      <Text category="h6">Tải tệp lên</Text>
      <Column space={2}>
        <FormikRadio
          name="type"
          label="Loại tập tin"
          options={[
            { value: 'image', label: 'Hình ảnh' },
            { value: 'video', label: 'Video' },
          ]}
        />
        {values.type === 'image' && (
          <Column>
            <FormLabel>Tải lên hình ảnh từ</FormLabel>
            <Row space={2}>
              <Button
                size="small"
                onPress={onGalleryOpen}
                accessoryLeft={(props) => <Icon {...props} name="image" />}
              >
                Thư viện ảnh
              </Button>
              <Button
                size="small"
                onPress={onCameraOpen}
                accessoryLeft={(props) => <Icon {...props} name="camera" />}
              >
                Chụp ảnh
              </Button>
            </Row>
          </Column>
        )}
        {values.type === 'video' && (
          <Column space={2}>
            <FormikRadio
              name="import"
              label="Tải lên video từ"
              options={[
                { value: false, label: 'Thư viện video' },
                { value: true, label: 'URL' },
              ]}
            />
            {values.import ? (
              <FormikInput
                name="url"
                label="Địa chỉ url"
                variant="outlined"
                placeholder="Nhập địa chỉ url"
              />
            ) : (
              <Row>
                <Button
                  size="small"
                  onPress={onVideoOpen}
                  accessoryLeft={(props) => <Icon {...props} name="video" />}
                >
                  Thư viện video
                </Button>
              </Row>
            )}
          </Column>
        )}
      </Column>
      {values.import && <Button onPress={formik.handleSubmit}>Lưu</Button>}
    </Column>
  );

  return (
    <View style={containerStyle}>
      <Button
        onPress={() => modalRef.current?.open()}
        size="small"
        appearance="outline"
        accessoryLeft={(props) => (
          <Icon {...props} name="cloud-upload-outline" />
        )}
      >
        Tải tệp lên
      </Button>
      <Portal>
        <Modalize
          ref={modalRef}
          withHandle={false}
          modalStyle={tw.bgTransparent}
          adjustToContentHeight={true}
        >
          <Formik initialValues={formValues} onSubmit={onVideoImport}>
            {renderForm}
          </Formik>
        </Modalize>
      </Portal>
    </View>
  );
}
