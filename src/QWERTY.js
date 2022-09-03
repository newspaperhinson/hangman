import { useState } from "react"

const QWERTY = () => {
    
    const [qwerty, setQwerty] = useState(['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')])
    
    console.log(qwerty)

    return (
        <div className="QWERTY">
        </div>
    )
}
 
export default QWERTY