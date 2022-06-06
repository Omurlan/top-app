import React, { useEffect, useState, KeyboardEvent } from 'react';
import cn from 'classnames';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';

export function Rating({
  isEditable, setRating, rating, ...props
}:RatingProps): JSX.Element {
  const [ratingArray, setRaitingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const changeDisplay = (rat: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(rat);
  };

  const onClick = (rat: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(rat);
  };

  const handleSpace = (rat: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code !== 'Space' || !setRating) {
      return;
    }
    setRating(rat);
  };

  const constructRating = (currentRating:number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i:number) => (
      <span
        className={cn(styles.star, {
          [styles.filled]: i < currentRating,
          [styles.editable]: isEditable,
        })}
        onMouseEnter={() => changeDisplay(i + 1)}
        onMouseLeave={() => changeDisplay(rating)}
        onClick={() => onClick(i + 1)}
      >
        <StarIcon
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
        />
      </span>
    ));
    setRaitingArray(updatedArray);
  };

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div {...props}>
      {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
    </div>
  );
}
