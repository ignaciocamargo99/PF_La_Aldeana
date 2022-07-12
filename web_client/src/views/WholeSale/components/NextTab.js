import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NextTab = ({ tabs, setTabs }) => {

    const disabledArrowStyle = 'text-black-50';
    const enabledArrowStyle = 'text-la-aldeana-violeta icon-fa-pointer';

    const leftArrowStyle = `fas fa-2x me-2 ${tabs.showFlavorsTab ? disabledArrowStyle : enabledArrowStyle}`;
    const rightArrowStyle = `fas fa-2x ${tabs.showSummaryTab ? disabledArrowStyle : enabledArrowStyle}`;

    return (
        <div className='d-flex justify-content-end mt-5'>
            <FontAwesomeIcon
                className={leftArrowStyle}
                onClick={() => { }}
                icon={faAngleDoubleLeft}
            />
            <FontAwesomeIcon
                className={rightArrowStyle}
                onClick={() => { }}
                icon={faAngleDoubleRight}
            />
        </div>
    )
}

export default NextTab