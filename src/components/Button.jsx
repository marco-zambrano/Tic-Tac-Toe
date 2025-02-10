export const Button = ({children, onClick, className, winner, visibility}) => {
    if (winner === null && !visibility) return null

    return (
        <button onClick={onClick} className={className}>{children}</button>
    )
}