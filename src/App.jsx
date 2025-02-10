import { use, useState } from "react";
import './App.css'

const TURNS = {
    X: 'x',
    O: 'o'
}

const winnerCombos = [
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


const Button = ({children, onClick, className}) => {
    return (
        <button onClick={onClick} className={className}>{children}</button>
    )
}


function App() {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(TURNS.X);
    const [winner, setWinner] = useState(null);
    const [visibility, setVisibility] = useState(false);

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        setVisibility(false);
    }
    const changeVisibility = () => {
        setVisibility(!visibility);
    }

    const checkWinner = (newBoard) => {
        for (const combo of winnerCombos) {
            const [a, b, c] = combo
            if (
                newBoard[a] &&
                newBoard[a] === newBoard[b] &&
                newBoard[a] === newBoard[c]
            ) {
                return newBoard[a]
            }
        }
        // Not a winner yet
        return null
    }

    const updateBoard = (index) => {
        if (board[index] || winner) return; // if the square is current filled, do nothing, return
        
        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);  //change turn state from X to O and vice versa 

        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard); // Set the new board with the new value inserted

        const newWinner = checkWinner(newBoard); // verify winner
        if (newWinner) {
            setWinner(newWinner);
            changeVisibility()
        }
    }


    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <Button onClick={restartGame} className={'reset-btn'}>Restart Game</Button>
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

            {
                !visibility && winner !== null && (
                    <Button onClick={changeVisibility} className={'reset-btn'}>Watch the result</Button>
                )
            }

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
                winner !== null && visibility &&(
                    <section className="modal-container">
                        <button className="close-btn" onClick={changeVisibility}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="1"> <path d="M18 6l-12 12"></path> <path d="M6 6l12 12"></path> </svg> 
                        </button>
                        <h2 className="dialog-text">Winner: </h2>
                        <div className="modal-square-container">
                            <Square>{winner}</Square>
                        </div>
                        <Button onClick={restartGame} className={'reset-btn'}>Restart Game</Button>
                    </section>
                )
            }
        </main>
    )
}

export default App
