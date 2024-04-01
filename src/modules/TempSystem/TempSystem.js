import * as ExpoFileSystem from 'expo-file-system';

export default class TempSystem {
  static tempFiles = [];

  static async getInfo(fileUri) {
    return ExpoFileSystem.getInfoAsync(fileUri, { size: true });
  }

  static async checkSize(fileSize, limitSize) {
    if (fileSize > 0 && fileSize <= limitSize * 1024 * 1024) {
      return true;
    }
    return false;
  }

  static getExt(path) {
    const parts = path.split('.');
    const result = parts[parts.length - 1];
    return result ? result.toLowerCase() : '';
  }

  static checkExt(ext, whiteList) {
    if (whiteList.indexOf(ext) !== -1) {
      return true;
    }
    return false;
  }

  static getName(path) {
    const parts = path.split('/');
    const result = parts[parts.length - 1];
    return result ? result.toLowerCase() : '';
  }

  static async addCache(fileUri) {
    const foundIndex = this.tempFiles.indexOf(fileUri);
    if (foundIndex === -1) {
      this.tempFiles.push(fileUri);
    }
  }

  static async removeCache(fileUri) {
    const foundIndex = this.tempFiles.indexOf(fileUri);
    if (foundIndex !== -1) {
      this.tempFiles.splice(foundIndex, 1);
    }
  }

  static async clearCache() {
    const tasks = [];

    for (let i = 0, len = this.tempFiles.length; i < len; i += 1) {
      const fileUri = this.tempFiles[i];
      tasks.push(ExpoFileSystem.deleteAsync(fileUri, { idempotent: true }));
    }
    this.tempFiles = [];

    return Promise.all(tasks);
  }
}
