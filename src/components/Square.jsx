export const Square = ({children, isSelected, isTurnSquare, updateBoard, index}) => {
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