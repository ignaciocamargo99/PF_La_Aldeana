import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import validateFloatNumbers from 'utils/validateFloatNumbers';

const AmountCell = ({ handleAddFlavor, flavor }) => {
    const [amount, setAmount] = useState('');

    useEffect(() => {
        setAmount('')
    }, [flavor])

    const onChange = ({ target }) => {
        if (target.value > flavor.stock) {
            return;
        }
        if (target.value <= 0) {
            setAmount('')
            return;
        }
        setAmount(target.value)
    }

    const onClickAdd = () => {
        if (amount <= flavor.stock && amount > 0) {
            handleAddFlavor(flavor, amount)
            setAmount('')
        }
    }

    return (
        <>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <input style={{ maxWidth: '4em' }} type="number" value={amount} onChange={onChange} onKeyDown={(e) => validateFloatNumbers(e)} />
            </td>
            <td style={{ textAlign: 'center' }}>
                <button
                    type="button"
                    className="btnAdd btn btn-info"
                    onClick={onClickAdd}
                    disabled={+flavor.stock <= 0}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </td>
        </>
    )
}

export default AmountCell