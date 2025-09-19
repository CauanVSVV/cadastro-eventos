export function formatDate(data) {
    let formattedDate = new Date(data).toLocaleDateString('pt-br', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })

    //'quarta-feira, 05/07/23, 11:01'
    //Paga a primeira letra da string e aumenta para maiusculo
    let upperLetter = formattedDate.substring(0, 1).toUpperCase() 
    //Q

    //pega o resto da string que sobrou para pode juntar com a letra maiuscula
    let stringRest = formattedDate.substring(1)
    //'uarta-feira, 05/07/23, 11:01'

    //junta a letra maiuscula com o resto da string
    formattedDate = upperLetter + stringRest
    //"Q" + "uarta-feira, 05/07/23, 11:01"

    return formattedDate
}