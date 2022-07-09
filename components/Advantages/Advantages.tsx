import React from 'react';
import cn from 'classnames';
import CheckIcon from './check.svg';

import styles from './Advantages.module.css';
import { AdvantagesProps } from './Advantages.props';

export function Advantages({ advantages }:AdvantagesProps): JSX.Element {
  return (
    <>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div>{a.description}</div>
        </div>
      ))}
    </>
  );
}
