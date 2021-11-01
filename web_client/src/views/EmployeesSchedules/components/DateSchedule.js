import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import formattedDate from '../../../utils/formattedDate';
import { connect } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";

const DateSchedule = ({day, schedule, employees, setDay}) => {

    const date = useRef();

    useEffect(() => {
        if(schedule.length !== 0){
            date.current.value = formattedDate(schedule[day].date)
            date.current.min = formattedDate(schedule[0].date)
            date.current.max = formattedDate(schedule[schedule.length - 1].date)
        }
    },[employees,day])

    const changeDaySchedule = () => {
        let index = schedule.findIndex(day => formattedDate(day.date) === date.current.value)
        setDay(index)
    }

    return(
    <div className="formRow">
        <label className="col-sm-3 offset-sm-3">Fecha <FontAwesomeIcon icon={faArrowRight} style={{color:'gray'}}/></label>
        <input className="col-sm-6" type="date" ref={date} onChange={changeDaySchedule}></input>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        schedule: state.schedule,
    }
}

export default connect(mapStateToProps)(DateSchedule);