export default class FileUpload {
  fieldName: string;
  fileName: string;
  fileExtension: string;
  fileData: string;

  getExtension(fileName: string): string {
    return fileName.split('.').pop();
  }
  validBase64(value: string): string {
    return value.substr(value.indexOf(',') + 1);
  }
}
