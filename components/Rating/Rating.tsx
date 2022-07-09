/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  KeyboardEvent,
  ForwardedRef,
  forwardRef,
  useRef,
} from "react";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StarIcon from "./star.svg";

export const Rating = forwardRef(
  (
    { isEditable, setRating, error, rating, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRaitingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const changeDisplay = (rat: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(rat);
    };

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i === 0) {
        return tabIndex ?? 0;
      }
      if (r === i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const onClick = (rat: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(rat);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code === "ArrowRight" || e.code === "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }

      if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKey}
          ref={(re) => ratingArrayRef.current?.push(re)}
        >
          <StarIcon />
        </span>
      ));
      setRaitingArray(updatedArray);
    };

    return (
      <div
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
        {...props}
        ref={ref}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
