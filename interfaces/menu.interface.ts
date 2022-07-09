import { TopLevelCategoryEnums } from './page.interface';

// Главная категория (1 уровень из 3)
export interface FirstLevelMenuItem {
  route: string;
  name: string;
  icon: JSX.Element;
  id: TopLevelCategoryEnums;
}

// Подкатегория (2 уровень из 3)
export interface MenuItem {
  _id: {
    secondCategory: string;
  },
  isOpened?: boolean;
  pages: PageItem[];
}

// Под-подкатегория (3 уровень из 3)
export interface PageItem {
  alias: string;
  title: string;
  _id: string;
  category: string;
}
