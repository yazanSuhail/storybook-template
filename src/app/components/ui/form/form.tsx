// form/form.tsx

import React, { useState, useMemo } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { ButtonWithCustomHoverCoffeeEffect } from '../button/ButtonWithCustomHoverCoffeeEffect';
import { FormProps, StringFieldKeys } from './types'; // Removed static validationSchema import
import DOMPurify from 'dompurify';
import { yupResolver } from '@hookform/resolvers/yup';
import { twMerge } from 'tailwind-merge'; 
import * as yup from 'yup';

// Helper function to build dynamic Yup schema
const buildValidationSchema = <TFieldValues extends FieldValues>(fields: FormProps<TFieldValues>['fields']) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shape: Record<string, any> = {};

  fields.forEach(field => {
    let validator: yup.AnySchema;

    // Define base validator based on field type
    switch (field.type) {
      case 'email':
        validator = yup.string().email('Invalid email address');
        break;
      case 'number':
        validator = yup.number().typeError('Must be a number');
        break;
      case 'password':
        validator = yup.string();
        break;
      case 'select':
        validator = yup.string().oneOf(field.options?.map(opt => opt.value) || [], 'Invalid selection');
        break;
      case 'textarea':
      case 'text':
      default:
        validator = yup.string();
    }

    // Apply requiredness
    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    } else {
      validator = validator.notRequired();
    }

    // Apply additional validation rules from 'validation' prop
    if (field.validation) {
      // Handle min
      if (field.validation.min !== undefined) {
        if (typeof field.validation.min === 'object' && 'value' in field.validation.min) {
          const { value, message } = field.validation.min;
          if (field.type === 'number') {
            validator = (validator as yup.NumberSchema).min(value, message);
          } else {
            validator = (validator as yup.StringSchema).min(value, message);
          }
        } else {
          const value = field.validation.min;
          if (field.type === 'number') {
            validator = (validator as yup.NumberSchema).min(value);
          } else {
            validator = (validator as yup.StringSchema).min(value);
          }
        }
      }

      // Handle max
      if (field.validation.max !== undefined) {
        if (typeof field.validation.max === 'object' && 'value' in field.validation.max) {
          const { value, message } = field.validation.max;
          if (field.type === 'number') {
            validator = (validator as yup.NumberSchema).max(value, message);
          } else {
            validator = (validator as yup.StringSchema).max(value, message);
          }
        } else {
          const value = field.validation.max;
          if (field.type === 'number') {
            validator = (validator as yup.NumberSchema).max(value);
          } else {
            validator = (validator as yup.StringSchema).max(value);
          }
        }
      }

      // Handle pattern
      if (field.validation.pattern !== undefined) {
        if (field.validation.pattern instanceof RegExp) {
          validator = (validator as yup.StringSchema).matches(field.validation.pattern, 'Invalid format');
        } else if (typeof field.validation.pattern === 'object' && 'value' in field.validation.pattern) {
          const { value, message } = field.validation.pattern;
          validator = (validator as yup.StringSchema).matches(value, message);
        }
      }

      // Handle custom validate
      if (field.validation.validate !== undefined) {
        validator = (validator as yup.StringSchema).test('custom-validation', 'Invalid value', field.validation.validate as any);
      }
    }

    shape[field.name] = validator;
  });

  return yup.object().shape(shape);
};

export const CustomForm = <TFieldValues extends FieldValues>({
  onSubmit,
  defaultValues,
  fields,
  className,
  formProps,
  containerBgColor = '#FFFFFF',
  containerPadding = 'p-6',
  inputBgColor = '#F3F4F6',
  inputBorderColor = '#D1D5DB',
  inputBorderRadius = 4,
  labelColor = '#374151',
  buttonProps, 
  showShadow = true,    
  showBorders = true,   
  buttonAlignment = 'left',
  showCheckbox = true, 
  checkboxLabel = 'I agree to the terms and conditions', 
  disclaimerText = 'By submitting this form, you agree to our terms and conditions.', 
  checkboxName = 'agreeToTerms', 
}: FormProps<TFieldValues>) => {
  // Build dynamic validation schema
  const validationSchema = useMemo(() => buildValidationSchema(fields), [fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFieldValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [submittedData, setSubmittedData] = useState<TFieldValues | null>(null);
  
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  // Responsive grid layout classes
  const gridClasses = 'grid grid-cols-1 sm:grid-cols-2 gap-6';

  // Conditionally apply shadow and border classes
  const formContainerClasses = twMerge(
    `bg-[${containerBgColor}] ${containerPadding} rounded-lg`,
    showShadow ? 'shadow-md' : '',
    showBorders ? 'border border-gray-300' : '',
    gridClasses,
    className
  );

  // Function to sanitize all string fields
  const sanitizeFormData = (data: TFieldValues): TFieldValues => {
    const sanitizedData = { ...data };
    const stringKeys: StringFieldKeys[] = ['firstName', 'lastName', 'email', 'password', 'bio', 'country'];
    stringKeys.forEach((key) => {
      const value = sanitizedData[key];
      if (typeof value === 'string') {
        sanitizedData[key] = DOMPurify.sanitize(value);
      }
    });

    return sanitizedData;
  };

  // Custom submit handler that sanitizes data before submission
  const onFormSubmit: SubmitHandler<TFieldValues> = (data) => {
    const sanitizedData = sanitizeFormData(data);
    onSubmit(sanitizedData);
    setSubmittedData(sanitizedData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={formContainerClasses}
        {...formProps}
      >
        {fields.map((field) => {
          const {
            name,
            label,
            type = 'text',
            placeholder,
            options,
            className: fieldClassName,
            inputProps,
            textareaProps,
            selectProps,
            gridColumnSpan,
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            required, // New property
          } = field;

          const fieldError = errors[name];
          let spanClass = '';
          if (gridColumnSpan === 1) {
            spanClass = 'sm:col-span-1';
          } else if (gridColumnSpan === 2) {
            spanClass = 'sm:col-span-2';
          }

          // Dynamic input styles
          const inputStyles: React.CSSProperties = {
            backgroundColor: inputBgColor,
            borderColor: showBorders
              ? fieldError
                ? '#F87171' // Red border for errors
                : inputBorderColor
              : 'transparent', // Remove border color if borders are hidden
            borderRadius: `${!(
              borderTopLeftRadius ||
              borderTopRightRadius ||
              borderBottomLeftRadius ||
              borderBottomRightRadius
            )
              ? inputBorderRadius
              : undefined}px`,
          };

          // Inline styles for individual corner radii
          if (
            borderTopLeftRadius ||
            borderTopRightRadius ||
            borderBottomLeftRadius ||
            borderBottomRightRadius
          ) {
            Object.assign(inputStyles, {
              borderTopLeftRadius: borderTopLeftRadius
                ? `${borderTopLeftRadius}px`
                : undefined,
              borderTopRightRadius: borderTopRightRadius
                ? `${borderTopRightRadius}px`
                : undefined,
              borderBottomLeftRadius: borderBottomLeftRadius
                ? `${borderBottomLeftRadius}px`
                : undefined,
              borderBottomRightRadius: borderBottomRightRadius
                ? `${borderBottomRightRadius}px`
                : undefined,
            });
          }

          return (
            <div
              key={name as string}
              className={`mb-4 ${spanClass} ${fieldClassName}`}
            >
              <label
                htmlFor={name as string}
                className="block text-sm font-semibold mb-2"
                style={{ color: labelColor }}
              >
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              {type === 'select' ? (
                <select
                  id={name as string}
                  {...register(name)}
                  className={`shadow appearance-none ${
                    showBorders ? 'border' : ''
                  } w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  style={inputStyles}
                  {...selectProps}
                >
                  {options &&
                    options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              ) : type === 'textarea' ? (
                <textarea
                  id={name as string}
                  placeholder={placeholder}
                  {...register(name)}
                  className={`shadow appearance-none ${
                    showBorders ? 'border' : ''
                  } w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  style={inputStyles}
                  {...textareaProps}
                />
              ) : (
                <input
                  id={name as string}
                  type={type}
                  placeholder={placeholder}
                  {...register(name)}
                  className={`shadow appearance-none ${
                    showBorders ? 'border' : ''
                  } w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  style={inputStyles}
                  {...inputProps}
                />
              )}
              {fieldError && (
                <p className="text-red-500 text-xs italic mt-2">
                  {fieldError.message?.toString() || 'This field is required'}
                </p>
              )}
            </div>
          );
        })}

        {/* Optional Checkbox and Disclaimer */}
        {showCheckbox && (
          <div className="mb-4 sm:col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register(checkboxName)}
                className={`form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out ${
                  errors[checkboxName] ? 'border-red-500' : ''
                }`}
              />
              <span className="ml-2 text-sm" style={{ color: labelColor }}>
                {checkboxLabel}
              </span>
            </label>
            {disclaimerText && (
              <p className="text-xs text-gray-500 mt-1">
                {disclaimerText}
              </p>
            )}
            {errors[checkboxName] && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors[checkboxName]?.message?.toString() || 'This field is required'}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className={`col-span-full flex items-center mt-4 ${alignmentClasses[buttonAlignment]}`}>
          <ButtonWithCustomHoverCoffeeEffect
            label="Submit"
            type="submit"
            {...buttonProps}
          />
        </div>

        {/* Display Submitted Data */}
        {submittedData && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg ">
            <h2 className="text-lg font-semibold  mb-2">Submitted Data:</h2>
            <pre className="whitespace-pre bg-white p-2 rounded-md shadow-inner">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </>
  );
};