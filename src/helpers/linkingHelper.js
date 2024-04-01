import { Linking } from 'react-native';

import Toast from '@modules/Toast/Toast';

export async function callPhone(phone) {
  try {
    const uri = `tel:${phone}`;
    const supported = await Linking.canOpenURL(uri);
    if (supported) {
      Linking.openURL(uri);
    } else {
      Toast.showText('Thiết bị không thể gọi điện thoại');
    }
  } catch (error) {
    Toast.showText('Thực hiện gọi điện thoại không thành công');
  }
}
