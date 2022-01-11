import React, { useEffect, useState } from 'react';
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import showMeDay from '../../../utils/ShowMeDay/showMeDay';
import showMeCharge from '../../../utils/ShowMeCharge/showMeCharge';

const TableScheduleEmployees = ({inputsValues,nonworkingDaysMonth,licensesMonth,setInputsValues,employees,year,month,firstHalfMonth}) => {
    
    const [lowLimit,setLowLimit] = useState(0);
    const [upLimit,setUpLimit] = useState(15);

    useEffect(() => {
        if(firstHalfMonth){
            setLowLimit(1);
            setUpLimit(15);
        }else{
            setLowLimit(16);
            setUpLimit(inputsValues[0].length);
        }
    },[firstHalfMonth])

    return(
        <Table style={{display: 'block', overflow: 'auto', height: '600px', width: '100%'}} >
            <HeaderTable
                th={
                    <>
                        <th scope="col" style={{ backgroundColor: 'gray', textAlign: 'center', verticalAlign: 'middle'}}>EMP.</th>
                        {inputsValues[0].map((iv,i) => {
                            if(lowLimit <=i+1 && i+1 <= upLimit){
                                return(
                                    <th key={i+1} style={{padding: '0px', verticalAlign: 'middle', textAlign: 'center', 
                                                    backgroundColor: `${nonworkingDaysMonth.includes(i+1) || new Date(year,month,i+1).getDay() === 0?'#008F39':'gray'}`}}>
                                        <button className="btn">
                                            <p>{nonworkingDaysMonth.includes(i+1)?'F':showMeDay(new Date(year,month,i+1).getDay()).slice(0,2)}</p>
                                            <p>{i<9?`0${i+1}`:i+1}</p>
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
                            <tr id={`rowEmployee${employee.dni}`} className={`${showMeCharge(employee.name_charge)}`}>
                                <td style={{ verticalAlign: 'middle'}}>
                                    <button className="btn" style={{width: '100%', borderStyle: 'none', borderColor:'none', textAlign: 'left'}} >{employee.name}</button>
                                </td>
                                {inputsValues[0].map((iv,j) => {
                                    if(lowLimit <= j+1 && j+1 <= upLimit){
                                        return(
                                            <td key={j+1+i} style={{verticalAlign: 'middle', textAlign: 'center',
                                                backgroundColor: `${nonworkingDaysMonth.includes(j+1) || new Date(year,month,j+1).getDay() === 0?'#008F39':''}`}}>
                                                <input type="text" maxLength="2" style={{textAlign:'center',width:'100%'}} disabled={inputsValues[i][j] === 'X'} value={inputsValues[i][j]}></input>
                                            </td>
                                        )
                                    }                        
                                })}
                            </tr>
                        </tbody>
                    )
                })}
            />
        </Table>)
}

export default TableScheduleEmployees;