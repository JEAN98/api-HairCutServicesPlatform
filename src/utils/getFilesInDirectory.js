const fs = require('fs');

class FileData {
    constructor(nameReduced,fileName) {
      this.nameReduced = nameReduced;
      this.fileName = fileName;
    }
  }

exports.getFilesName = (path) => {
    let fileDataList = [];
    fs.readdirSync(path).forEach(function (fileName) {
        var nameReduced = fileName.split('\.')[0];
        fileDataList.push(new FileData(nameReduced,fileName));
    });
    return fileDataList;
}