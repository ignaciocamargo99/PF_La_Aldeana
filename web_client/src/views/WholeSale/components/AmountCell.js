import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import validateFloatNumbers from 'utils/validateFloatNumbers';

const AmountCell = ({ handleAddItem, item }) => {
    const [amount, setAmount] = useState('');

    useEffect(() => {
        setAmount('')
    }, [item])

    const onChange = ({ target }) => {
        if (target.value > item.stock) {
            return;
        }
        if (target.value <= 0) {
            setAmount('')
            return;
        }
        setAmount(target.value)
    }

    const onClickAdd = () => {
        if (amount <= item.stock && amount > 0) {
            handleAddItem(item, amount)
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
                    disabled={+item.stock <= 0}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </td>
        </>
    )
}

export default AmountCell