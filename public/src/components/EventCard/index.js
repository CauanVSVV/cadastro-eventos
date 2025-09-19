import { PencilCircle, Trash } from "phosphor-react"
import { useNavigate } from "react-router-dom";
import "./styles.css"

export function EventCard({img, id, nome, data, deletarEvento, descricao}) {
    const navigate = useNavigate()

    function navegarParaDetalhes() {
        navigate(`/eventos/${id}`, {
            state: {
                nome,
                img,
                data,
                descricao,
                id
            }
        })
    }

    if(!img || !data || !nome) {
        return;
    }

    return (
        <div className='card-evento'>
            <img src={img} />

            <div className='infos-evento'>
                <div>
                    <h2>{nome}</h2>
                    <p>{descricao}</p> 
                    <button onClick={navegarParaDetalhes}>Ver detalhes</button> 
                    <p>{data}</p>
                </div>

                <div>
                    <button onClick={() => deletarEvento(id)}>
                        <Trash size={24} />
                    </button>
                    <button>
                        <PencilCircle size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}