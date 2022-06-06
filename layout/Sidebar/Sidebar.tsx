import React from 'react';
import cn from 'classnames';
import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';

export function Sidebar({ ...props }: SidebarProps): JSX.Element {
  return (
    <div {...props}>
      Sidebar
    </div>
  );
}
