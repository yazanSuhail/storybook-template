// form/types.ts
import * as yup from 'yup';
import React from 'react';
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  Path,
  DefaultValues,
} from 'react-hook-form';
import { ButtonProps } from '../button/types'; 

export interface Option {
  value: string;
  label: string;
}

export enum GridSpan {
  ONE = 1,
  TWO = 2,
}

export type StringFieldKeys = {
  [K in keyof UserFormData]: UserFormData[K] extends string ? K : never
}[keyof UserFormData];


// form/types.ts
export type UserFormData = { 
  firstName: string;
  lastName: string;  
  email: string;     
  password: string; 
  bio: string;     
  country: string;   
  phoneNumber?: string;
  agreeToTerms?: boolean; 
};

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').max(50, 'Maximum 50 characters'),
  lastName: yup.string().required('Last name is required').max(50, 'Maximum 50 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Minimum 6 characters'),
  bio: yup.string().max(500, 'Bio must be under 500 characters').required('Bio must be under 500 characters'),
  country: yup.string().required('Country is required'),
  phonNumber: yup.string().optional(),
  agreeToTerms: yup.boolean().optional(), 
});

export interface FieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean; // New property to specify requiredness
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  options?: Option[];
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  gridColumnSpan?: number;

  // Properties for Border Radii
  borderTopLeftRadius?: number;  
  borderTopRightRadius?: number;    
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number; 
}

export type ButtonAlignment = 'left' | 'center' | 'right';

export interface FormProps<TFieldValues extends FieldValues> {
  onSubmit: SubmitHandler<TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  fields: FieldProps<TFieldValues>[];
  className?: string;
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
  // Styling Props
  containerBgColor?: string; // Background color for the form container
  containerPadding?: string; // Padding for the form container
  inputBgColor?: string;     // Background color for input fields
  inputBorderColor?: string; // Border color for input fields
  inputBorderRadius?: number; // Default border radius for input fields
  labelColor?: string;       // Label text color
  showShadow?: boolean;
  showBorders?: boolean; 
  buttonAlignment?: ButtonAlignment;
  buttonProps?: ButtonProps; // Props to pass to the Button component
    // New Props for Checkbox and Disclaimer
    showCheckbox?: boolean;          // Controls visibility of the checkbox
    checkboxLabel?: string;          // Label for the checkbox
    disclaimerText?: string;         // Disclaimer text below the checkbox
    checkboxName?: Path<TFieldValues>; // Name of the checkbox field in form data
}