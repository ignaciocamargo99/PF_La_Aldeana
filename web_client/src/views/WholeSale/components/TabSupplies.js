import React from 'react'

const TabSupplies = ({ showTab }) => {

  console.log('TabSupplies');

  return (
    <>
      {showTab && (
        <>
          <h3 className="mt-2 ">Insumos</h3>
          <>
            En desarrollo...
          </>
          <h3 className="mt-2 ">Detalle de Insumos</h3>
          <>
            En desarrollo...
          </>
        </>
      )}
    </>
  )
}

export default TabSupplies