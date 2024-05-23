"use client";

import React, { useState } from 'react';
import { UserContactsForm, UserNameForm, UserPasswordForm } from './register';
import { AnimatePresence } from 'framer-motion';
import UserRole from './register/user-role';
import Success from './register/success-screen';


const RegisterForm = () => {
  const [step, setStep] =useState(0);
  const handleSubmit =() =>{
    console.log("Submitted");
    
  }
  return  step ==0? <UserRole step={step} setStep={setStep}/>: 
  (<AnimatePresence mode='wait'>
    {step ==1?<UserNameForm step={step} setStep={setStep}/>: step ==2? <UserContactsForm step={step} setStep={setStep}/>: step ==3? <UserPasswordForm step={step} setStep={setStep}/>: <Success />}
  </AnimatePresence>)
}

export default RegisterForm;