const getPresignedUrl = async (fileName: string, fileType: string) => {
  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}` || "https://15.229.249.202";

  try {
    const response = await fetch(`${backendUrl}/generate-presigned-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, fileType }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Erro na resposta do servidor (status != 200):', text);
      throw new Error(`Erro ao obter URL: status ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const html = await response.text();
      console.error('❌ Resposta não é JSON. Conteúdo recebido:', html);
      throw new Error('Resposta do servidor não é JSON válido.');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('❌ Erro no getPresignedUrl:', error);
    throw error;
  }
};

const uploadFile = async (file: File, fileName: string) => {
  try {
    const presignedUrl = await getPresignedUrl(fileName, file.type);

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!uploadResponse.ok) {
      console.error('❌ Falha ao enviar para o S3:', await uploadResponse.text());
      throw new Error(`Erro ao enviar arquivo para o S3. Status: ${uploadResponse.status}`);
    }

    return presignedUrl.split('?')[0]; // URL pública final
  } catch (error) {
    console.error('❌ Erro no uploadFile:', error);
    throw error;
  }
};

export default { uploadFile };
