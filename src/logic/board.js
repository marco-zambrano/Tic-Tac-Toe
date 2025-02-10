import { WINNERCOMBOS } from "../constanst.js"

export const checkWinner = (newBoard) => {
    for (const combo of WINNERCOMBOS) {
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

export const checkDraw = newBoard => newBoard.every(square => square !== null);  