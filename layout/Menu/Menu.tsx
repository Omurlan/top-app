/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';

export function Menu(): JSX.Element {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion ? {} : {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((m) => {
      if (m._id.secondCategory === secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened');
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => (
    <ul className={styles.firstLevelList}>
      {firstLevelMenu.map((m) => (
        <li key={m.route} aria-expanded={m.id === firstCategory}>
          <Link href={`/${m.route}`}>
            <a>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id === firstCategory,
              })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </a>
          </Link>

          {m.id === firstCategory && buildSecondLevel(m)}
        </li>
      ))}

    </ul>
  );

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => (
    <ul className={styles.secondBlock}>
      {menu.map((subM) => {
        if (subM.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
          subM.isOpened = true;
        }
        return (
          <li key={subM._id.secondCategory}>
            <button
              type="button"
              onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, subM._id.secondCategory)}
              className={styles.secondLevel}
              onClick={() => openSecondLevel(subM._id.secondCategory)}
              aria-expanded={subM.isOpened}
            >
              {subM._id.secondCategory}

            </button>
            <motion.ul
              layout
              variants={variants}
              initial={subM.isOpened ? 'visible' : 'hidden'}
              animate={subM.isOpened ? 'visible' : 'hidden'}
              className={cn(styles.secondLevelBlock)}
            >
              {buildThirdLevel(subM.pages, menuItem.route, subM.isOpened ?? false)}
            </motion.ul>
          </li>
        );
      })}
    </ul>
  );

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => pages.map((p) => (
    <motion.li key={p._id} variants={variantsChildren}>
      <Link href={`/${route}/${p.alias}`}>
        <a
          aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}
          tabIndex={isOpened ? 0 : -1}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
          })}
        >
          {p.category}
        </a>
      </Link>
    </motion.li>
  ));

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
      <span
        role="log"
        className="visualyHidden"
      >
        {announce === 'opened' ? 'развернуто' : 'свернуто'}
      </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
}
