import styled from 'styled-components'

export const EventContainer  = styled.div` 
text-align: center;
font-size: 1.2rem;
max-width: 8rem;
width: 20%;   

img {
    width: 100%;
    border-radius: 50%;
}

color:${(props)=>props.ativo ?props.theme.blue: props.theme.cinza}
`