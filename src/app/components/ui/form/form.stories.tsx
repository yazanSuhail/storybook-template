// form/CustomForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FieldProps, UserFormData } from './types'; 
import { CustomFormWithUserFormData } from './Wrapper';

const meta = {
  title: 'Example/CustomForm',
  component: CustomFormWithUserFormData,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### CustomForm Component

The \`CustomForm\` component is a highly customizable form built with React, TypeScript, Next.js, and Tailwind CSS. It allows dynamic definition of form fields, handling validations, and integrates seamlessly with your application's backend.

#### Features:
- **Dynamic Fields:** Define any number of form fields with various types (text, email, password, textarea, select).
- **Validation:** Utilize React Hook Form's robust validation mechanisms.
- **Customization:** Tailwind CSS classes and additional props allow for extensive styling and customization.
- **Responsive Layout:** Automatically adjusts form layout for different screen sizes.
- **Individual Border Radii:** Customize border radii for each corner of input fields individually.
- **Storybook Integration:** Easily test and visualize different form states using Storybook.

#### Usage:
To use the \`CustomForm\` component, import it into your Next.js page or component, define your form fields, and handle the form submission as needed.

\`\`\`tsx
import React from 'react';
import { CustomFormWithUserFormData } from '../components/form/CustomFormWithUserFormData';
import { UserFormData, FieldProps } from '../components/form/types';

const RegisterPage = () => {
  const fields: FieldProps<UserFormData>[] = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
      validation: { required: 'First name is required' },
      borderTopLeftRadius: 6,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 10,
    },
    // ...other fields
  ];

  const handleSubmit = (data: UserFormData) => {
    // Handle form submission
    console.log('Form Submitted:', data);
  };

  return (
    <CustomFormWithUserFormData
      onSubmit={handleSubmit}
      fields={fields}
      defaultValues={{}}
      className="your-custom-classes"
      containerBgColor="#F9FAFB"
      containerPadding="p-8"
      inputBgColor="#FFFFFF"
      inputBorderColor="#D1D5DB"
      inputBorderRadius={6}
      labelColor="#374151"
      buttonProps={{
        label: "Register",
        backgroundColor: "#4CAF50",
        hoverColor: "#45a049",
        labelColor: "#fff",
        hoverLabelColor: "#fff",
        hoverBorder: true,
        hoverBorderColor: "#388E3C",
        hoverBorderWidth: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        size: 'large',
        wide: 'medium',
        coffeeEffect: false,
        // ... any other Button props
      }}
    />
  );
};

export default RegisterPage;
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    onSubmit: { action: 'submitted', description: 'Function to handle form submission.' },
    defaultValues: { control: 'object', description: 'Initial values for the form fields.' },
    fields: { control: 'object', description: 'Array of field definitions to render the form.' },
    className: { control: 'text', description: 'Custom CSS classes for the form container.' },
    formProps: { control: 'object', description: 'Additional props to pass to the <form> element.' },
    showCheckbox: {
      control: { type: 'boolean' },
      description: 'Show or hide the optional checkbox.',
      defaultValue: false,
    },
    checkboxLabel: {
      control: { type: 'text' },
      description: 'Label for the optional checkbox.',
      defaultValue: 'I agree to the terms and conditions',
    },
    disclaimerText: {
      control: { type: 'text' },
      description: 'Disclaimer text displayed below the checkbox.',
      defaultValue: 'By submitting this form, you agree to our terms and conditions.',
    },
    checkboxName: {
      control: { type: 'text' },
      description: 'Name of the checkbox field in form data.',
      defaultValue: 'agreeToTerms',
    },
    // Styling Props
    containerBgColor: { control: 'color', description: 'Background color of the form container.' },
    containerPadding: { control: 'text', description: 'Padding classes for the form container (Tailwind CSS).' },
    inputBgColor: { control: 'color', description: 'Background color of input fields.' },
    inputBorderColor: { control: 'color', description: 'Border color of input fields.' },
    inputBorderRadius: { control: 'number', description: 'Default border radius of input fields in pixels.' },
    labelColor: { control: 'color', description: 'Color of the label text.' },
    buttonAlignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Align the submit button to the left, center, or right.',
      defaultValue: 'center',
    },
    // Button Props
    buttonProps: {
      control: 'object',
      description: 'Props to pass to the submit Button component.',
      table: {
        type: { summary: 'ButtonProps' },
      },
    },
  },
  args: {
    onSubmit: action('onSubmit')
  },
} satisfies Meta<typeof CustomFormWithUserFormData>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * **Grid Layout Test Story**
 *
 * This story tests the grid layout by assigning different gridColumnSpan values to form fields.
 */
export const GridLayoutTest: Story = {
  args: {
    onSubmit: action('Form Submitted'),

    fields: [{
      "name": "firstName",
      "label": "First Name",
      "placeholder": "First name",
      "required": true,

      "validation": {
        "maxLength": {
          "value": 50,
          "message": "Maximum 50 characters"
        }
      },

      "gridColumnSpan": 1,
      "borderTopLeftRadius": 0,
      "borderTopRightRadius": 10,
      "borderBottomLeftRadius": 10,
      "borderBottomRightRadius": 0
    }, {
      "name": "lastName",
      "label": "Last Name",
      "placeholder": "Enter your last name",
      "required": true,

      "validation": {
        "maxLength": {
          "value": 50,
          "message": "Maximum 50 characters"
        }
      },
      "gridColumnSpan": 1,
      "borderTopLeftRadius": 0,
      "borderTopRightRadius": 10,
      "borderBottomLeftRadius": 10,
      "borderBottomRightRadius": 0
    }, {
      "name": "email",
      "label": "Email",
      "type": "email",
      "placeholder": "Enter your email",
      "required": true,
      "validation": {
        pattern: {
          value: /^\S+@\S+$/i,
          message: 'Invalid email address',
        },
      },
      "gridColumnSpan": 2,
      "borderTopLeftRadius": 0,
      "borderTopRightRadius": 10,
      "borderBottomLeftRadius": 10,
      "borderBottomRightRadius": 0
    }],

    defaultValues: {},
    className: "max-w-2xl mx-auto ml-20",

    // Styling Props
    containerBgColor: '#FFFFFF',

    containerPadding: 'p-6 sm:p-8',
    inputBgColor: "#F2EAEA",
    inputBorderColor: "#F2EAEA",
    inputBorderRadius: 10,
    labelColor: '#374151',
    formProps: {},
    showShadow: true,
    showBorders: true,

    // Button Props
    buttonProps: {
      label: "Submit",
      backgroundColor: "#A020F0",
      hoverColor: "#fff",
      labelColor: "#fff",
      hoverLabelColor: "#A020F0",
      hoverBorder: true,
      hoverBorderColor: "#A020F0",
      hoverBorderWidth: 2,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 0,
      size: "large",
      wide: "large",
      coffeeEffect: true,
      animationDuration: "0.5",
    },

    buttonAlignment: "left",
    showCheckbox: false,
    checkboxLabel: ""
  },
};

/**
 * **Single Column Layout Story**
 *
 * This story ensures that each input field occupies its own row by spanning all available columns.
 */
export const SingleColumnLayout: Story = {
  args: {
    onSubmit: action('Form Submitted'),
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter your first name',
        validation: { required: 'First name is required' },
        gridColumnSpan: 2, // Spans 2 columns to occupy full width
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        validation: { required: 'Last name is required' },
        gridColumnSpan: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validation: {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        },
        gridColumnSpan: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        validation: { required: 'Password is required' },
        gridColumnSpan: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
      {
        name: 'bio',
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Tell us about yourself',
        validation: {
          required: 'Bio is required',
          maxLength: {
            value: 500,
            message: 'Bio must be under 500 characters',
          },
        },
        gridColumnSpan: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
      {
        name: 'country',
        label: 'Country',
        type: 'select',
        options: [
          { value: '', label: 'Select your country' },
          { value: 'usa', label: 'United States' },
          { value: 'canada', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
        ],
        validation: { required: 'Country is required' },
        gridColumnSpan: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
    ] as FieldProps<UserFormData>[],
    defaultValues: {},
    className: 'max-w-2xl mx-auto',
    // Styling Props
    containerBgColor: '#FFFFFF',
    containerPadding: 'p-6 sm:p-8',
    inputBgColor: '#F9FAFB',
    inputBorderColor: '#D1D5DB',
    inputBorderRadius: 8,
    labelColor: '#374151',
    showShadow:true,
    showBorders:true,
    buttonAlignment:"center",
    // Button Props
    buttonProps: {
      label: "Submit",
      type: "submit",
      size: 'large',
      hoverLabelColor: "#FFFFFF",
      labelColor: "#000000",
      hoverColor: "#000000",
      hoverBorder: true,
      hoverBorderColor: "#0000FF",
      hoverBorderWidth: 2,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      wide: "large",
      coffeeEffect: false,
    },
  },
};