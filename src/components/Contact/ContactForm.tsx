import { type Dispatch, type SetStateAction, useState } from 'react'
import { ContactButton } from './ContactButton'
import { ContactFormInput } from './ContactFormInput'
import { UserInformation } from './UserInformation'

import type { UserAuth } from 'utils/auth'
export type formDataTypes = {
  title: string
  administration: string
  message: string
  name: string
}

export function ContactForm({
  setUserAuth,
}: { setUserAuth: Dispatch<SetStateAction<UserAuth>> }) {
  const [formData, setFormData] = useState<formDataTypes>({
    title: '',
    administration: '',
    message: '',
    name: '',
  })
  const clearForm = () => {
    setFormData({ title: '', administration: '', message: '', name: '' })
  }
  return (
    <div className=" fr-container fr-my-3w ">
      <UserInformation formData={formData} setFormData={setFormData} />
      <ContactFormInput message={formData.message} setFormData={setFormData} />
      <ContactButton
        setUserAuth={setUserAuth}
        formData={formData}
        clearForm={clearForm}
      />
    </div>
  )
}
