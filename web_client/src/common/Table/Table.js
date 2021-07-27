import React from 'react';
import '../../views/RegisterProduct/styles/ProductForm.css'

function Table(props){
  return (
    <div className="table-responsive">
        <table className="table table-control" style={props.style} >
            {props.children} 
        </table>
    </div>
  );
}

export default Table;