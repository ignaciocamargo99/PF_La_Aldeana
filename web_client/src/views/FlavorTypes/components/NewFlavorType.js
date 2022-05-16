import React from 'react'
import FlavorTypeForm from './FlavorTypeForm'
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';

const NewFlavorType = () => {
  const onSubmitRegisterFlavorType = async (formData) => {
    const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Registrar "${formData.name}"?`)).isConfirmed;

    if (registrationConfirmed) {
      // to do
    }
  }

  return (
    <FlavorTypeForm
      onSubmit={onSubmitRegisterFlavorType}
      submitBtnText='Registrar'
      breadcrumbName='Nuevo tipo'
      formTitle='Registrar tipo de sabor'
    />
  )
}

export default NewFlavorType