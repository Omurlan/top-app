import React from 'react';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import styles from './Sidebar.module.css';

export function Header({ ...props }: HeaderProps): JSX.Element {
  return (
    <div {...props}>
      Header
    </div>
  );
}
