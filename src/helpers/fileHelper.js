import { getFilePreview } from '@services/getFileService';

export function generateUID(index = 0) {
  const timestamp = Date.now();
  return `__${timestamp}_${index}__`;
}

export function convertFiles(files, type = 'file', options = {}) {
  if (!files) return [];
  const newFiles = [];
  const _getUID = options.getUID || getUID;
  const _getFileUri = options.getFileUri || getFileUri;
  files.forEach((file, index) => {
    if (!file) return;
    const uid = _getUID(file, index);
    const fileUri = _getFileUri(file);
    const fileName = file?.name || getFileName(fileUri);
    const newFile = {
      uid,
      type,
      uri: fileUri,
      name: fileName,
      local: file.local || false,
    };
    newFiles.push(newFile);
  });
  return newFiles;
}

export function convertImages(images, options) {
  return convertFiles(images, 'image', options);
}

export function convertVideos(videos, options) {
  return convertFiles(videos, 'video', options);
}

export function getUID(file, index = 0) {
  return file?._id || file?.uid || generateUID(index);
}

export function getFileUri(file) {
  if (typeof file === 'object') {
    if (file.uri || file.file) return file.uri || file.file;
    if (file.url && /(http(s?)):\/\//i.test(file.url)) return file.url;
    return getFilePreview(file.url || file._id);
  }
  return file;
}

/**
 * @param fileSize Size of file (bytes)
 * @param limitSize Limited file size (Mb)
 */
export function checkFileSize(fileSize, limitSize) {
  if (fileSize > 0 && fileSize <= limitSize * 1024 * 1024) {
    return true;
  }
  return false;
}

export function checkFileType(fileUri, supportTypes) {
  const fileType = getFileType(fileUri);
  if (fileType && supportTypes.includes(fileType)) {
    return true;
  }
  return false;
}

export function isFileImage(fileUri) {
  const imageTypes = ['bmp', 'png', 'jpg', 'jpeg'];
  return checkFileType(fileUri, imageTypes);
}

export function isFileDocument(fileUri) {
  const documentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
  return checkFileType(fileUri, documentTypes);
}

export function getFileType(fileUri, lowerCase = true) {
  const parts = fileUri.split('.');
  const result = parts[parts.length - 1];
  return lowerCase ? result.toLowerCase() : result;
}

export function getFileName(fileUri, lowerCase = true) {
  const parts = fileUri.split('/');
  const result = parts[parts.length - 1];
  return lowerCase ? result.toLowerCase() : result;
}

export function getFileDetail(fileUri) {
  const fileName = getFileName(fileUri);
  const fileType = getFileType(fileUri);

  return { fileName, fileType };
}

export function formatToFriendly(str) {
  if (!str) return '';
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/[^a-zA-Z0-9 ]/g, '');
  str = str.replace(/\s+/g, '_');
  return str;
}
