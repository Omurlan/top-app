import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategoryEnums } from '../interfaces/page.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategoryEnums.Courses,
  },
  {
    route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategoryEnums.Services,
  },
  {
    route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategoryEnums.Books,
  },
  {
    route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategoryEnums.Products,
  },
];

export const priceRu = (price: number):string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

export const decOfNum = (number: number, title: [string, string, string]):string => {
  const cases = [2, 0, 1, 1, 1, 2];

  return title[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};
