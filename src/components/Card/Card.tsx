import React, { FC, ReactNode } from 'react';

import cs from 'classnames';

import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return <div className={cs(styles.card, className)}>{children}</div>;
};
