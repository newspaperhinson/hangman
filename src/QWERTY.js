const QWERTY = ({qwerty, handleClick}) => {

    return (
        <div className="QWERTY">
        {qwerty.map((row) => (
            <div className="qwerty-row">
                {row.map((key) => (
                    <div className="qwerty-key"
                        style={{backgroundColor: key? 'white': 'grey'}}
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