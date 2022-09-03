// import react hooks
import { useEffect } from "react"

// import components
import QWERTY from "./QWERTY"

// import custom hooks
import { useHangman } from "./useHangman"

const Hangman = () => {

    const {solution, guess, chance, history, isFinished, handleKeyUp, resetGame} = useHangman()

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }

    }, [handleKeyUp])

    return (
        <div className="hangman">
            <div className="solution">{solution}</div>
            <div className="guess">
                {guess && guess.map((char, index) => (
                    <div className="character" key={index}>
                        {char.isRevealed? char.key: '_'}
                    </div>
                ))}
            </div>
            <div className="chance">You have {chance} times left</div>
            <div className="history">You have tried {history.join(', ')}</div>
            <QWERTY />
            {isFinished && <div className="result">
                {guess.every(char => char.isRevealed)? 'You win': 'You lose'}
            </div>}
            {isFinished && <button onClick={resetGame} >next game</button>}
        </div>
    )
}
 
export default Hangman