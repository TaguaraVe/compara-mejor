'use cliente';
import Link from 'next/link';

interface Category {
  categoryName: string;
  id: string;
  slug: string;
}

interface CategoriesProps {
  categories: CategoriesProps[];
}
const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div className="mb-8 rounded-lg  bg-myPurple bg-opacity-40 p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>
      {categories.map((category, index) => (
        <Link key={category.id} href={`/category/${category.slug}`} passHref>
          <span
            className={`block cursor-pointer ${
              index === categories.length - 1 ? 'border-b-0' : 'border-b'
            } mb-3 pb-3`}
          >
            {category.categoryName}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
