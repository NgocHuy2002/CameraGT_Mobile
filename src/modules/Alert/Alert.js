import { BackHandler, Alert as RNAlert } from 'react-native';

export default class Alert {
  static DIALOG_TITLE = 'Thông báo';
  static CONFIRM_TITLE = 'Xác nhận';

  static OK_TEXT = 'Đồng ý';
  static CANCEL_TEXT = 'Hủy';

  /**
   * Show alert application exit
   * @param {string} message
   */
  static alertExit(message) {
    this.showTitle(Alert.DIALOG_TITLE, message, BackHandler.exitApp);
  }

  /**
   * Show confirm application exit
   * @param {string}   message
   * @param {function} handleCancel
   */
  static confirmExit(message, handleCancel) {
    this.showConfirmTitle(
      Alert.CONFIRM_TITLE,
      message,
      BackHandler.exitApp,
      handleCancel,
    );
  }

  /**
   * @param {string}   message
   * @param {function} handlePress
   */
  static showAlert(message, handlePress) {
    this.showTitle(Alert.DIALOG_TITLE, message, handlePress);
  }

  /**
   * @param {string}   title
   * @param {string}   message
   * @param {function} handlePress
   * @param {boolean}  cancelable
   */
  static showTitle(title, message, handlePress, cancelable = false) {
    this.alert(title, message, [{ text: 'Đồng ý', onPress: handlePress }], {
      cancelable: cancelable,
    });
  }

  /**
   * @param {string}   message
   * @param {function} handlePress
   * @param {function} handleCancel
   */
  static showConfirm(message, handlePress, handleCancel) {
    this.showConfirmTitle(
      Alert.DIALOG_TITLE,
      message,
      handlePress,
      handleCancel,
    );
  }

  /**
   * @param {string}   title
   * @param {string}   message
   * @param {function} handlePress
   * @param {function} handleCancel
   * @param {boolean}  cancelable
   */
  static showConfirmTitle(
    title,
    message,
    handlePress,
    handleCancel,
    cancelable = false,
  ) {
    this.alert(
      title,
      message,
      [
        { text: Alert.CANCEL_TEXT, onPress: handleCancel },
        { text: Alert.OK_TEXT, onPress: handlePress },
      ],
      { cancelable: cancelable },
    );
  }

  /**
   * @param {string} title
   * @param {string} message
   * @param {array}  buttons
   * @param {object} options
   */
  static alert(title, message, buttons, options) {
    RNAlert.alert(title, message, buttons, options);
  }
}
