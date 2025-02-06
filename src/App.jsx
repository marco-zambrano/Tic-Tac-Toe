import { useState } from "react";
import './App.css'

const TURNS = {
    X: 'x',
    O: 'o'
}

const Square = ({children, isSelected, isTurnSquare, updateTurn}) => {
    const className = `square ${isTurnSquare ? 'turn' : ''} ${isSelected ? 'turn--is-selected' : ''}`
    
    return (
        <div className={className} onClick={updateTurn}>
            {children}
        </div>
    )
}

function App() {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(TURNS.X);

    const updateTurn = () => {
        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <section className='game'>
                {
                    board.map( (_, index) => {
                        return (
                            <Square key={index} updateTurn={updateTurn}>
                                {index}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn-container'>
                <Square isSelected={ turn === TURNS.X } isTurnSquare>
                    {TURNS.X}
                </Square>
                <Square isSelected={ turn === TURNS.O } isTurnSquare>
                    {TURNS.O}
                </Square>
            </section>
        </main>
    )
}

export default App
