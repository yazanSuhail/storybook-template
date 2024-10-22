import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithCustomHoverCoffeeEffect } from './ButtonWithCustomHoverCoffeeEffect';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Example/ButtonWithCustomHoverCoffeeEffect',
  component: ButtonWithCustomHoverCoffeeEffect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    TailWindCssClasses: { control: 'text' },
    backgroundColor: { control: 'color' },
    hoverColor: { control: 'color' },
    labelColor: { control: 'color' },
    hoverLabelColor: { control: 'color' },
    hoverBorder: { control: 'boolean' },
    hoverBorderColor: { control: 'color' },
    coffeeEffect: {
      control: 'boolean',
      description: 'Enable or disable the coffee hover effect',
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'bold'],
      description: 'Font weight of the label text',
    },
    hoverBorderWidth: {
      control: 'number',
      description: 'Border width of the hover effect in px',
    },
    animationDuration: { control: 'text' },
    borderTopLeftRadius: {
      control: 'number',
      description: 'Top left border radius in px',
    },
    borderTopRightRadius: {
      control: 'number',
      description: 'Top right border radius in px',
    },
    borderBottomLeftRadius: {
      control: 'number',
      description: 'Bottom left border radius in px',
    },
    borderBottomRightRadius: {
      control: 'number',
      description: 'Bottom right border radius in px',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    wide: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    primary: { control: 'boolean' },
    label: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: action('onClick'),
  },
} satisfies Meta<typeof ButtonWithCustomHoverCoffeeEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary button story with custom background and hover effects.
 */
export const Primary: Story = {
  args: {
    fontWeight: 'bold',
    primary: true,
    label: 'Primary Button',
    labelColor: '#FFFFFF',
    hoverLabelColor: '#A020F0',
    backgroundColor: '#A020F0',
    hoverColor: '#FFFFFF',
    hoverBorder: true,
    hoverBorderColor: '#A020F0',
    hoverBorderWidth: 2, 
    animationDuration: '1.5',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    size: 'large',
    wide: 'large',
    TailWindCssClasses: '',
  },
};

/**
 * Secondary button story with transparent background.
 */
export const Secondary: Story = {
  args: {
    fontWeight: 'normal',
    primary: false,
    coffeeEffect: false,
    label: 'Secondary',
    labelColor: '#EBEBEB',
    hoverLabelColor: '#A020F0',
    backgroundColor: '#130F0F',
    hoverColor: '#FFFFFF',
    hoverBorder: true,
    hoverBorderColor: '#A020F0',
    hoverBorderWidth: 2, 
    animationDuration: '0.1',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    size: 'medium',
    wide: 'large',
    TailWindCssClasses: '',
  },
};

/**
 * Large button story.
 */
export const Large: Story = {
  args: {
    fontWeight: 'bold',
    primary: true,
    coffeeEffect: false,
    label: "Submit",
    labelColor: "#eeeded",
    hoverLabelColor: "#ffffff",
    backgroundColor: "#5170f3",
    hoverColor: "#438acc",
    hoverBorder: true,
    hoverBorderColor: "transparent",
    hoverBorderWidth: 1, // Default border width
    animationDuration: "00.4",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    size: 'large',
    wide: "large",
    TailWindCssClasses: '',
  },
};

/**
 * Small button story.
 */
export const Small: Story = {
  args: {
    fontWeight: 'bold',
    primary: false,
    coffeeEffect: true,
    label: 'Small Button',
    labelColor: '#FFFFFF',
    hoverLabelColor: '#000000',
    backgroundColor: '#A020F0',
    hoverColor: '#FF4500',
    hoverBorder: false,
    hoverBorderColor: '#FFFFFF',
    hoverBorderWidth: 1, 
    animationDuration: '1',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    size: 'small',
    wide: 'small',
    TailWindCssClasses: '',
  },
};