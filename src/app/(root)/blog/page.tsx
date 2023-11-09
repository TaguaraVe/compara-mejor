import PostCard from '@/components/posts/postcard';
import { getAllPosts } from '@/libs/postsHygraph';

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <div className="col-span-1 grid grid-cols-1 gap-4 lg:col-span-9 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
