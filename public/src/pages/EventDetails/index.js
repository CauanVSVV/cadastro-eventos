import { Header } from '../../components/Header'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import './styles.css'
import { CaretLeft } from 'phosphor-react'

export function EventDetails() {
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(!state) {
            navigate('/')
        }
    }, [])

    if(!state) {
        return <></>
    }

    return (
        <>
        <Header />
            <h1 className="titulo-detalhes-evento">Detalhes do evento</h1>

            <NavLink className="voltar" to="/">
                <CaretLeft size={24}/>
                Voltar para o inicio
            </NavLink>

            <div className="container-detalhes-evento">
                <img src={state.img} />

                <div>
                    <h2>Nome do evento</h2>
                    <p className="data-evento">Data do evento</p>

                    <p>Descrição</p>
                    <button>Editar evento</button>
                </div>
            </div>
        </>
    )
}