import React from 'react'

const TabSummary = ({ showTab }) => {

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