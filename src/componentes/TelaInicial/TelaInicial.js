import './TelaInicial.css'

const TelaInicial = ( {iniciarPartida} ) => {
  return (
    <div className='start'>
        <h1>Roda-Roda</h1>
        <p>Clique no botão para iniciar o jogo!</p>
        <button onClick={iniciarPartida}>Começar</button>
    </div>
  )
}

export default TelaInicial