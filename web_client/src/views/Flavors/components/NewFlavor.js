import React from 'react'
import FlavorForm from './FlavorForm'

const NewFlavor = () => {
  const onSubmitRegisterFlavor = () => {
    alert('Ups! En desarrollo.')
  }

  return (
    <FlavorForm
      breadcrumbName={'Nuevo sabor'}
      formTitle={'Registrar sabor'}
      submitBtnText={'Registrar'}
      onSubmit={onSubmitRegisterFlavor}
    ></FlavorForm>
  )
}

export default NewFlavor;
