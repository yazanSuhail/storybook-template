export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  hoverColor?: string;
  hoverLabelColor?: string;
  animationDuration?: string;
  label?: string;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  onClick?: () => void;
  wide?: 'small' | 'medium' | 'large';
  TailWindCssClasses?: string;
  labelColor?: string;
  hoverBorder?: boolean;
  hoverBorderColor?: string;
  hoverBorderWidth?: number;
  fontWeight?: 'normal' | 'bold';
  coffeeEffect?: boolean;
  type?: 'button' | 'submit' | 'reset';
    
}