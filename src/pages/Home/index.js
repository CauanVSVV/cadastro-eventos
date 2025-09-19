import './styles.css';
import { Header } from '../../components/Header';
import { EventCard } from '../../components/EventCard';
import { useState, useContext } from 'react';
import { formatDate } from '../../utils/formatDate';
import { uploadImage } from '../../utils/imageUpload';
import { EventTypeDisplay } from '../../components/EventTypeDisplay';
import { eventsTypes } from '../../data/events-type';
import { EventContext } from '../../contexts/EventContext';
import { useResponsiveItems } from '../../hooks/useResponsiveItems';

export function Home() {
  const { eventos, criarNovoEvento, apagarTudo } = useContext(EventContext)

  const [nome, setNome] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [descricao, setDescricao] = useState("")
  const [img, setImg] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleUploadIMG(e) {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setImg(imageUrl);
      } else {
        alert('Falha ao fazer upload da imagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleCriarEvento(e) {
    e.preventDefault();

    if (isUploading) {
      alert('Aguarde o upload da imagem ser concluído.');
      return;
    }

    if (!img) {
      alert('Por favor, selecione uma imagem para o evento.');
      return;
    }

    const novoEvento = {
      nome, 
      dataInicio: formatDate(dataInicio), 
      dataFinal: formatDate(dataFinal), 
      img,
      descricao
    };

    criarNovoEvento(novoEvento);
    setImg('');
    e.target.reset();
  }

  const itemsToShow = useResponsiveItems();
  const visibleEvents = eventsTypes.slice(0, itemsToShow);

  return (
    <>
      <Header />
      <h1 className='home-title'>Bem vindo ao site de eventos!</h1>

      <div className='events-types'>
        {visibleEvents.map(eventType => (
          <EventTypeDisplay 
            ativo={true}
            key={eventType.name}
            name={eventType.name}
            photo={eventType.photo}
          />
        ))}
      </div>

      <section className='container'>
        <form onSubmit={handleCriarEvento} className='container-form'>
          <div>
            <label htmlFor='nome'>Nome</label>
            <input 
              type='text' 
              id='nome' 
              onChange={(e) => setNome(e.target.value)} 
              />
          </div>
          <div>
            <label htmlFor='data'>Data Início</label>
            <input 
              type='datetime-local' 
              id='data_inicio' 
              onChange={(e) => { setDataInicio(e.target.value)}} 
              />
          </div>
          <div>
            <label htmlFor='data'>Data Final</label>
            <input 
              type='datetime-local' 
              id='data_final' 
              onChange={(e) => { setDataFinal(e.target.value)}} 
              />
          </div>
          <div>
            <label htmlFor='descricao'>Descrição</label>
            <input 
              type='text' 
              id='descricao' 
              onChange={(e) => { setDescricao(e.target.value)}} 
            />
          </div>
          <div className='label-imagem'>
            <label htmlFor='imagem'>Selecione a imagem do evento</label>
            <input onChange={handleUploadIMG} type='file' id='imagem' />
          </div>
          
          <div className='preview-imagem'>
            {isUploading ? (
              <div>Enviando imagem...</div>
            ) : (
              <img 
                style={{ display: img ? 'block' : 'none' }} 
                src={img} 
                alt='preview da imagem do evento' 
              />
            )}
          </div>

          <button>Cadastrar evento</button>
        </form>

        <div className='container-eventos'>

          {eventos.map(evento => {
            return (
              <EventCard 
                key={evento.id}
                id={evento.id}
                nome={evento.nome}
                dataInicio={evento.dataInicio}
                dataFinal={evento.dataFinal}
                descricao={evento.descricao} //mudei aqui
                img={evento.img}
              />
            )
          })}

        </div>
      </section>
    </>
  );
}

/* export App; */
