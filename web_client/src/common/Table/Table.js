import React from 'react';

function Table(props){
  return (
    <div className="table-responsive">
        <table className="table" style={props.style} >
            {props.children} 
        </table>
    </div>
  );
}

export default Table;