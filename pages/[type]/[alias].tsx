import {
  GetStaticPaths, GetStaticProps, GetStaticPropsContext,
} from 'next';
import React from 'react';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategoryEnums, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { TopPageComponent } from '../../pageComponents';
import { API } from '../../helpers/api';
import { firstLevelMenu } from '../../helpers/helpers';

function TopPage({ products, firstCategory, page }: TopPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head>
      <TopPageComponent products={products} firstCategory={firstCategory} page={page} />
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id,
    });
    paths = paths.concat(menu.flatMap((me) => me.pages.map((p) => `/${m.route}/${p.alias}`)));
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });

    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10,
    });

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: TopLevelCategoryEnums,
  page: TopPageModel,
  products: ProductModel[],
}
