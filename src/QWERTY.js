import { useState } from "react"

const QWERTY = ({handleClick}) => {
    
    const [qwerty, setQwerty] = useState(['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')])
    
    const style = {backgroundColor: 'blue'}

    return (
        <div className="QWERTY">
        {qwerty.map((row) => (
            <div className="qwerty-row">
                {row.map((key) => (
                    <div className="qwerty-key"
                        key={key}
                        style={style}
                        onClick={() => handleClick(key)}
                    >
                            {key.toUpperCase()}
                    </div>
                ))}
            </div>
        ))}
        </div>
    )
}
 
export default QWERTY