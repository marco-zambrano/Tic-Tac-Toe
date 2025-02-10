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
    const [board, setBoard] = useState(()=> {
        const boardFromLocalStorage = window.localStorage.getItem('board'); //verify if something in local storage
        return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) :  Array(9).fill(null); //Set the initial array or the local saved
    });

    const [turn, setTurn] = useState(() => {
        const turnFromlocalStorage = window.localStorage.getItem('turn');
        return turnFromlocalStorage ?? TURNS.X;
    });

    const [winner, setWinner] = useState(() => {
        const winFromLocalStorage = window.localStorage.getItem('win');
        return winFromLocalStorage ?? null
    });
    const [visibility, setVisibility] = useState(() => {
        const visibilityFromLocalStorage = window.localStorage.getItem('visibility');
        return visibilityFromLocalStorage ?? false
    });

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        setVisibility(false);

        window.localStorage.removeItem('board');
        window.localStorage.removeItem('turn');
        window.localStorage.removeItem('win');
        window.localStorage.removeItem('visibility');
    }

    const changeVisibility = () => {
        const newVisibility = !visibility
        window.localStorage.setItem('visibility', newVisibility);
        setVisibility(newVisibility);
    }
    
    const updateBoard = (index) => {
        if (board[index] || winner) return; // if the square is current filled or there's a win, do nothing, return
        
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn);

        const newBoard = [...board];
        newBoard[index] = turn; // Insert new value
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        window.localStorage.setItem('win', newWinner);
        window.localStorage.setItem('board', JSON.stringify(newBoard));
        window.localStorage.setItem('turn', newTurn);
        
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
