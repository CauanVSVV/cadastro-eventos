import "./styles.css"
import { PencilCircle, Trash } from "phosphor-react"
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { EventContext } from "../../contexts/EventContext"

export function EventCard({img, id, nome, dataInicio, dataFinal, descricao}) {
    const { deletarEvento } = useContext(EventContext)
    const navigate = useNavigate()
    
    function navegarParaDetalhes() {
        navigate(`/eventos/${id}`)
    }
    
    return (
        <div className='card-evento'>
            <img src={img} alt='' />

            <div className='infos-evento'>
                <div>
                    <h2>{nome}</h2>
                    <p>{descricao}</p> 

                    <button onClick={navegarParaDetalhes}>Ver detalhes</button>

                    <p>Início: {dataInicio}</p>
                    <p>Final: {dataFinal}</p>
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