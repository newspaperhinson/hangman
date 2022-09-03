import { useEffect, useState } from "react"

export const useHangman = () => {
    const [bank, setBank] = useState(null)
    const [solution, setSolution] = useState(null)
    const [guess, setGuess] = useState([])
    const [chance, setChance] = useState(6)
    const [history, setHistory] = useState([])
    const [isFinished, setIsFinished] = useState(false)
    const [qwerty, setQwerty] = useState(['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')])
    
    // initialize solution and guess
    useEffect(() => {
        fetch('http://localhost:3001/solutions').then(res => res.json().then(data => {
            setBank(data)
            const password = data[Math.floor(Math.random() * data.length)]
            setSolution(password)
            let guessArray =[]
            for (let index in password) {
                guessArray.push({key: password[index], isRevealed: false})
            }
            setGuess(guessArray)
        }))
    }, [setSolution, setGuess])

    // check whether the user win or lose
    useEffect(() => {
        setIsFinished(chance === 0 || guess.every(char => char.isRevealed))
    }, [chance, guess, setIsFinished])

    // function for handling game mechanism
    const handleClick = (key) => {
        if (!isFinished) {
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
                setQwerty(prev => (
                    prev.map(row => (
                        row.map(char => (
                            char === key? '': char
                        ))
                    ))
                ))
            }
        }
    }

    // event handler for press key
    const handleKeyUp = ({key}) => {
        // use RegEx to check whether key is valid
        if (/^[A-Za-z]$/.test(key)) {
            handleClick(key)
        }
    }

    const resetGame = () => {
        // re-initialize solution and guess
        const password = bank[Math.floor(Math.random() * bank.length)]
        setSolution(password)
        let guessArray =[]
        for (let index in password) {
            guessArray.push({key: password[index], isRevealed: false})
        }
        setGuess(guessArray)

        setChance(6)
        setHistory([])
        setIsFinished(false)
        setQwerty(['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')])
    }

    return { solution, guess, chance, history, isFinished, qwerty, handleKeyUp, resetGame, handleClick }
}