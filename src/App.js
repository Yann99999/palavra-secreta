import './App.css'

import TelaInicial from './componentes/TelaInicial/TelaInicial'
import Jogo from './componentes/Jogo/Jogo'
import GameOver from './componentes/GameOver/GameOver'

import { useCallback, useEffect, useState } from 'react';

import { listaDePalavras } from './data/words'

const fases = [
  {id: 1, name: 'inicio'},
  {id: 2, name: 'meio'},
  {id: 3, name: 'fim'} 
]
function App() {
  const [faseJogo, setFaseJogo] = useState(fases[0].name)

  const [palavras] = useState(listaDePalavras)
  const [palavraEscolhida, setPalavraEscolhida] = useState('')
  const [categoriaEscolhida, setCategoriaEscolhida] = useState('')
  const [letras, setLetras] = useState([])

  const [letrasCertas, setLetrasCertas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [tentativas, setTentativas] = useState(5)
  const [pontuacao, setPontuacao] = useState(0)

  //checar condição de derrota
  useEffect(()=>{
    if(tentativas <= 0){
      //resetar tudo e voltar para o inicio
      limparEstadosLetras()
      setFaseJogo(fases[2].name)
    }
  }, [tentativas])

  //checar condição de vitoria
  useEffect(()=>{
    const letrasUnicas = [...new Set(letras)]
    
    // condicao de vitoria
    if(letrasCertas.length === letrasUnicas.length){
      setPontuacao(pontuacao + 100)
      iniciarPartida()
    }
  }, [letrasCertas, letras])

  const limparEstadosLetras = () => {
    setLetrasCertas([])
    setLetrasErradas([])
  }

  const escolherPalavraECategoria = useCallback(() => {
    const categorias = Object.keys(palavras)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]

    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)]

    return {palavra, categoria}
  }, [palavras])


  const iniciarPartida = useCallback(() => {
    limparEstadosLetras()
    const {palavra, categoria} = escolherPalavraECategoria()

    let letrasSeparadas = palavra.split("")
    letrasSeparadas = letrasSeparadas.map((letra)=>letra.toLowerCase())

    setPalavraEscolhida(palavra)
    setCategoriaEscolhida(categoria)
    setLetras(letrasSeparadas)
    
    setFaseJogo(fases[1].name)
  }, [escolherPalavraECategoria])

  const verificarLetra = (letra) => {
    const letraFormatada = letra.toLowerCase()

    //checa se a letra já foi usada
    if(letrasCertas.includes(letraFormatada) || letrasErradas.includes(letraFormatada)){
      return;
    }

    if(letras.includes(letraFormatada)){
      setLetrasCertas((verdadeirasLetrasCertas)=>[
        ...verdadeirasLetrasCertas,
        letraFormatada,
      ])
    }else{
      setLetrasErradas((verdadeirasLetrasErradas)=>[
        ...verdadeirasLetrasErradas,
        letraFormatada,
      ])

      setTentativas(tentativas - 1)
    }
  }

  const resetar = () => {
    setPontuacao(0)
    setTentativas(5)
    setFaseJogo(fases[0].name)
  }


  return (
    <div className="App">
      {faseJogo === 'inicio' && <TelaInicial iniciarPartida={iniciarPartida}/>}

      {faseJogo === 'meio' &&
       <Jogo verificarLetra={verificarLetra}
            palavraEscolhida={palavraEscolhida}
            categoriaEscolhida={categoriaEscolhida}
            letras={letras}
            letrasCertas={letrasCertas}
            letrasErradas={letrasErradas}
            tentativas={tentativas}
            pontuacao={pontuacao}
      />}

      {faseJogo === 'fim' && 
      <GameOver resetar={resetar}
      pontuacao={pontuacao}/>}
    </div>
  );
}

export default App;
