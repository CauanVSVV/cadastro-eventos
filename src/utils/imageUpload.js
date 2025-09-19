// A chave da API é carregada a partir das variáveis de ambiente
// Verifique o arquivo .env na raiz do projeto
const IMGBB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

if (!IMGBB_API_KEY) {
  console.error('Erro: A chave da API do ImgBB não foi configurada corretamente.');
  console.info('Por favor, verifique se a variável REACT_APP_IMGBB_API_KEY está definida no arquivo .env');
}

// Tamanho máximo do arquivo em bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Tipos de arquivo permitidos
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function uploadImage(file) {
  if (!file) {
    console.error('Nenhum arquivo selecionado');
    throw new Error('Selecione um arquivo para enviar');
  }

  // Verifica o tipo do arquivo
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    const errorMsg = `Tipo de arquivo não suportado. Use: ${ALLOWED_FILE_TYPES.join(', ')}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Verifica o tamanho do arquivo
  if (file.size > MAX_FILE_SIZE) {
    const errorMsg = 'O arquivo é muito grande. Tamanho máximo: 5MB';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const formData = new FormData();
  formData.append('image', file);

  console.log('Enviando imagem para o ImgBB...');
  
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    console.log('Resposta recebida do ImgBB:', response);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta do ImgBB:', errorText);
      throw new Error(`Erro ao enviar imagem: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dados da resposta:', data);
    
    if (data && data.success && data.data && data.data.url) {
      console.log('Upload bem-sucedido. URL da imagem:', data.data.url);
      return data.data.url; // Retorna a URL da imagem enviada
    } else {
      const errorMsg = data?.error?.message || 'Não foi possível obter a URL da imagem da resposta da API';
      console.error('Falha no upload:', errorMsg, data);
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Falha na conexão com o servidor. Verifique sua conexão com a internet.');
    } else if (error.message.includes('API key')) {
      throw new Error('Chave de API inválida. Verifique sua chave do ImgBB.');
    } else {
      throw new Error(`Erro ao enviar imagem: ${error.message}`);
    }
  }
}
