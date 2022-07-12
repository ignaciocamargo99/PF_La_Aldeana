import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import createTabsStateObject from './createTabsStateObject';

const NextTab = ({ tabs, setTabs }) => {

    const disabledArrowStyle = 'text-black-50';
    const enabledArrowStyle = 'text-la-aldeana-violeta icon-fa-pointer';

    const leftArrowStyle = `fas fa-2x me-2 ${tabs.showFlavorsTab ? disabledArrowStyle : enabledArrowStyle}`;
    const rightArrowStyle = `fas fa-2x ${tabs.showSummaryTab ? disabledArrowStyle : enabledArrowStyle}`;

    const handleArrowClick = (goNext) => {
        if (tabs.showFlavorsTab && goNext) {
            setTabs(createTabsStateObject(false, goNext, false, false));
        }
        if (tabs.showSuppliesTab) {
            setTabs(createTabsStateObject(!goNext, false, goNext, false));
        }
        if (tabs.showTransportTab) {
            setTabs(createTabsStateObject(false, !goNext, false, goNext));
        }
        if (tabs.showSummaryTab && !goNext) {
            setTabs(createTabsStateObject(false, false, true, false));
        }
    }

    return (
        <div className='d-flex justify-content-end mt-5'>
            <FontAwesomeIcon
                className={leftArrowStyle}
                onClick={() => { handleArrowClick(false) }}
                icon={faAngleDoubleLeft}
            />
            <FontAwesomeIcon
                className={rightArrowStyle}
                onClick={() => { handleArrowClick(true) }}
                icon={faAngleDoubleRight}
            />
        </div>
    )
}

export default NextTab