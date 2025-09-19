import "./styles.css";
import { PencilCircle, Trash } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";

export function EventCard({ img, id, nome, dataInicio, dataFinal, descricao }) {
  const { deletarEvento } = useContext(EventContext);
  const navigate = useNavigate();

  function navegarParaDetalhes() {
    navigate(`/eventos/${id}`);
  }

  return (
    <div className="card-evento">
      <img src={img} alt="" />

      <div className="infos-evento">
        <div className="conteudo-card">
          <div>
            <h2>{nome}</h2>
            <p>{descricao}</p>

          </div>

            <div className="datas">
              <p>
                <strong>Início:</strong> {dataInicio}
              </p>
              <p>
                <strong>Final:</strong> {dataFinal}
              </p>
            </div>
          <div className="botoes-card">
            <p><strong>Ações:</strong></p>
            <div className="botoes-acoes">
              <button className="botao-acoes" onClick={() => deletarEvento(id)}>
                <Trash size={24} />
              </button>
              <button className="botao-acoes">
                <PencilCircle size={24} />
              </button>
            </div>
          </div>
          <button className="botao-detalhes" onClick={navegarParaDetalhes}>
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
