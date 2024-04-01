import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import {
  ImagePickerAsset,
  MediaTypeOptions,
  PermissionStatus,
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';

import Alert from '@modules/Alert/Alert';
import TempSystem from '@modules/TempSystem/TempSystem';
import Toast from '@modules/Toast/Toast';

export default class ImagePicker {
  static LIMIT_SIZE = 10;
  static IMAGE_EXTENSIONS = ['bmp', 'png', 'jpg', 'jpeg'];

  static ERROR_EXISTS = 'Không thể xử lý được ảnh này';
  static ERROR_EXTENSION = 'Không hỗ trợ gửi ảnh với phần mở rộng *.{0}';
  static ERROR_LIMIT_SIZE = `Chỉ cho phép gửi ảnh dưới ${ImagePicker.LIMIT_SIZE} Mb`;

  static ERROR_CAMERA_DENIED = 'Quyền mở máy ảnh không được cấp';
  static ERROR_MEDIA_LIBRARY_DENIED =
    'Quyền truy cập thư viện ảnh không được cấp';

  static async launchCamera() {
    const granted = await this.requestCameraPermission();
    if (granted) {
      const result = await launchCameraAsync();
      if (result && result.assets) {
        const fileResult = result.assets[0];
        TempSystem.addCache(fileResult.uri);
        return this.processImagePicked(fileResult.uri);
      }
    }
  }

  static async launchImageLibrary() {
    const granted = await this.requestMediaLibraryPermission();
    if (granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
      });
      if (result && result.assets) {
        const fileResult = result.assets[0];
        TempSystem.addCache(fileResult.uri);
        return this.processImagePicked(fileResult.uri);
      }
    }
  }

  static async launchVideoLibrary() {
    const granted = await this.requestMediaLibraryPermission();
    if (granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Videos,
      });
      if (result && result.assets) {
        const fileResult = result.assets[0];
        return this.processVideoPicked(fileResult.uri);
      }
    }
  }

  static async requestCameraPermission() {
    let { status } = await getCameraPermissionsAsync();
    let finalStatus = status;
    if (status !== PermissionStatus.GRANTED) {
      let { status } = await requestCameraPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== PermissionStatus.GRANTED) {
      Toast.showText(ImagePicker.ERROR_CAMERA_DENIED);
      return false;
    }
    return true;
  }

  static async requestMediaLibraryPermission() {
    let { status } = await getMediaLibraryPermissionsAsync();
    let finalStatus = status;
    if (status !== PermissionStatus.GRANTED) {
      let { status } = await requestMediaLibraryPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== PermissionStatus.GRANTED) {
      Toast.showText(ImagePicker.ERROR_MEDIA_LIBRARY_DENIED);
      return false;
    }
    return true;
  }

  static async processImagePicked(fileUri) {
    const fileExt = TempSystem.getExt(fileUri);
    if (!TempSystem.checkExt(fileExt, ImagePicker.IMAGE_EXTENSIONS)) {
      Alert.showAlert(ImagePicker.ERROR_EXTENSION.replace('{0}', fileExt));
      return null;
    }

    const fileInfo = await TempSystem.getInfo(fileUri);
    if (!fileInfo || !fileInfo.exists) {
      Toast.showText(ImagePicker.ERROR_EXISTS);
      return null;
    }

    if (!TempSystem.checkSize(fileInfo.size, ImagePicker.LIMIT_SIZE)) {
      const manipResult = await manipulateAsync(fileUri, [], {
        format: SaveFormat.JPEG,
        compress: 0.5,
      });
      if (manipResult && manipResult.uri) {
        TempSystem.addCache(manipResult.uri);

        const manipInfo = await TempSystem.getInfo(manipResult.uri);
        if (!TempSystem.checkSize(manipInfo.size, ImagePicker.LIMIT_SIZE)) {
          Toast.showText(ImagePicker.ERROR_LIMIT_SIZE);
          return null;
        }
        return manipResult.uri;
      }

      Toast.showText(ImagePicker.ERROR_LIMIT_SIZE);
      return null;
    }

    return fileUri;
  }

  static async processVideoPicked(fileUri) {
    const fileInfo = await TempSystem.getInfo(fileUri);
    if (!fileInfo || !fileInfo.exists) {
      Toast.showText(ImagePicker.ERROR_EXISTS);
      return null;
    }

    return fileUri;
  }
}
