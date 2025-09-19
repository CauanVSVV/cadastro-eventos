import "./styles.css";
import { Header } from "../../components/Header";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CaretLeft } from "phosphor-react";
import { EventContext } from "../../contexts/EventContext";
import { formatDate } from "../../utils/formatDate";

export function EventDetails() {
  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState("");

  function handleUploadIMG(e) {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setImg(reader.result);
  }

  const navigate = useNavigate();
  const { eventos, editarEvento } = useContext(EventContext);
  const { id } = useParams();

  const evento = eventos.find((evento) => evento.id === Number(id));

  function handleEditarEvento(e) {
    e.preventDefault();

    const eventoAtualizado = {
      id,
      nome,
      dataInicio: formatDate(dataInicio),
      dataFinal: formatDate(dataFinal),
      img,
      descricao,
    };

    editarEvento(eventoAtualizado);
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
          <div className="label-imagem">
            <label htmlFor="imagem">Selecione a imagem do evento</label>
            <input onChange={handleUploadIMG} type="file" id="imagem" />
          </div>

          <div className="preview-imagem">
            <img
              style={{ display: img ? "block" : "none" }}
              src={img}
              alt="preview da imagem do evento"
            />
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
