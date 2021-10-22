import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import NewScheduleModal from './components/NewScheduleModal';
import './EmployeesSchedulesView.css';
import ScheduleDays from './components/ScheduleDays';
import BeShowed from '../../common/BeShowed';
import { addDaySchedule } from '../../actions/ScheduleActions';
import { connect } from 'react-redux'

const EmployeesSchedulesView = ({ schedule, addDaySchedule }) => {

    const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);
    const [showNewSchedule, setShowNewSchedule] = useState(false);
    const [daysNewSchedule,setDaysNewSchedule] = useState(null)

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    useEffect(() => {
        const today = new Date();
        for(let i = 1; i < (daysNewSchedule+1); i++){
            const nexDay = new Date(today);
            nexDay.setDate(nexDay.getDate() + i)
            addDaySchedule(nexDay)
        }
    },[daysNewSchedule])

    const viewTitle = 'Grilla de Horarios';

    const generateNewScheduleClicked = () => {
        setShowNewScheduleModal(true);
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = viewTitle}</div>
            <div className="viewTitle">
                <h1>{viewTitle}</h1>
            </div>
            <div className="viewBody">
                <BeShowed show={!showNewSchedule}>
                    <div className="schedules-cards-container">
                        <div className="cards-container d-flex-col">
                            <Card
                                title='Generar Nueva Grilla'
                                text='Genera una nueva grilla de horarios para tus empleados.'
                                handleCardClicked={generateNewScheduleClicked}
                            />
                            <Card
                                title='Ver Últimas Grillas'
                                text='Mira las últimas grillas que has creado.'
                            />
                        </div>
                    </div>
                </BeShowed>
                <NewScheduleModal showModal={showNewScheduleModal} setShowModal={setShowNewScheduleModal} 
                                    setDaysNewSchedule={setDaysNewSchedule} setShowNewSchedule={setShowNewSchedule}/>
                <BeShowed show={showNewSchedule}>
                    <ScheduleDays days={[1]}/>
                </BeShowed>
            </div>
        </>
    )
};

const mapStateToProps = state => {
    return {
        schedule: state.schedule,
    }
}

const mapDispatchToProps = {
    addDaySchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesSchedulesView);
