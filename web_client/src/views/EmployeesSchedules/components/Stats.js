import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import showMeMonth from "../../../utils/ShowMeMonth/showMeMonth";

const Stats = ({employee,employeeStats,day,dayStats,month,turns}) => {
    
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
                    <div className="formRow" style={{marginBottom: '3px'}}>
                        <label>MAÑANA</label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Deliverys: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Cajeros: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>At. Público: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Personas: </label>
                    </div>
                    <div className="formRow" style={{marginBottom: '3px'}}>
                        <label>TARDE</label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Deliverys: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Cajeros: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>At. Público: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Personas: </label>
                    </div>
                    <div className="formRow" style={{marginBottom: '3px'}}>
                        <label>NOCHE</label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Deliverys: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Cajeros: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>At. Público: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Personas: </label>
                    </div>
                    <div className="formRow" style={{marginBottom: '3px'}}>
                        <label>U. NOCHE</label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Deliverys: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Cajeros: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>At. Público: </label>
                    </div>
                    <div className="formRow" style={{margin:'0px'}}>
                        <label style={{fontSize: 15}}>Personas: </label>
                    </div>
                </div>
            </BeShowed>
        </>)    
}

export default Stats;