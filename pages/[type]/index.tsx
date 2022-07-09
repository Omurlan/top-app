import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { withLayout } from "../../layout/Layout";
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { API } from "../../helpers/api";

function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>Type {firstCategory}</>;
}

export default withLayout(Type);

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
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

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: firstLevelMenu.map((m) => `/${m.route}`),
  fallback: true,
});
