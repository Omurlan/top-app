import React from 'react';
import cn from 'classnames';
import { FooterProps } from './Footer.props';
import styles from './Sidebar.module.css';

export function Footer({ ...props }: FooterProps): JSX.Element {
  return (
    <div {...props}>
      Footer
    </div>
  );
}
