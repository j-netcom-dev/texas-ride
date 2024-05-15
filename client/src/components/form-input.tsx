import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputPropTypes {
  name: string, type?: string, label?: string,
  placehoder?: string, errors?: Record<string, any>,
  validations?: Record<string, any>, register: UseFormRegister<FieldValues>,
}

const FormInput = ({name, type ='text', label, placehoder, validations ={}, errors ={}, register}: InputPropTypes) => {
  return (
    <div className="flex flex-col gap-1">
        {label &&<label className='block text-black' htmlFor={name}>{label}{validations?.required && '*'}</label>}
        <input className ={`border ${errors[name]? 'border-red-400': 'border-[#12121225]'} px-4 py-2 rounded-md block`} {...register(name, validations)} type={type} placeholder={placehoder}/>
        {errors[name] &&<small className='block text-red-400 text-sm '>{(errors[name]?.message || errors[name]) || "Invalid input value"}</small>}
    </div>
  )
}

export default FormInput;