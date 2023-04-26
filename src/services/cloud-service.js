const { Storage } = require("@google-cloud/storage");
const Multer = require('multer');
const storage = new Storage({
  projectId: 'phd-j-384713',
  keyFilename: './src/services/phd-j-384713-d1d85984bee6.json',
});
const bucketName = "phdteste1";


exports.getImage = async(base64Image)=> {
  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    }
  });

  const fileName = `${Date.now()}-${'asd.png'}`;
  const file = storage.bucket(bucketName).file(fileName);
  const bufferImage = Buffer.from(base64Image, 'base64');
  const options = {
    metadata: {
      contentType: "image"
    }
    };
    await file.save(bufferImage, options);
}

