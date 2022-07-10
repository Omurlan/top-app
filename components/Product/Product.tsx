/* eslint-disable react/function-component-definition */
import React, { ForwardedRef, forwardRef, useRef, useState } from "react";
import cn from "classnames";
import Image, { ImageLoaderProps } from "next/image";
import { motion } from "framer-motion";
import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { decOfNum, priceRu } from "../../helpers/helpers";
import { Divider } from "../Divider/Divider";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";

const myLoader = ({ src, width }: ImageLoaderProps) => `${src}?w=${width}`;

export const Product = motion(
  forwardRef(
    (
      { children, product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: {
          opacity: 1,
          height: "auto",
        },
        hidden: {
          opacity: 0,
          height: 0,
        },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

      return (
        <div ref={ref} className={className} {...props}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <img
                // loader={myLoader}
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className="visualyHidden">цена</span>
                {priceRu(product.price)}
              </span>

              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  <span className="visualyHidden">скидка</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visualyHidden">кредит</span>
              {priceRu(product.credit)}/
              <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className="visualyHidden">
                {`рейтинг ${product.reviewAvg ?? product.initialRating}`}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((category) => (
                <Tag key={category} className={styles.category} color="ghost">
                  {category}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden>
              Цена
            </div>
            <div className={styles.creditTitle} aria-hidden>
              кредит
            </div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}{" "}
                {decOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((c) => (
                <div key={c.name} className={styles.characteristics}>
                  <span className={styles.characteristicsName}>{c.name}</span>
                  <span className={styles.characteristicsDots} />
                  <span className={styles.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}

              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={styles.reviewButton}
                onClick={() => setIsReviewOpened((prev) => !prev)}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isReviewOpened ? "visible" : "hidden"}
          >
            <Card
              ref={reviewRef}
              color="blue"
              className={styles.reviews}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <Review review={review} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
