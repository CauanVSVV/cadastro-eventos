import { createContext, useEffect, useState } from "react";

const eventosEstaticos = [
    {
      id: 1,
      nome: "Protesto pelas férias de três meses",
      dataInicio: "SEX, 31/12/12",
      img: "https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/desenvolvimento/foto%20divulga%C3%A7%C3%A3o%20lollapalooza.jpg"
    },
    {
      id: 2,
      nome: "Reforço em API Javascript",
      dataInicio: "QUI, 06/07/2023",
      img: "https://media.starlightcms.io/workspaces/pague-menos/portal-sempre-bem/optimized/istock-1227545308-ya8rnoqcq7.jpeg"
    },
    {
      id: 3,
      nome: "São Jõao",
      dataInicio: "SEX, 23/06/2023",
      img: "https://media.starlightcms.io/workspaces/pague-menos/portal-sempre-bem/optimized/istock-1227545308-ya8rnoqcq7.jpeg"
    },
  ]

export const EventContext = createContext({})

/* 
    O nome da função é apenas para 
    indicar que ela vai retornar o provedor do contexto de eventos 
*/
export function EventContextProvider({ children }) {
    const state = JSON.parse(localStorage.getItem('eventos:1.0')) //json

    const [eventos, setEventos] = useState(state ?? eventosEstaticos)

    function criarNovoEvento(dadosEvento) {
        const id = eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1
    
        const novoEvento = {
          id,
          ...dadosEvento
        }
    
        setEventos([...eventos, novoEvento])    
      }

    function editarEvento(dadosEvento) {
      const eventosAtualizados = eventos.map(evento => {
        if(evento.id === Number(dadosEvento.id)) {

          return {
            id: evento.id,
            nome: dadosEvento.nome ? dadosEvento.nome : evento.nome,
            descricao: dadosEvento.descricao ? dadosEvento.descricao : evento.descricao,
            dataInicio: dadosEvento.dataInicio ? dadosEvento.dataInicio : evento.dataInicio,
            dataFinal: dadosEvento.dataFinal ? dadosEvento.dataFinal : evento.dataFinal,
            img: dadosEvento.img ? dadosEvento.img : evento.img
          }
        }

        return evento 
        /* 
          Lembrando que a função map precisa retornar algum valor para cada elemento
          do array, senão, ele retorna undefined como valor do array. 
          os eventos que eu não quero editar estão sendo 
          retornados inalterados 
        */
      })

      setEventos(eventosAtualizados)
    }

    function deletarEvento(id) {
      let confirmar = window.confirm("Tem certeza de que deseja excluir o evento?")
  
      if(confirmar) {
        const eventosAtualizados = eventos.filter(evento => evento.id !== id)
  
        setEventos(eventosAtualizados)
      }
  
    }
    
    function apagarTudo() {
      if(window.confirm("Tem certeza disso?")) {
          setEventos([])
      }
    }
    
    useEffect(() => {
      localStorage.setItem('eventos:1.0', JSON.stringify(eventos))
    }, [eventos])

    return (
        <EventContext.Provider value={{
            eventos,
            criarNovoEvento,
            deletarEvento,
            apagarTudo,
            editarEvento
        }}>
            { children }
        </EventContext.Provider>
    )
}

/* 
<EventContextProvider>
    <App />
 </EventContextProvider>
*/