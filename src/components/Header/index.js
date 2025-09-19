import "./styles.css"
import eventLogo from "../../assets/evento.png"

export function Header() {
    return (
        <header className="header-app">
            <div>
                <h1>Eventos</h1>
                <img src={eventLogo} />
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="#">Meus eventos</a>
                    </li>
                    <li>
                        <a href="#">Acesse sua conta</a>
                    </li>
                    <li>
                        <a href="#">Cadastrar</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}