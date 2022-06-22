import React from 'react';
import WindowClose from './WindowClose';

const ComboFilter = ({ value, setValue, elements, width, placeholder = 'Seleccione...' }) => {

    const widthStyle = width ? `${width}em` : '10em';

    const defaultState = -1;

    const handleOnChange = (e) => {
        setValue(+e.target.value)
    }

    const clearClicked = () => {
        setValue(+defaultState)
    }

    return (
        <div className="">
            <div className="me-3 d-flex align-items-center">
                <select className="form-select me-1 fs-6" style={{ width: widthStyle }}
                    onChange={handleOnChange}
                    value={value}
                >
                    <option disabled value='-1'>{placeholder}</option>
                    {elements?.map((e, i) => {
                        return (
                            <option
                                key={e.id}
                                value={e.id}
                            >
                                {e.value}
                            </option>
                        )
                    })}
                </select>
                <WindowClose onClick={clearClicked} />
            </div>
        </div>
    )
}

export default ComboFilter