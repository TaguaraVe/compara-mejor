'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PostWidget = ({ posts }) => {
  const [relatedPosts, setRelatedPosts] = useState(posts);

  return (
    <div className="mb-8 rounded-lg  bg-myPurple bg-opacity-40 p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Posts Recientes
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={post.id} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height={60}
              width={60}
              className="rounded-full align-middle"
              src={post.image.url}
            />
          </div>
          <div className="ml-4 flex-grow">
            <Link href={`/blog/${post.slug}`} className="text-md" key={index}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
