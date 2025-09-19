import "./styles.css"
import eventLogo from "../../assets/evento.png"

export function Header() {
    return (
        <header className="header-app">
            <div>
                <h1>Eventos</h1>
                <img src={eventLogo} />
            </div>
        </header>
    )
}