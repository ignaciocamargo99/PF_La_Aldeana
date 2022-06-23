import React from 'react'

const TabTransport = ({ showTab }) => {

  console.log('TabTransport');

  return (
    <>
      {showTab && (
        <>
          <h3 className="mt-2 ">Flete</h3>
          <>
            En desarrollo...
          </>
        </>
      )}
    </>
  )
}

export default TabTransport