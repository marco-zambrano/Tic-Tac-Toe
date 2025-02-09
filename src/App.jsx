import { useState } from "react";
import './App.css'

const TURNS = {
    X: 'x',
    O: 'o'
}

const winnerPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 4, 8],
    [2, 4, 6], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8] 
]



const Square = ({children, isSelected, isTurnSquare, updateBoard, index}) => {
    const className = `square ${isTurnSquare ? 'turn' : ''} ${isSelected ? 'turn--is-selected' : ''}`

    const handeClick = () => {
        updateBoard(index)
    }
    
    return (
        <div className={className} onClick={handeClick}>
            {children}
        </div>
    )
}

function App() {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(TURNS.X);
    const [winner, setWinner] = useState(null)

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);



    }
    
    
    
    const checkWinner = (newBoard) => {
        for (const combo of winnerPatterns) {
            const [a, b, c] = combo
            if (
                newBoard[a] &&
                newBoard[a] === newBoard[b] &&
                newBoard[a] === newBoard[c]
            ) {
                return newBoard[a]
            }
        }
        // if no winner combo yet
        return null
    }

    const updateBoard = (index) => {
        // if the square is current filled, do nothing, return
        if (board[index] || winner) return;   
        //change turn state from X to O and vice versa 
        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);  

        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner)
        }
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <button onClick={restartGame} className="reset-btn">Restart Game?</button>
            <section className='game'>
                {
                    board.map( (_, index) => {
                        return (
                            <Square 
                                key={index} 
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn-container'>
                <Square 
                    isSelected={ turn === TURNS.X } 
                    isTurnSquare
                >
                    {TURNS.X}
                </Square>
                <Square 
                    isSelected={ turn === TURNS.O } 
                    isTurnSquare
                >
                    {TURNS.O}
                </Square>
            </section>

            {
                winner !== null && (
                    <section className="modal-container">
                        <h2 className="dialog-text">Winner: </h2>
                        <div className="modal-square-container">
                            <Square>{winner}</Square>
                        </div>
                        <button onClick={restartGame} className="reset-btn">Restart Game?</button>
                    </section>
                )
            }
        </main>
    )
}

export default App
