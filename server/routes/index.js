const express = require('express');
const router = express.Router();
const multer = require('multer');
const s3 = require('../aws/aws-config');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const { userId } = req.body; 
  if (!file || !userId) {
    return res.status(400).json({ error: 'Arquivo ou ID do usuário ausente' });
  }

  const params = {
    Bucket: 'aumeow-images',
    Key: `imagensPerfil/${userId}/imagemDono`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    res.status(200).json({ url: data.Location });
  } catch (err) {
    console.error('Erro ao fazer upload para o S3:', err);
    res.status(500).json({ error: 'Erro no upload' });
  }
});

module.exports = router;
