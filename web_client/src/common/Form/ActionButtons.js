import React from 'react'
import { Link } from 'react-router-dom'

const ActionButtons = ({ submit, cancel, goBack, }) => {

    const SubmitButton = ({ label, ready, onClickOk, onClickNotOk }) => {

        const readyStyle = ready ? 'sendOk' : 'sendNotOk';
        const style = `btn btn-light ${readyStyle}`

        const onClick = ready ? onClickOk : onClickNotOk;

        return (
            <button className={style} onClick={onClick}>{label}</button>
        )
    }

    const GoBackButton = ({ link }) => {
        return (
            <Link to={link}>
                <button className='btn btn-light sendOk'>Volver</button>
            </Link>
        )
    }

    const CancelButton = ({ link }) => {
        return (
            <Link to={link}>
                <button className='btn btn-light cancel'>Cancelar</button>
            </Link>
        )
    }

    return (
        <div className='buttons'>
            {
                submit?.enable && (
                    <SubmitButton
                        label={submit.label}
                        ready={submit.ready}
                        onClickOk={submit.onClickOk}
                        onClickNotOk={submit.onClickNotOk}
                    />
                )
            }
            {
                cancel?.enable && (
                    <CancelButton link={cancel.link} />
                )
            }
            {
                (goBack?.enable) && (
                    <GoBackButton link={goBack.link} />
                )
            }
        </div>
    )
}

export default ActionButtons