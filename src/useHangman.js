import { useEffect, useState } from "react"

export const useHangman = () => {
    const [solution, setSolution] = useState(null)
    const [guess, setGuess] = useState([])
    const [chance, setChance] = useState(6)
    const [history, setHistory] = useState([])
    const [isFinished, setIsFinished] = useState(false)
    
    // initialize solution and guess
    useEffect(() => {
        const password = 'happy'
        setSolution(password)
        let guessArray =[]
        for (let index in password) {
            guessArray.push({key: password[index], isRevealed: false})
        }
        setGuess(guessArray)
    }, [setSolution, setGuess])

    // check whether the user win or lose
    useEffect(() => {
        setIsFinished(chance === 0 || guess.every(char => char.isRevealed))
    }, [chance, guess, setIsFinished])

    // event handler for press key
    const handleKeyUp = ({key}) => {
        if (!isFinished) {
            // use RegEx to check whether key is valid
            if (/^[A-Za-z]$/.test(key)) {
                // check whether the key is in history
                if (!history.includes(key)) {
                    // check whether the solution contains the key
                    if (solution.includes(key)) {
                        // reveal the key in guess => return the same object, change isRevealed to true if the key matches
                        setGuess(prevGuess => prevGuess.map((char => (
                            char.key === key? {...char, isRevealed: true}: char
                        ))))
                    }
                    else {
                        setChance(prev => prev-1)
                    }
                    // add the key into history
                    setHistory(prev => [...prev, key])
                }
            }
        }
    }

    return { solution, guess, chance, history, isFinished, handleKeyUp }
}