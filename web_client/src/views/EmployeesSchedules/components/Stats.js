import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import showMeMonth from "../../../utils/ShowMeMonth/showMeMonth";

const Stats = ({employee,employeeStats,day,dayStats,month,turns,infoTurns}) => {
    
    const[daysWorks,setDaysWorks] = useState(0);

    useEffect(() => {
        let newDaysWorks = 0;
        employeeStats?.forEach((stat) => {
            newDaysWorks = newDaysWorks + stat
        })
        setDaysWorks(newDaysWorks)
    },[employeeStats])

    return(
        <>
            <BeShowed show={infoTurns}>
                <div style={{paddingLeft: '2%', display: 'block', overflow: 'auto', height: '600px', width: '100%'}}>
                    <label><b>TURNOS</b></label>
                    {
                        turns?.map((turn,i) => {
                            return(
                                <div key={turn.id}>
                                    <div className="formRow">
                                        <label style={{fontSize: 15}}><b>{turn.name} - {turn.abbreviation}</b></label>
                                    </div>
                                    <div>
                                        {turn.turns.map((t,j) => {
                                            return(
                                                <div key={t.id_turn}>
                                                    <div className="formRow">
                                                        <label style={{fontSize: 15}}>{t.turn_name} - {t.turn_abbreviation}</label>
                                                    </div>
                                                    <div className="formRow">
                                                        <label style={{fontSize: 15}}>Hora inicio: {t.init_time}</label>
                                                    </div>
                                                    <div className="formRow">
                                                        <label style={{fontSize: 15}}>Hora fin: {t.finish_time}</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </BeShowed>
            <BeShowed show={employee}>
                <div style={{paddingLeft: '2%'}}>
                    <label><b>{employee?.name.toUpperCase()}</b></label>
                    {turns?.map((turn,i) => {
                        return(
                        <div key={turn.id_compound_turn} className="formRow">
                            <label style={{fontSize: 15}}>{turn.name}: {employeeStats?employeeStats[i]:0}</label>
                        </div>)
                    })}
                    <div className="formRow">
                        <label style={{fontSize: 15}}>Dias trabajados: {daysWorks}</label>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={day}>
                <div style={{paddingLeft: '2%'}}>
                    <label><b>{`${day} DE ${showMeMonth(month).toUpperCase()}`}</b></label>
                    {
                        dayStats?.map((ds,i) => {
                            return(
                                <div key={turns[i].id}>
                                    <div className="formRow" style={{marginBottom: '3px'}}>
                                        <label style={{fontSize: 15}}><b>{turns[i].name.toUpperCase()}</b></label>
                                    </div>
                                    <div className="formRow" style={{margin:'0px'}}>
                                        <label style={{fontSize: 15}}>Cantidad: {ds}</label>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </BeShowed>
        </>)    
}

export default Stats;