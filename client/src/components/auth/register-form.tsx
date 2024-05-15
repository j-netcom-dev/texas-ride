"use client";

import React, { useState } from 'react';
import { UserContactsForm, UserNameForm, UserPasswordForm } from './register';
import { AnimatePresence } from 'framer-motion';


const RegisterForm = () => {
  const [step, setStep] =useState(0);
  const handleSubmit =() =>{
    console.log("Submitted");
    
  }
  return  <AnimatePresence mode='wait'>
    {step ==1? <UserContactsForm step={step} setStep={setStep}/>: step ==2? <UserPasswordForm step={step} setStep={setStep}/>: <UserNameForm step={step} setStep={setStep}/>}
  </AnimatePresence>
}

export default RegisterForm;