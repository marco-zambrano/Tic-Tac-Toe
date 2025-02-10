import { useState } from "react";
import confetti from "canvas-confetti"
import './App.css'

import { Square } from "./components/Square.jsx";
import { Button } from "./components/Button.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Board } from "./components/Board.jsx";

import { TURNS } from "./constanst.js";
import { checkWinner, checkDraw } from "./logic/board.js";


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
    
    const updateBoard = (index) => {
        if (board[index] || winner) return; // if the square is current filled, do nothing, return
        
        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);  //change turn state from X to O and vice versa 

        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard); // Set the new board with the new value inserted

        const newWinner = checkWinner(newBoard); // verify winner
        if (newWinner) {
            confetti()
            setWinner(newWinner);
            changeVisibility()
        } else if (checkDraw(newBoard)) {
            setWinner('draw')
            changeVisibility()
        }
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <Button 
                onClick={restartGame} 
                className={'reset-btn'} 
            >
                Restart Game
            </Button>

            <Board 
                board={board} 
                updateBoard={updateBoard}
            />

            <Button 
                onClick={changeVisibility} 
                className={'reset-btn'} 
                winner={winner} 
                visibility={visibility}
            >
                Watch the result
            </Button>

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
            
            <WinnerModal 
                winner={winner}
                visibility={visibility}
                changeVisibility={changeVisibility}
                restartGame={restartGame}
            />
        </main>
    )
}

export default App
