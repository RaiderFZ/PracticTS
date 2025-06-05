import React, {useState} from 'react'

import './game.css'

type Board = string

const Game: React.FC = () => {
    const [board, setBoard] = useState<Board[]>(['','','','','','','','','']);

    const [currentPlayer, setCurrentPlayer] = useState('X');

    const handleClick = (index) => {
      
        if(board[index] === '') {
            setBoard(board.map(item => {
                if(item[index] === index) {
                    const newBoard = [...board];
                    newBoard[index] = currentPlayer;
                    setBoard(newBoard)
                }
                    return item;
            }))

            if(currentPlayer === 'X') {
                setCurrentPlayer('O')
            } else if(currentPlayer === 'O') {
                setCurrentPlayer('X')
            }
        } 
    }

    return (
        <div className="game-wrap">
            {board.map((cell, index) => (
                <button 
                    className="game-input" 
                    key={index}
                    onClick={() => handleClick(index)}
                >
                        {cell}
                </button>
            ))}
        </div>
    )
}

export default Game;