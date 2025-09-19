import "./styles.css";
import { Header } from "../../components/Header";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CaretLeft } from "phosphor-react";
import { EventContext } from "../../contexts/EventContext";
import { formatDate } from '../../utils/formatDate';
import { uploadImage } from '../../utils/imageUpload';

export function EventDetails() {
  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState(null);

  // Cria uma URL de pré-visualização para a imagem selecionada
  function handleImageSelect(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validação do tipo de arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Tipo de arquivo não suportado. Use: JPEG, PNG, GIF ou WebP');
      e.target.value = '';
      return;
    }

    // Validação do tamanho do arquivo (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('Arquivo muito grande. Tamanho máximo permitido: 5MB');
      e.target.value = '';
      return;
    }

    // Cria uma URL temporária para pré-visualização
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileUrl);
    setFile(selectedFile);
    
    // Inicia o upload
    handleUploadIMG(selectedFile);
  }

  async function handleUploadIMG(file) {
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setImg(imageUrl);
      // Remove a pré-visualização temporária
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      // Remove a pré-visualização em caso de erro
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      
      // Mensagens de erro mais amigáveis
      let errorMessage = 'Erro ao fazer upload da imagem. Tente novamente.';
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
      } else if (error.message.includes('API key')) {
        errorMessage = 'Erro de configuração. Por favor, tente novamente mais tarde.';
      } else if (error.message.includes('Tipo de arquivo não suportado')) {
        errorMessage = 'Tipo de arquivo não suportado. Use: JPEG, PNG, GIF ou WebP';
      } else if (error.message.includes('muito grande')) {
        errorMessage = 'Arquivo muito grande. Tamanho máximo permitido: 5MB';
      }
      
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }

  const navigate = useNavigate();
  const { eventos, editarEvento } = useContext(EventContext);
  const { id } = useParams();

  const evento = eventos.find((evento) => evento.id === Number(id));

  async function handleEditarEvento(e) {
    e.preventDefault();
    
    if (isUploading) {
      alert('Aguarde o upload da imagem ser concluído.');
      return;
    }

    try {
      const eventoAtualizado = {
        id,
        nome,
        dataInicio: formatDate(dataInicio),
        dataFinal: formatDate(dataFinal),
        img: img || evento.img, // Keep the existing image if no new one was uploaded
        descricao,
      };

      editarEvento(eventoAtualizado);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Erro ao atualizar o evento. Tente novamente.');
    }
  }

  useEffect(() => {
    if (!evento) {
      navigate("/");
    }
  }, []);

  if (!evento) {
    return <></>;
  }

  return (
    <section className="container-detalhes">
      <Header />
      <NavLink className="voltar" to="/">
        <CaretLeft size={24} />
        Voltar para o início
      </NavLink>

      <h1 className="titulo-detalhes-evento">Detalhes do evento</h1>

      <div className="container-detalhes-itens">
        <form
          onSubmit={handleEditarEvento}
          className="container-detalhes-formulario"
        >
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="data">Data Início</label>
            <input
              type="datetime-local"
              id="data_inicio"
              onChange={(e) => {
                setDataInicio(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="data">Data Final</label>
            <input
              type="datetime-local"
              id="data_final"
              onChange={(e) => {
                setDataFinal(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              onChange={(e) => {
                setDescricao(e.target.value);
              }}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="file"
              id="image"
              accept="image/jpeg, image/png, image/gif, image/webp"
              onChange={handleImageSelect}
              disabled={isUploading}
            />
            <label htmlFor="image">
              {isUploading ? 'Enviando...' : 'Escolher Imagem'}
            </label>
            {file && !isUploading && <span className="file-name">{file.name}</span>}
            
            {/* Pré-visualização da imagem */}
            {previewUrl && !img && (
              <div className="image-preview">
                <p>Pré-visualização:</p>
                <img 
                  src={previewUrl} 
                  alt="Pré-visualização" 
                  style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
                />
              </div>
            )}
            
            {/* Imagem já enviada */}
            {img && (
              <div className="uploaded-image">
                <p>Imagem enviada com sucesso!</p>
                <img 
                  src={img} 
                  alt="Imagem do evento" 
                  style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
                />
              </div>
            )}
            
            <p className="file-info">Formatos suportados: JPG, PNG, GIF, WebP (máx. 5MB)</p>
          </div>

          <button>Atualizar evento</button>
        </form>

        <div className="container-detalhes-evento">
          <img src={evento.img} alt={evento.nome} className="evento-imagem" />

          <div className="detalhes-conteudo">
            <h2>{evento.nome}</h2>
            <p className="data-evento">
              <strong>Início:</strong> {evento.dataInicio}
            </p>
            <p className="data-evento">
              <strong>Final:</strong> {evento.dataFinal}
            </p>
            <p className="descricao-evento">{evento.descricao}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
