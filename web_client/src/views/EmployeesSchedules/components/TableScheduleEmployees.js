import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import LoaderSpinner from '../../../common/LoaderSpinner';
import showMeCharge from '../../../utils/ShowMeCharge/showMeCharge';
import showMeMonth from '../../../utils/ShowMeMonth/showMeMonth';
import showMeDay from '../../../utils/ShowMeDay/showMeDay';
import './Employees.css';

const TableScheduleEmployees = ({month, setMonth, year, setYear, employees, licensesMonth, nonworkingDays}) => {

    const[firstHalfMonth,setFirstHalfMonth] = useState(true);
    const[employee,setEmployee] = useState(null);
    const[inputsValues,setInputsValues] = useState(null);
    const[days,setDays] = useState([]);
    const[day,setDay] = useState(null);
    const[daysM,setDaysM] = useState(0);
    const[daysT,setDaysT] = useState(0);
    const[daysN,setDaysN] = useState(0);
    const[daysUN,setDaysUN] = useState(0);
    const[deliverysM,setDeliverysM] = useState(0);
    const[deliverysT,setDeliverysT] = useState(0);
    const[deliverysN,setDeliverysN] = useState(0);
    const[deliverysUN,setDeliverysUN] = useState(0);

    const[cashiersM,setCashiersM] = useState(0);
    const[cashiersT,setCashiersT] = useState(0);
    const[cashiersN,setCashiersN] = useState(0);
    const[cashiersUN,setCashiersUN] = useState(0);
    
    const[pubAtM,setPubAtM] = useState(0);
    const[pubAtT,setPubAtT] = useState(0);
    const[pubAtN,setPubAtN] = useState(0);
    const[pubAtUN,setPubAtUN] = useState(0);
    

    useEffect(() => {
        if(employees){
            let days = getDays();
            setDays(days);
            setFirstHalfMonth(true);
            loadInputsValues(days);
        }
    },[employees,month,year])

    useEffect(() => {
        licensesMonth?.forEach((license) => {
            let i;
            let maxDay;
            if(firstHalfMonth){
                i = 1;
                maxDay = 15;
            } else{
                i = 16;
                maxDay = parseInt(days[days.length-1]);
            }
            for(i ; i <= maxDay ; i++){
                let input
                if((parseInt(license.date_init.slice(5,7)) === month+1 && parseInt(license.date_init.slice(8,10)) <= i && i <= parseInt(license.date_finish.slice(8,10)))||
                    (parseInt(license.date_init.slice(5,7)) < month+1 && i <= parseInt(license.date_finish.slice(8,10)))||
                    (parseInt(license.date_finish.slice(5,7)) > month+1 && i >= parseInt(license.date_init.slice(8,10)))){
                    input = document.getElementById(`inputTurn${license.dni}_${i}`)
                    if(input) {input.disabled = true;}
                }
            }
        })
    },[days,licensesMonth,firstHalfMonth])

    const loadInputsValues = (days) => {
        let newInputsValues = [];
        newInputsValues.length = employees.length;
        let auxDays = [];
        auxDays.length = days.length;
        auxDays.fill('');
        newInputsValues.fill(auxDays);
        setInputsValues(newInputsValues);
    }

    const getDays = () => {
        let days;
        let arrayDays= [];
        if(month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11){
            days = 31;
        } else if(month === 3 || month === 5 || month === 8 || month === 10) {
            days = 30;
        } else if(year % 4 === 0){
            days = 29;
        } else {
            days = 28
        }
        for(let i = 1 ; i < days+1 ; i++){
            arrayDays.push(i);
        }
        return arrayDays;
    }

    const focusMove = (e) => {
        let day;
        let dni;
        let index;
        switch (e.keyCode) {
            case 37:
                day = parseInt(e.target.id.slice((e.target.id.indexOf('_')+1),e.target.id.length));
                if(day !== 1){
                    document.getElementById(`${e.target.id.slice(0,(e.target.id.indexOf('_')+1))}${day-1}`).focus();
                }
                break;
            case 38:
                dni = parseInt(e.target.id.slice((e.target.id.lastIndexOf('n')+1),e.target.id.indexOf('_')));
                index = employees.findIndex(employee => employee.dni === dni);
                if(index !== 0){
                    document.getElementById(`${e.target.id.slice(0,(e.target.id.lastIndexOf('n')+1))}${employees[index-1].dni}${e.target.id.slice(e.target.id.indexOf('_'),e.target.id.length)}`).focus();
                }
                break;
            case 39:
                day = parseInt(e.target.id.slice((e.target.id.indexOf('_')+1),e.target.id.length));
                if(day !== 31){
                    document.getElementById(`${e.target.id.slice(0,(e.target.id.indexOf('_')+1))}${day+1}`).focus();
                }
                break;
            case 40:
                dni = parseInt(e.target.id.slice((e.target.id.lastIndexOf('n')+1),e.target.id.indexOf('_')));
                index = employees.findIndex(employee => employee.dni === dni);
                if(index !== (employees.length-1)){
                    document.getElementById(`${e.target.id.slice(0,(e.target.id.lastIndexOf('n')+1))}${employees[index+1].dni}${e.target.id.slice(e.target.id.indexOf('_'),e.target.id.length)}`).focus();
                }
                break;
            default:
                break;
        }
    }

    const loadEmployeeStats = (index) => {
        setDay(null);
        setEmployee(employees[index]);
        let daysM = 0;
        let daysT = 0;
        let daysN = 0;
        let daysUN = 0;
        days.forEach((day) => {
            switch(inputsValues[index][day-1]){
                case 'M':
                    daysM ++;
                    break;
                case 'T':
                    daysT ++;
                    break;
                case 'N':
                    daysN ++;
                    break;
                case 'UN':
                    daysUN ++;
                    break;
            }   
        })
        setDaysM(daysM);
        setDaysT(daysT);
        setDaysN(daysN);
        setDaysUN(daysUN);
    }

    const loadDay = (i) => {
        setDay(i);
        setEmployee(null);
        let deliverysM = 0, deliverysT = 0, deliverysN = 0, deliverysUN = 0, cashiersM = 0, cashiersT = 0, cashiersN = 0, cashiersUN = 0, pubAtM = 0, pubAtT = 0, pubAtN = 0, pubAtUN = 0;
        employees.forEach((employee) => {
            switch(document.getElementById(`inputTurn${employee.dni}_${i}`).value){
                case 'M':
                    if(employee.name_charge === 'Delivery'){
                        deliverysM ++;
                    }else if(employee.name_charge === 'Cajera/o'){
                        cashiersM ++;
                    }else{
                        pubAtM ++;
                    }
                    break;
                case 'T':
                    if(employee.name_charge === 'Delivery'){
                        deliverysT ++;
                    }else if(employee.name_charge === 'Cajera/o'){
                        cashiersT ++;
                    }else{
                        pubAtT ++;
                    }
                    break;
                case 'N':
                    if(employee.name_charge === 'Delivery'){
                        deliverysN ++;
                    }else if(employee.name_charge === 'Cajera/o'){
                        cashiersN ++;
                    }else{
                        pubAtN ++;
                    }
                    break;
                case 'UN':
                    if(employee.name_charge === 'Delivery'){
                        deliverysUN ++;
                    }else if(employee.name_charge === 'Cajera/o'){
                        cashiersUN ++;
                    }else{
                        pubAtUN ++;
                    }
                    break;
            }
        })
        setDeliverysM(deliverysM);
        setDeliverysT(deliverysT);
        setDeliverysN(deliverysN);
        setDeliverysUN(deliverysUN);

        setCashiersM(cashiersM);
        setCashiersT(cashiersT);
        setCashiersN(cashiersN);
        setCashiersUN(cashiersUN);
        
        setPubAtM(pubAtM);
        setPubAtT(pubAtT);
        setPubAtN(pubAtN);
        setPubAtUN(pubAtUN);
    }

    const onChangeInputValue = (value,i,j) => {
        let newInputsValues = [];        
        inputsValues.forEach((inpVal) => {
            newInputsValues.push(inpVal.slice())
        })
        newInputsValues[i][j] = value;
        setInputsValues(newInputsValues);
    }

    const onChangeMonthYear = (inputValue) =>{
        let newYear = parseInt(inputValue.slice(0,4));
        let newMonth = parseInt(inputValue.slice(5,inputValue.length)) - 1;
        setEmployee(null);
        setDay(null);
        setMonth(newMonth);
        setYear(newYear);
        setFirstHalfMonth(false);
    }
    return(
        <>
            <div className="formRow">
                <input className="col-sm-2" type='month' onChange={(e) => {onChangeMonthYear(e.target.value)}} defaultValue={`${year}-${month<9?'0'+month+1:month+1}`}></input>
                <h1 className="col-sm-2 offset-sm-2">{showMeMonth(month)}</h1>
                <button className="btn offset-sm-2" onClick={() => {setFirstHalfMonth(true)}}> 1er Quincena</button>
                <button className="btn" onClick={() => {setFirstHalfMonth(false)}}> 2da Quincena</button>
            </div>
            <BeShowed show={employees}>
                <div className="formRow">
                    <div className="col-sm-10">
                        <BeShowed show={firstHalfMonth}>                
                            <Table style={{display: 'block', overflow: 'auto', height: '600px', width: '100%'}} >
                                <HeaderTable id="firstHeaderTableScheduleEmployee" style={{position: 'relative'}}
                                    th={
                                        <>
                                            <th scope="col" style={{ backgroundColor: 'gray', textAlign: 'center', verticalAlign: 'middle', backgroundColor: 'gray'}}>EMP.</th>
                                            {days?.map((day) => {
                                                if(day <= 15){
                                                    return(
                                                        <th key={day} style={{padding: '0px', verticalAlign: 'middle', textAlign: 'center', 
                                                                        backgroundColor: `${nonworkingDays.includes(day) || new Date(year,month,day).getDay() === 0?'#008F39':'gray'}`}}>
                                                            <button className="btn" onClick={() => {loadDay(day)}}>
                                                                <p>{nonworkingDays.includes(day)?'F':showMeDay(new Date(year,month,day).getDay()).slice(0,2)}</p>
                                                                <p>{day<10?`0${day}`:day}</p>
                                                            </button>
                                                        </th>
                                                        )
                                                }
                                            })}
                                        </>
                                    }
                                />
                                <BodyTable
                                    tbody={employees?.map((employee, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr id={`firstRowEmployee${employee.dni}`} className={`${showMeCharge(employee.name_charge)}`}>
                                                    <td style={{ verticalAlign: 'middle'}}>
                                                        <button className="btn" style={{width: '100%', borderStyle: 'none', borderColor:'none', textAlign: 'left'}} onClick={() => {loadEmployeeStats(i)}}>{employee.name}</button>
                                                    </td>
                                                    {days?.map((day) => {
                                                        if(day <= 15){
                                                            return(
                                                                <td key={day+i} style={{verticalAlign: 'middle', textAlign: 'center',
                                                                    backgroundColor: `${nonworkingDays.includes(day) || new Date(year,month,day).getDay() === 0?'#008F39':''}`}}>
                                                                    <input id={`inputTurn${employee.dni}_${day}`} type="text" maxLength="1" style={{textAlign:'center',width:'100%'}} onChange={(e) => {onChangeInputValue(e.target.value,i,day-1)}} value={inputsValues[i][day-1]}></input>
                                                                </td>
                                                            )
                                                        }                        
                                                    })}
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                />
                            </Table>
                        </BeShowed>
                        <BeShowed show={!firstHalfMonth}>  
                            <Table style={{display: 'block', overflow: 'auto', height: '600px'}} >
                                <HeaderTable id="secondHeaderTableScheduleEmployee" style={{position: 'sticky'}}
                                    th={
                                    <>
                                        <th scope="col" style={{ backgroundColor: 'gray', textAlign: 'center', verticalAlign: 'middle', backgroundColor: 'gray'}}>EMP.</th>
                                        {days?.map((day) => {
                                            if(day > 15){
                                                return(
                                                    <th key={day} style={{padding: '0px', verticalAlign: 'middle', textAlign: 'center', 
                                                            backgroundColor: `${nonworkingDays.includes(day) || new Date(year,month,day).getDay() === 0?'#008F39':'gray'}`}}>
                                                        <button className="btn" onClick={() => {loadDay(day)}}>
                                                            <p>{nonworkingDays.includes(day)?'F':showMeDay(new Date(year,month,day).getDay()).slice(0,2)}</p>
                                                            <p>{day<10?`0${day}`:day}</p>
                                                        </button>
                                                    </th>
                                                    )
                                            }
                                        })}
                                    </>
                                    }
                                />
                                <BodyTable
                                    tbody={employees?.map((employee, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr id={`secondRowEmployee${employee.dni}`} className={`${showMeCharge(employee.name_charge)}`}>
                                                    <td style={{ verticalAlign: 'middle'}}>
                                                        <button className="btn" style={{width: '100%', borderStyle: 'none', borderColor:'none', textAlign: 'left'}} onClick={() => {loadEmployeeStats(i)}}>{employee.name}</button>
                                                    </td>
                                                    {days?.map((day) => {
                                                        if(day > 15){
                                                            return(
                                                                <td key={day+i} style={{verticalAlign: 'middle', textAlign: 'center',
                                                                        backgroundColor: `${nonworkingDays.includes(day) || new Date(year,month,day).getDay() === 0?'#008F39':''}`}}>
                                                                    <input id={`inputTurn${employee.dni}_${day}`} type="text" maxLength="1" style={{textAlign:'center',width:'100%'}} onChange={(e) => {onChangeInputValue(e.target.value,i,day-1)}} value={inputsValues[i][day-1]}></input>
                                                                </td>
                                                            )
                                                        }                        
                                                    })}
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                />
                            </Table>
                        </BeShowed>
                    </div>
                    <BeShowed show={employee}>
                        <div style={{paddingLeft: '2%'}}>
                            <label><b>{employee?.name.toUpperCase()}</b></label>
                            <div className="formRow">
                                <label style={{fontSize: 15}}>Mañanas: &nbsp;{daysM}</label>
                            </div>
                            <div className="formRow">
                                <label style={{fontSize: 15}}>Tardes: &nbsp;{daysT}</label>
                            </div>
                            <div className="formRow">
                                <label style={{fontSize: 15}}>Noches: &nbsp;{daysN}</label>
                            </div>
                            <div className="formRow">
                                <label style={{fontSize: 15}}>U. Noches: &nbsp;{daysUN}</label>
                            </div>
                            <div className="formRow">
                                <label style={{fontSize: 15}}>Dias trabajados: &nbsp;{daysM + daysT + daysN + daysUN}</label>
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
                                <label style={{fontSize: 15}}>Deliverys: &nbsp;{deliverysM}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Cajeros: &nbsp;{cashiersM}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>At. Público: &nbsp;{pubAtM}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Personas: &nbsp;{deliverysM + cashiersM + pubAtM}</label>
                            </div>
                            <div className="formRow" style={{marginBottom: '3px'}}>
                                <label>TARDE</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Deliverys: &nbsp;{deliverysT}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Cajeros: &nbsp;{cashiersT}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>At. Público: &nbsp;{pubAtT}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Personas: &nbsp;{deliverysT + cashiersT + pubAtT}</label>
                            </div>
                            <div className="formRow" style={{marginBottom: '3px'}}>
                                <label>NOCHE</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Deliverys: &nbsp;{deliverysN}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Cajeros: &nbsp;{cashiersN}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>At. Público: &nbsp;{pubAtN}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Personas: &nbsp;{deliverysN + cashiersN + pubAtN}</label>
                            </div>
                            <div className="formRow" style={{marginBottom: '3px'}}>
                                <label>U. NOCHE</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Deliverys: &nbsp;{deliverysUN}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Cajeros: &nbsp;{cashiersUN}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>At. Público: &nbsp;{pubAtUN}</label>
                            </div>
                            <div className="formRow" style={{margin:'0px'}}>
                                <label style={{fontSize: 15}}>Personas: &nbsp;{deliverysUN + cashiersUN + pubAtUN}</label>
                            </div>
                        </div>
                    </BeShowed>
                </div>    
            </BeShowed>
            <div className='col-sm-10'>
                <BeShowed show={!employees}>
                    <LoaderSpinner color="secondary" loading="Cargando grilla"/>
                </BeShowed>
            </div>
        </>
    )
}

export default TableScheduleEmployees;