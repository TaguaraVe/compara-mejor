import Categories from '@/components/posts/categoties';
import PostCard from '@/components/posts/postcard';
import PostWidget from '@/components/posts/postwidget';
import {
  getAllPosts,
  getCategories,
  getSimilarPosts,
} from '@/libs/postsHygraph';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="col-span-1 grid grid-cols-1 gap-4 lg:col-span-9 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="relative top-8 lg:sticky">
            <Categories categories={categories} />
            <PostWidget posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
