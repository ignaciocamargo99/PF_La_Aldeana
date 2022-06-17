import React, { useState, useEffect } from "react"

const styles = {
    buttonNumberStyle: {
        width: '70px',
        borderColor: 'gray',
        backgroundColor: '#383C77'
    },
    buttonDeleteStyle: {
        width: '146px',
        borderColor: 'gray',
        backgroundColor: '#383C77'
    }
}

export const NumericKeyboard = (props) => {
    const [keyboardNumber, setKeyboardNumber] = useState("0");

    useEffect(() => {
        setKeyboardNumber(keyboardNumber)
        props.load(keyboardNumber)
    }, [keyboardNumber])

    const handleBtn1 = () => setKeyboardNumber(keyboardNumber + "1")

    const handleBtn2 = () => setKeyboardNumber(keyboardNumber + "2")

    const handleBtn3 = () => setKeyboardNumber(keyboardNumber + "3")

    const handleBtn4 = () => setKeyboardNumber(keyboardNumber + "4")

    const handleBtn5 = () => setKeyboardNumber(keyboardNumber + "5")

    const handleBtn6 = () => setKeyboardNumber(keyboardNumber + "6")

    const handleBtn7 = () => setKeyboardNumber(keyboardNumber + "7")

    const handleBtn8 = () => setKeyboardNumber(keyboardNumber + "8")

    const handleBtn9 = () => setKeyboardNumber(keyboardNumber + "9")

    const handleBtn0 = () => setKeyboardNumber(keyboardNumber + "0")

    const handleBtnMore = () => setKeyboardNumber(parseInt(keyboardNumber) + 1)
    
    const handleBtnDelete = () => setKeyboardNumber("0")

    const handleBtnMinus = () => {
        if (parseInt(keyboardNumber) < 1) setKeyboardNumber("0")
        else setKeyboardNumber(parseInt(keyboardNumber) - 1)
    }
    

    return (
        <div style={{ display: 'inline-block' }}>
            {/* {console.log(keyboardNumber)} */}
            <div className='formRow'>
                <div className='col'>
                    <button className='btn btn-primary' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn1}>1</button>
                </div>
                <div className='col'>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn2}>2</button>
                </div>
                <div className='col'>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn3}>3</button>
                </div>
            </div>
            <div className='formRow'>
                <div className='col'>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn4}>4</button>
                </div>
                <div className='col'>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn5}>5</button>
                </div>
                <div className='col'>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn6}>6</button>
                </div>
            </div>
            <div className='formRow'>
                <div className='col' style={{ marginRight: '4px' }}>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn7}>7</button>
                </div>
                <div className='col' style={{ marginRight: '4px' }}>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn8}>8</button>
                </div>
                <div className='col' style={{ marginRight: '4px' }}>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn9}>9</button>
                </div>
            </div>

            <div className='formRow'>
                <div className='col' style={{ marginRight: '4px' }}>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtn0}>0</button>
                </div>
                <div className='col' style={{ marginRight: '4px' }}>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtnMore}>+</button>
                </div>
                <div className='col' style={{ marginRight: '4px' }}>
                    <button className='btn btn-primary btnKeyboard' type="button" style={styles.buttonNumberStyle}
                        onClick={handleBtnMinus}>-</button>
                </div>
            </div>

            <div className='formRow'>
                <div className='col-12'>
                    <button className='btn btn-primary btnKeyboardDelete' type="button" style={styles.buttonDeleteStyle}
                        onClick={handleBtnDelete}>Borrar</button>
                </div>
            </div>

        </div>


    );
}