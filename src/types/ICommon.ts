import { ReactNode } from 'react';

// Button Interface
export interface IButtonProps {
  contents: string | JSX.Element;
  onClick?: () => void;
  submit?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  site?: string;
}

// Layout Interface
export interface ILayout {
  children: ReactNode;
  [key: string]: any;
}

// Dropdown Interface
export interface IDropdown {
  admin: boolean;
  label?: string;
  options: {
    [key: string]: string;
  };
}

export interface IPaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}
