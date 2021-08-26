import React from 'react';

function Table(props){
  return (
    <div className="table-responsive-md">
        <table className="table table-control table-hover" style={props.style} >
            {props.children} 
        </table>
    </div>
  );
}

export default Table;