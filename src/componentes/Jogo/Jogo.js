import { useState, useRef } from 'react'
import './Jogo.css'

export default function Jogo({ verificarLetra, palavraEscolhida, categoriaEscolhida, letras, letrasCertas, letrasErradas, tentativas, pontuacao }) {
    const [letra, setLetra] = useState('')
    const letraInputRef = useRef(null)

    const handleEnviar = (e) => {
        e.preventDefault()

        verificarLetra(letra)

        setLetra('')
        letraInputRef.current.focus();
        
    }
    return (
        <div className="jogo">
            <div className="pontos">
                <span>Pontuação: </span>
                <span>{pontuacao}</span>
            </div>
            <h2>Descubra a palavra</h2>
            <h3 className="dica">
                Dica: <span>{categoriaEscolhida}</span>
            </h3>
            <p>Você ainda tem {tentativas} tentativas restantes</p>
            <div className="palavraContainer">
                {letras.map((letra, index) => {
                    return(
                        letrasCertas.includes(letra) ? (
                            <span key={index} className='letra' >{letra}</span>
                        ) : (
                            <span key={index} className="quadradoBranco"></span>
                        )
                    )
                })}
            </div>

            <div className="letraContainer">
                <p>Escolha uma letra:</p>
                <form onSubmit={handleEnviar}>
                    <input type="text" name="letra" maxLength="1" required 
                    value={letra} onChange={((e) => {setLetra(e.target.value)})}
                    ref={letraInputRef}/>

                    <button>Verificar</button>
                </form>
            </div>

            <div className="letrasErradasContainer">
                <p>Letras usadas:</p>
                {letrasErradas.map((letra, index)=>{
                    return(
                        <span key={index}>{letra}, </span>
                    )
                })}
            </div>

        </div>
    )
}
