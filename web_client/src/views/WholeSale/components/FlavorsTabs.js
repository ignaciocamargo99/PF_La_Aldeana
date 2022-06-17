import React, { useEffect, useState } from 'react'

const FlavorsTabs = ({ flavors, loading }) => {

    const [timeLeft, setTimeLeft] = useState(2);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const isLoading = loading || timeLeft > 0;

    return (
        <div>
            <h3>Sabores</h3>
            {(isLoading) && (
                <>
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    &nbsp;
                    <label className="text-black-50">Cargando sabores...</label>
                </>
            )}
            {(!isLoading) && (
                <label >Ups! En desarrollo...</label>
            )}
        </div>
    )
}

export default FlavorsTabs