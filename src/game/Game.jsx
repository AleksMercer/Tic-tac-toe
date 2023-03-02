import React, { useState } from 'react'
import '../style.css';

import { calculateWinner } from '../components/Winner'
import Counter from '../components/ScoreCounter'
import Board from '../components/Board'

function Game() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [xturn, setXturn] = useState(true)
  const winner = calculateWinner(board)
  

  const handleClick = (index) => {

    const cloneBoard = [...board]

    if( cloneBoard[index] || winner[0] ) return

    cloneBoard[index] = xturn ? 'x' : 'o'

    setBoard(cloneBoard)
    setXturn(!xturn)
  }
  
  const newGame = () => {

    return (
      <button onClick={ 
        () => { 
          setBoard(Array(9).fill(null)); 
          setXturn(true) 
        }
      }>
        New game
      </button>
    )
  }

  const resetScore = () => {  
  
    return (
      <button onClick={ 
        () => { 
          localStorage.setItem('playersScores', JSON.stringify([0, 0]) ); 
          setBoard(Array(9).fill(null)); 
          setXturn(true) 
        }
      }>
        Reset Score
      </button>
    )
  }

  const winAndTurn = () => {

    if (winner[0] !== null) {
      return 'Winner : ' + winner[0]

    } else if (!board.includes(null)) {
      return 'Draw!'

    } else {
      return 'Next turn : ' + (xturn ? 'x' : 'o')
    }
  }

  return (
    
    <div className='game'>

      <div className="game__score">

        <h2 className='winAndTurn'> { winAndTurn() } </h2>
        
        <div className='scoreCounter'>
            <p> <span className='xo'>x</span> : <Counter winner={winner} player='x' playerNum={0} /></p>
            <p> <span className='xo'>o</span> : <Counter winner={winner} player='o' playerNum={1} /></p>
        </div>
      </div>

      <Board squares={ board } click={ handleClick } winArray={ winner[1] }/> {/* returns 'div' with 9 squares-'button' */}
      
      <div className="game__buttons">
        { newGame() }
        { resetScore() }
      </div>
    </div>
  )
}

export default Game