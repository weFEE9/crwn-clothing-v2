import { Category } from '../category-item/category-item.component';
import CategoryItem from '../category-item/category-item.component';

import './category-list.styles.scss';

type CategoryListProps = {
  categories: Category[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className='categories-container'>
      {categories.map((category) => {
        return <CategoryItem category={category} />;
      })}
    </div>
  );
};

export default CategoryList;
