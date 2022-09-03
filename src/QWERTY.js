import { useState } from "react"

const QWERTY = () => {
    
    const [qwerty, setQwerty] = useState(['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')])
    
    console.log(qwerty)

    return (
        <div className="QWERTY">
        {qwerty.map((row) => (
            <div className="qwerty-row">
                {row.map((key) => (
                    <div className="qwerty-key">
                        {key.toUpperCase()}
                    </div>
                ))}
            </div>
        ))}
        </div>
    )
}
 
export default QWERTY