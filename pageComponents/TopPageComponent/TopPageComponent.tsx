import React, { useEffect, useReducer } from "react";
import cn from "classnames";

import { useReducedMotion } from "framer-motion";
import styles from "./TopPageComponent.module.css";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Advantages, HhData, Htag, Product, Sort, Tag } from "../../components";
import { TopLevelCategoryEnums } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { sortReducer } from "./sort.reducer";

export function TopPageComponent({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    { products, sort: SortEnum.Rating }
  );

  const shouldReduceMotion = useReducedMotion();

  const setSort = (sor: SortEnum) => {
    dispatchSort({ type: sor });
  };

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        <Tag color="gray" size="m" aria-label={`${products.length}элементов`}>
          {products && products.length}
        </Tag>
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts &&
          sortedProducts.map((p) => (
            // eslint-disable-next-line no-unneeded-ternary
            <Product
              role="listitem"
              layout={!shouldReduceMotion}
              key={p._id}
              product={p}
            />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategoryEnums.Courses && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
}
