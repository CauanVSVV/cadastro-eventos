import { EventContainer } from './styles'

export function EventTypeDisplay(props) {
    return (
        <EventContainer colorText="#ccc" ativo={props.ativo}>
            <img src={props.photo} />
           <strong>{props.name}</strong>
        </EventContainer>
    )
}