// import * as ExpoPermissions from 'expo-permissions';
import Toast from '@modules/Toast/Toast';

export default class Permissions {
  static CAMERA_DENIED = 'Quyền mở máy ảnh không được cấp';
  static GALLERY_DENIED = 'Quyền truy cập thư viện ảnh không được cấp';
  static LOCATION_DENIED = 'Quyền truy cập vị trí không được cấp';

  static async registerTakePhotoPermission() {
    const cameraGranted = await this.registerCameraPermission();
    const cameraRollGranted = await this.registerCameraRollPermission();
    if (cameraGranted && cameraRollGranted) {
      return true;
    }
    return false;
  }

  static async registerPickImagePermission() {
    const cameraRollGranted = await this.registerCameraRollPermission();
    if (cameraRollGranted) {
      return true;
    }
    return false;
  }

  static async registerCameraPermission() {
    // let { status: cameraStatus } = await ExpoPermissions.getAsync(
    //   ExpoPermissions.CAMERA,
    // );
    // let finalStatus = cameraStatus;

    // if (cameraStatus !== ExpoPermissions.PermissionStatus.GRANTED) {
    //   let { status } = await ExpoPermissions.askAsync(ExpoPermissions.CAMERA);
    //   finalStatus = status;
    // }

    // if (finalStatus !== ExpoPermissions.PermissionStatus.GRANTED) {
    //   Toast.showText(Permissions.CAMERA_DENIED);
    //   return false;
    // }
    return true;
  }

  static async registerCameraRollPermission() {
    // let { status: cameraRollStatus } = await ExpoPermissions.getAsync(
    //   ExpoPermissions.CAMERA_ROLL,
    // );
    // let finalStatus = cameraRollStatus;

    // if (cameraRollStatus !== ExpoPermissions.PermissionStatus.GRANTED) {
    //   let { status } = await ExpoPermissions.askAsync(
    //     ExpoPermissions.CAMERA_ROLL,
    //   );
    //   finalStatus = status;
    // }

    // if (finalStatus !== ExpoPermissions.PermissionStatus.GRANTED) {
    //   Toast.showText(Permissions.GALLERY_DENIED);
    //   return false;
    // }
    return true;
  }

  static async registerLocationPermission() {
    // let { status: locationStatus } = await ExpoPermissions.getAsync(
    //   ExpoPermissions.LOCATION,
    // );
    // let finalStatus = locationStatus;

    // if (locationStatus !== ExpoPermissions.PermissionStatus.GRANTED) {
    //   let { status } = await ExpoPermissions.askAsync(ExpoPermissions.LOCATION);
    //   finalStatus = status;
    // }

    // if (finalStatus !== ExpoPermissions.PermissionStatus.GRANTED) {
    //   Toast.showText(Permissions.LOCATION_DENIED);
    //   return false;
    // }
    return true;
  }
}
