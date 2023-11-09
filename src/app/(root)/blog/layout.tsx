import {
  getAllPosts,
  getCategories,
  getSimilarPosts,
} from '@/libs/postsHygraph';

import Categories from '@/components/posts/categoties';
import PostWidget from '@/components/posts/postwidget';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getAllPosts();
  const categories = await getCategories();
  return (
    <section>
      <div className="container mx-auto my-8 px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {children}
          <div className="col-span-1 lg:col-span-3">
            <div className="relative top-8 lg:sticky">
              <Categories categories={categories} />
              <PostWidget posts={posts} />{' '}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
