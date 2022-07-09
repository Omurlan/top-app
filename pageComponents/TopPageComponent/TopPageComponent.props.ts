import { TopLevelCategoryEnums, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export interface TopPageComponentProps extends Record<string, unknown> {
  firstCategory: TopLevelCategoryEnums,
  page: TopPageModel,
  products: ProductModel[],
}
