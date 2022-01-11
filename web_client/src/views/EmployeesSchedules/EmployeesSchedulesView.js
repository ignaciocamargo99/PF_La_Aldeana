import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import NewScheduleModal from './components/NewScheduleModal';
import './EmployeesSchedulesView.css';
import ScheduleDays from './components/ScheduleDays';
import BeShowed from '../../common/BeShowed';
import { addDaySchedule } from '../../actions/ScheduleActions';
import { connect } from 'react-redux';
import axios from 'axios';
import MonthView from './components/MonthView';
import AutomatedSchedule from './components/AutomatedSchedule';

const PORT = require('../../config');

const EmployeesSchedulesView = ({ schedule, addDaySchedule }) => {

    const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);
    const [showNewSchedule, setShowNewSchedule] = useState(false);
    const [showMonthView, setShowMonthView] = useState(false);
    const [showAutomatedSchedule, setShowAutomatedSchedule] = useState(false);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [daysNewSchedule,setDaysNewSchedule] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [licenses, setLicenses] = useState(null);
    const [licensesMonth,setLicensesMonth] = useState(null);
    const [nonworkingDays,setNonworkingDays] = useState(null);
    const [nonworkingDaysMonth,setNonworkingDaysMonth] = useState(null);
    const [jdEmployees,setJDEmployees] = useState(null);

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    useEffect(() => {
        const today = new Date();
        setMonth(today.getMonth());
        setYear(today.getFullYear());
        for(let i = 1; i < (daysNewSchedule+1); i++){
            const nexDay = new Date(today);
            nexDay.setDate(nexDay.getDate() + i)
            addDaySchedule(nexDay)
        }
    },[daysNewSchedule])

    useEffect(() => {
        axios.get(`${PORT()}/api/employees`)
        .then((response) => {
            setEmployees(response.data);
            axios.get(`${PORT()}/api/licenses`)
            .then((response) => {
                setLicenses(response.data);
            })
        })
    },[])

    useEffect(() => {
        axios.get(`http://nolaborables.com.ar/api/v2/feriados/${today.getFullYear()}`)
        .then((response) => {
            let newNonworkingDays = [];
            response.data.forEach((nWD) => {
                newNonworkingDays.push({day: nWD.dia, month: (nWD.mes - 1)})
            })
            setNonworkingDays(newNonworkingDays);
        })
        .catch((err) => {console.log(err)});
    },[])

    useEffect(() => {
        let newLicensesMonth
        if(licenses){
            newLicensesMonth = licenses.filter(license => (parseInt(license.date_init.slice(0,4)) === year && parseInt(license.date_init.slice(5,7)) === month+1) || (parseInt(license.date_finish.slice(0,4)) === year && parseInt(license.date_finish.slice(5,7)) === month+1));
            setLicensesMonth(newLicensesMonth);
        }
    },[licenses,month,year])

    useEffect(() => {
        let newNonworkingDaysMonth = [];
        if(nonworkingDays){
            nonworkingDays.forEach((nWD,i) => {if(nWD.month === month) newNonworkingDaysMonth.push(nWD.day)})
            setNonworkingDaysMonth(newNonworkingDaysMonth);
        }
    },[nonworkingDays,month,year])

    useEffect(() => {
        axios.get(`${PORT()}/api/jdEmployee?yearMonth=${year}-${month+1<10?'0'+(month+1):month+1}`)
        .then((response) => {
            setJDEmployees(response.data); 
        })
        .catch((error) => console.log(error));
    },[month,year])

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
                <BeShowed show={!showNewSchedule && !showMonthView && !showAutomatedSchedule}>
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
                            <Card
                                title='Visualizar cronograma por mes'
                                text='Visualiza los turnos asignados de tus empleados con estadisticas incluidas.'
                                handleCardClicked={() => {setShowMonthView(true)}}
                            />
                            <Card
                                title='Generar cronograma automatico'
                                text='Al seleccionar los parametros el cronograma se generará automaticamente.'
                                handleCardClicked={() => {setShowAutomatedSchedule(true)}}
                            />
                        </div>
                    </div>
                </BeShowed>
                <NewScheduleModal showModal={showNewScheduleModal} setShowModal={setShowNewScheduleModal} 
                                    setDaysNewSchedule={setDaysNewSchedule} setShowNewSchedule={setShowNewSchedule}/>
                <BeShowed show={showNewSchedule}>
                    <ScheduleDays employees={employees}/>
                </BeShowed>
                <BeShowed show={showMonthView}>
                    <div className="container-fluid">
                        <MonthView month={month} setMonth={setMonth} year={year} setYear={setYear} employees={employees} 
                                    licensesMonth={licensesMonth} nonworkingDaysMonth={nonworkingDaysMonth}
                                    jdEmployees={jdEmployees}/>
                    </div>
                </BeShowed>
                <BeShowed show={showAutomatedSchedule}>
                    <AutomatedSchedule today={today} employees={employees}/>
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
