import { getDocumentAsync } from 'expo-document-picker';

import Alert from '@modules/Alert/Alert';
import TempSystem from '@modules/TempSystem/TempSystem';
import Toast from '@modules/Toast/Toast';

export default class DocumentPicker {
  static LIMIT_SIZE = 10;
  static DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];

  static ERROR_EXTENSION = 'Không hỗ trợ gửi tập tin với phần mở rộng *.{0}';
  static ERROR_LIMIT_SIZE = `Chỉ cho phép gửi tập tin dưới ${DocumentPicker.LIMIT_SIZE} Mb`;

  static async launchDocumentLibrary() {
    const options = {
      copyToCacheDirectory: true,
    };
    const result = await getDocumentAsync(options);
    if (result && result.assets) {
      const fileResult = result.assets[0];
      if (options.copyToCacheDirectory) {
        TempSystem.addCache(fileResult.uri);
      }
      return this.processDocumentPicked(fileResult);
    }
  }

  static async processDocumentPicked(file) {
    const fileExt = TempSystem.getExt(file.name);
    if (!TempSystem.checkExt(fileExt, DocumentPicker.DOCUMENT_EXTENSIONS)) {
      Alert.showAlert(DocumentPicker.ERROR_EXTENSION.replace('{0}', fileExt));
      return null;
    }

    if (!TempSystem.checkSize(file.size, DocumentPicker.LIMIT_SIZE)) {
      Toast.showText(DocumentPicker.ERROR_LIMIT_SIZE);
      return null;
    }

    return file;
  }
}
