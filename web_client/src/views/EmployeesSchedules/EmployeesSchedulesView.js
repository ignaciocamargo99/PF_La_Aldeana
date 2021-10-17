import React, { useState } from 'react';
import Card from './components/Card';
import NewScheduleModal from './components/NewScheduleModal';
import './EmployeesSchedulesView.css';

const EmployeesSchedulesView = () => {
    const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);

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
                <NewScheduleModal showModal={showNewScheduleModal} setShowModal={setShowNewScheduleModal} />
            </div>
        </>
    )
};

export default EmployeesSchedulesView;
