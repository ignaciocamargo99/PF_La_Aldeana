import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import './EmployeesSchedulesView.css';
import BeShowed from '../../common/BeShowed';
import { connect } from 'react-redux';
import axios from 'axios';
import MonthView from './components/MonthView';
import AutomatedSchedule from './components/AutomatedSchedule';

const PORT = require('../../config');

const EmployeesSchedulesView = (props) => {
    const [showMonthView, setShowMonthView] = useState(false);
    const [showAutomatedSchedule, setShowAutomatedSchedule] = useState(false);
    const [employees, setEmployees] = useState(null);
    const [turns, setTurns] = useState(null);
    const [nonworkingDays, setNonworkingDays] = useState(null);
    const [licenses, setLicenses] = useState(null);
    const [charges, setCharges] = useState(null);
    let permissionsAccess = props.permissionsAccess;
    const today = new Date();

    useEffect(() => {
        axios.get(`${PORT()}/api/employees`)
            .then((response) => {
                setEmployees(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`${PORT()}/api/turns`)
            .then((response) => {
                let newTurns = [];
                response.data.forEach((t, i) => {
                    let turnToAdd = { id: t.id, name: t.name, abbreviation: t.abbreviation, turns: [] };
                    if (t.id === newTurns[newTurns.length - 1]?.id) {
                        newTurns[newTurns.length - 1].turns.push({
                            id_turn: t.id_turn,
                            turn_name: t.turn_name,
                            turn_abbreviation: t.turn_abbreviation,
                            init_time: t.init_time,
                            finish_time: t.finish_time
                        })
                    } else {
                        turnToAdd.turns.push({
                            id_turn: t.id_turn,
                            turn_name: t.turn_name,
                            turn_abbreviation: t.turn_abbreviation,
                            init_time: t.init_time,
                            finish_time: t.finish_time
                        })
                        newTurns.push(turnToAdd);
                    }
                })
                setTurns(newTurns);
            })
    }, [])

    useEffect(() => {
        axios.get(`https://nolaborables.com.ar/api/v2/feriados/${today.getFullYear()}`)
            .then((res) => {
                setNonworkingDays(res.data);
            })
            .catch((error) => console.log(error));
    }, [])

    useEffect(() => {
        axios.get(`${PORT()}/api/licenses`)
            .then((res) => {
                setLicenses(res.data);
            })
            .catch((error) => console.log(error));
    }, [])

    useEffect(() => {
        axios.get(`${PORT()}/api/charges`)
            .then((res) => {
                setCharges(res.data);
            })
            .catch((error) => console.log(error));
    }, [])

    const viewTitle = 'Grilla de Horarios';

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = viewTitle}</div>
            <div className="viewTitle">
                <h1>{viewTitle}</h1>
            </div>
            <div className="viewBody">
                <BeShowed show={!showMonthView && !showAutomatedSchedule}>
                    <div className="schedules-cards-container">
                        <div className="cards-container d-flex-col">
                            <Card
                                title='Visualizar cronograma por mes'
                                text='Visualiza los turnos asignados de tus empleados con estadisticas incluidas.'
                                handleCardClicked={() => { setShowMonthView(true) }}
                            />
                            <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                <Card
                                    title='Generar cronograma automatico'
                                    text='Al seleccionar los parametros el cronograma se generará automaticamente.'
                                    handleCardClicked={() => { setShowAutomatedSchedule(true) }}
                                />
                            </BeShowed>
                            <BeShowed show={permissionsAccess === 1}>
                                <Card
                                    title='Generar cronograma automatico'
                                    text='Al seleccionar los parametros el cronograma se generará automaticamente.'
                                    handleCardClicked={() => { setShowAutomatedSchedule(false) }}
                                    style={{ color: 'gray' }}
                                />
                            </BeShowed>
                        </div>
                    </div>
                </BeShowed>
                <BeShowed show={showMonthView}>
                    <div className="container-fluid">
                        <MonthView employees={employees} turns={turns} setShowMonthView={setShowMonthView} permissionsAccess={permissionsAccess} />
                    </div>
                </BeShowed>
                <BeShowed show={showAutomatedSchedule}>
                    <AutomatedSchedule today={today} nonworkingDays={nonworkingDays} employees={employees} turns={turns}
                        charges={charges} setShowAutomatedSchedule={setShowAutomatedSchedule} licenses={licenses} />
                </BeShowed>
            </div>
        </>
    )
};

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesSchedulesView);
