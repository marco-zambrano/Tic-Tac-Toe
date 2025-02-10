import { Square } from "./Square.jsx"
import { Button } from "./Button.jsx"

// eslint-disable-next-line react/prop-types
export function WinnerModal({winner, visibility, changeVisibility, restartGame}) {
    if (winner === null || !visibility) return null
    
    return (
        <section className="modal-container">
            <button className="close-btn" onClick={changeVisibility}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" strokeWidth="1">
                    <path d="M18 6l-12 12"></path> 
                    <path d="M6 6l12 12"></path> 
                </svg> 
            </button>

            {
                winner === 'draw' ? (
                    <>
                        <h2 className="dialog-text">Result: </h2>
                        <p className="draw-text">Draw</p>
                    </>
                ) : (
                    <>
                        <h2 className="dialog-text">Winner: </h2>
                        <div className="modal-square-container">
                            <Square>{winner}</Square>
                        </div>
                    </>
                )
            }

            <Button onClick={restartGame} className={'reset-btn'}>Restart Game</Button>
        </section>
    )
}
