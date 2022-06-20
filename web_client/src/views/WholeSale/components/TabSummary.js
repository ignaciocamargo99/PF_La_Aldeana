import React from 'react'

const TabSummary = ({ showTab }) => {

  console.log('TabSummary');

  return (
    <>
      {showTab && (
        <>
          <h3 className="mt-2 ">Resumen</h3>
          <>
            En desarrollo...
          </>
        </>
      )}
    </>
  )
}

export default TabSummary