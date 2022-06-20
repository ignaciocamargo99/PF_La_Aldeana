import React from 'react'

const TabSummary = ({ showTab }) => {
  return (
    <>
      {showTab && (
        <>
          En desarrollo...
        </>
      )}
    </>
  )
}

export default TabSummary