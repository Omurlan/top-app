import React, { useEffect } from 'react';
import cn from 'classnames';
import { motion, useMotionValue } from 'framer-motion';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';

export function Button({
  appearance, arrow = 'none', children, className, ...props
}:ButtonProps): JSX.Element {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      type="button"
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
      <span className={cn(styles.arrow, {
        [styles.down]: arrow === 'down',
        [styles.right]: arrow === 'right',
      })}
      >
        <ArrowIcon />
      </span>
      )}
    </motion.button>
  );
}
