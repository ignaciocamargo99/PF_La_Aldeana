import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const WindowClose = ({ onClick }) => {
    return (
        <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={onClick} icon={faWindowClose} />
    )
}

export default WindowClose