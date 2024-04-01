import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Card,
  CheckBox,
  Icon,
  Input,
  Modal,
  Text,
} from '@ui-kitten/components';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { tw } from 'react-native-tailwindcss';
import * as Yup from 'yup';

import UserIcon from '@assets/icons/user-edit.svg';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import { CustomForm } from '@components/Form/form';
import FormikDatePicker from '@components/FormDatePicker/FormikDatePicker';
import FormikInput from '@components/FormInput/FormikInput';
import FormikSelect from '@components/FormSelect/FormikSelect';
import Header from '@components/Header/Header';
import { Column, Row } from '@components/Stack';
import { WarningModal } from '@components/WarningModal';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import { formatString } from '@helpers/formatString';

import { requestUploadAvatarApi } from '@services/FileService/FileService';
import { updateUserInfoApi } from '@services/UserServive/UserService';

const FormData = global.FormData;

export default function UserInfo({ navigation, route }) {
  // const user = useSelector(selectUser)
  const { user } = route.params;
  const [error, setError] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [avatar, setAvatar] = React.useState(
    user.avatarImageUrl ? `"${user.avatarImageUrl}"` : '',
  );
  const formValues = {
    fullName: user?.fullName || '',
    userName: user.userName,
    phone: user?.phone || '',
    email: user?.email || '',
    sex: user?.sex || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
  };

  const noSpacesValidation = Yup.string()
    .required('Thông tin này không được bỏ trống')
    .test('no-spaces', 'Không được chỉ nhập khoảng trắng', (value) => {
      return value !== null && value !== undefined && value.trim() !== '';
    });

  const Schema = Yup.object().shape({
    fullName: noSpacesValidation,
    userName: noSpacesValidation,
    phone: noSpacesValidation,
    email: noSpacesValidation,
    sex: noSpacesValidation,
    dateOfBirth: noSpacesValidation,
    address: noSpacesValidation,
  });
  const renderForm = (formik) => (
    <Column space={4} style={[tw.p4, { flex: 1 }]}>
      <Text
        style={[tw.mB4, tw.textBase, { color: '#92969A', alignSelf: 'center' }]}
      >
        Vui lòng nhập thông tin tài khoản
      </Text>
      <Pressable onPress={() => setModalVisible(true)}>
        {/* <UserIcon style={{ alignSelf: 'center' }} /> */}
        {image || avatar ? (
          <View
            style={{
              width: 108,
              height: 106,
              borderRadius: Dimensions.get('screen').width,
              overflow: 'hidden',
              alignSelf: 'center',
            }}
          >
            <Image
              source={{
                uri: image
                  ? image
                  : formatString(API.GET_IMAGE, JSON.parse(avatar)),
              }}
              style={{ width: 108, height: 106 }}
            />
          </View>
        ) : (
          <UserIcon style={{ alignSelf: 'center' }} />
        )}
      </Pressable>
      <Column space={4} style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <FormikInput
            name={'fullName'}
            variant="outlined"
            containerStyle={tw.mB4}
            // required={true}
            placeholder={'Họ và tên'}
          />
          <FormikInput
            name={'userName'}
            variant="outlined"
            containerStyle={tw.mB4}
            required={true}
            disabled={true}
            placeholder={'Tên đăng nhập'}
          />
          <FormikInput
            name={'phone'}
            variant="outlined"
            containerStyle={tw.mB4}
            // required={true}
            placeholder={'Số điện thoại'}
          />
          <FormikInput
            name={'email'}
            variant="outlined"
            containerStyle={tw.mB4}
            // required={true}
            placeholder={'Email'}
          />
          <FormikSelect
            name="sex"
            variant="outlined"
            containerStyle={tw.mB4}
            // required={true}
            uniqueKey="value"
            displayKey="label"
            options={[
              { value: 1, label: 'Nam' },
              { value: 0, label: 'Nữ' },
            ]}
            placeholder={'Nhập giới tính'}
          />
          <FormikDatePicker
            name="dateOfBirth"
            containerStyle={tw.mB4}
            variant="outlined"
            placeholder="Chọn ngày sinh"
          />
          <FormikInput
            name="address"
            variant="outlined"
            containerStyle={tw.mB4}
            placeholder="Địa chỉ"
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={formik.handleSubmit}
            style={{ borderRadius: 100, width: 343, height: 51 }}
          >
            Lưu thông tin
          </Button>
          <Button
            onPress={() => setVisible(true)}
            appearance="ghost"
            status="danger"
          >
            Xoá tài khoản
          </Button>
        </View>
      </Column>
    </Column>
  );
  // ---------- useEffect ------------
  useFocusEffect(
    React.useCallback(() => {
      setError(false);
    }, []),
  );
  // ---------- Action ------------
  const onFormSubmit = async (values) => {
    const dataForm = {
      // userName: values.userName,
      sex: values.sex,
      fullName: values.fullName,
      dateOfBirth: values.dateOfBirth,
      address: values.address,
      phone: values.phone,
      email: values.email,
      avatarImageUrl: JSON.parse(avatar),
    };
    console.log(dataForm);
    const data = await updateUserInfoApi(dataForm);
    if (data) {
      navigation.navigate(ROUTER.MENU);
    }
    // navigation.navigate(ROUTER.SUCCESS, {
    //   content: 'Tài khoản đã được tạo thành công',
    // });
    // console.log(values);
  };

  const handleUploadAvatar = async (uri) => {
    try {
      const res = await FileSystem.uploadAsync(API.UPLOAD_AVATAR, uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'File',
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const uri =
        Platform.OS === 'ios'
          ? result.assets[0].uri.replace('file://', '')
          : result.assets[0].uri;
      const data = await handleUploadAvatar(uri);
      if (data) {
        setAvatar(data.body);
        setModalVisible(false);
      }
    }
  };

  const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const uri =
          Platform.OS === 'ios'
            ? result.assets[0].uri.replace('file://', '')
            : result.assets[0].uri;
        const data = await handleUploadAvatar(uri);
        if (data) {
          console.log('return >>', data);
          setModalVisible(false);
        }
      }
    } catch (error) {
      alert('Error upload image: ' + error.message);
    }
  };
  // ---------------------------------------------
  return (
    <Container>
      <Header
        // status='primary'
        title="Thông tin tài khoản"
        color={'#286FC3'}
        hideLeftIcon={false}
      />
      <Content scrollEnabled={true} safeAreaEnabled={true}>
        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        <Formik
          initialValues={formValues}
          onSubmit={onFormSubmit}
          // validationSchema={Schema}
        >
          {renderForm}
        </Formik>
      </Content>
      <WarningModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        status={'danger'}
        contentTitle={'Tên tài khoản: '}
        title={'Bạn có chắc chắn muốn xoá tài khoản'}
        content={user.userName}
      />
      <Modal
        animationType="slide"
        transparent={true}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <Card
          style={{
            width: Dimensions.get('window').width * 0.8,
            height: Dimensions.get('window').height * 0.25,
            alignItems: 'center',
            borderRadius: 15,
          }}
        >
          <Column space={8}>
            <Text
              style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
            >
              Ảnh người dùng
            </Text>
            <Row space={4}>
              <Pressable style={styles.pressable} onPress={uploadImage}>
                <Column style={{ alignItems: 'center' }}>
                  <Icon
                    name={'camera-outline'}
                    width={30}
                    height={30}
                    fill="#286FC3"
                  />
                  <Text style={{ fontSize: 12 }}>Camera</Text>
                </Column>
              </Pressable>
              <Pressable style={styles.pressable} onPress={pickImage}>
                <Column style={{ alignItems: 'center' }}>
                  <Icon
                    name={'image-outline'}
                    width={30}
                    height={30}
                    fill="#286FC3"
                  />
                  <Text style={{ fontSize: 12 }}>Thư viện</Text>
                </Column>
              </Pressable>
            </Row>
          </Column>
        </Card>
      </Modal>
    </Container>
  );
}
const styles = StyleSheet.create({
  pressable: {
    width: 70,
    height: 70,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
});
