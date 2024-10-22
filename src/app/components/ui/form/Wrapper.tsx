// CustomFormWithUserFormData.tsx
import React from 'react';
import { CustomForm } from './form';
import { FormProps, UserFormData } from './types'; 

export const CustomFormWithUserFormData = (props: FormProps<UserFormData>) => {
  return <CustomForm<UserFormData> {...props} />;
};