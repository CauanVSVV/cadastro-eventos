import { EventContainer } from './styles'
import './styles.css'

export function EventTypeDisplay(props) {
    return (
        <EventContainer colorText="#ccc" ativo={props.ativo}>
            <img src={props.photo} />
            <p>{props.name}</p>
        </EventContainer>
    )
}