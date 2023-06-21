import './GameOver.css'

export default function GameOver({resetar, pontuacao}){
    return(
        <div>
            <h1>Fim de Jogo!</h1>
            <h2>Sua pontuação foi <span>{pontuacao}</span></h2>
            <button onClick={resetar}>Jogar de novo</button>
        </div>
    )
}