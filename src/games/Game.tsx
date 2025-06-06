import React, {useState} from 'react'

import './game.css'

interface GameState {
    board: Cell[];
    currentPlayer: 'X' | "O";
    winner: Cell | null | 'Ничья',
    WinnerCells: number[],
}

type WinCell = Cell | null | 'Ничья';
type Cell = '' | 'X' | 'O';

const Combination: readonly number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const Game: React.FC = () => {
    const [game, setGame] = useState<GameState>({
        board: Array(9).fill(''),
        currentPlayer: 'X',
        winner: null,
        WinnerCells: [],
    });

    const checkWinner = (board: Cell[]): { winner: Cell, cells: number[] } | null  => {
        for(const combo of Combination) {
            const [a, b, c] = combo;
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], cells: [a, b, c] };
            }
        }
        return null;
    }

    const handleClick = (index: number): void => {
        if(game.winner !== null) {
            return 
        }

        if(game.board[index] === '') {  
            const newBoard = [...game.board];
            newBoard[index] = game.currentPlayer;
            let winCell = checkWinner(newBoard);
            const isDraw = !winCell && newBoard.every(cell => cell !== '');
            
            setGame({
                ...game,
                board: newBoard,
                winner: winCell ? winCell.winner : isDraw ? 'Ничья' : null,
                currentPlayer: winCell || isDraw ? game.currentPlayer : (game.currentPlayer === 'X' ? 'O' : 'X'),
                WinnerCells: winCell ? winCell.cells : [],
            });
        }
    } 

    const restartGame = () => {
        setGame({
            board: Array(9).fill(''),
            currentPlayer: 'X',
            winner: null,
            WinnerCells: [],
        });
    };

   
    return (

        <div>
            {game.winner === 'Ничья' ? ( <div>Ничья</div> ) : game.winner ? (
                <div>Победил - {game.winner}</div>
            ): null}
        
            <div className="game-wrap">
                {game.board.map((cell, index) => (
                    <button 
                        className={`game-input ${game.WinnerCells.includes(index) ? 'winner-cell' : ''}`}
                        key={index}
                        onClick={() => handleClick(index)}
                        disabled={game.winner !== null}
                    >
                        {cell}
                    </button>
                ))}
            </div>


            {game.winner && (
                <button onClick={restartGame} className="restart-btn">
                    Новая игра
                </button>
            )} 
        </div>
        
    )
}

export default Game;