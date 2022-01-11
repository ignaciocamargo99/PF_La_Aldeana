import React from "react";
import BeShowed from "../../../common/BeShowed";
import showMeMonth from "../../../utils/ShowMeMonth/showMeMonth";

const Stats = ({employee,day,month}) => {
    
    return(
        <>
            <BeShowed show={employee}>
                <div style={{paddingLeft: '2%'}}>
                    <label><b>{employee?.name.toUpperCase()}</b></label>
                    <div className="formRow">
                        <label style={{fontSize: 15}}>Mañanas: </label>
                    </div>
                    <div className="formRow">
                        <label style={{fontSize: 15}}>Tardes: </label>
                    </div>
                    <div className="formRow">
                        <label style={{fontSize: 15}}>Noches: </label>
                    </div>
                    <div className="formRow">
                        <label style={{fontSize: 15}}>U. Noches: </label>
                    </div>
                    <div className="formRow">
                        <label style={{fontSize: 15}}>Dias trabajados: </label>
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