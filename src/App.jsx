import { useState } from "react";
import './App.css'

const TURNS = {
    X: 'x',
    O: 'o'
}

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

    const updateBoard = (index) => {

        if (board[index]) return;   // if the square is current filled, do nothing, return

        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);  //change turn state from X to O and vice versa 

        const copyBoard = [...board];
        copyBoard[index] = turn;
        setBoard(copyBoard);
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
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
        </main>
    )
}

export default App
