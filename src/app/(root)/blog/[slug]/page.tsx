import { RichText } from '@graphcms/rich-text-react-renderer';
import { getPostDetails } from '@/libs/postsHygraph';
import Image from 'next/image';

interface Props {
  params: {
    slug: string;
  };
}

const PostDetails = async ({ params }: Props) => {
  const { slug } = params;
  const post = await getPostDetails(slug);
  console.log('Post ==> ', post);
  return (
    <div className="col-span-1 grid grid-cols-1 gap-4 lg:col-span-9 lg:grid-cols-1 bg-myPurple bg-opacity-30">
      <div className="mb-8 rounded-lg bg-white pb-12 shadow-lg lg:p-8">
        <div className="mb-6 overflow-hidden shadow-md">
          <Image
            src={post.image.url}
            alt={post.title}
            width={300}
            height={200}
            className="h-[400px] w-full rounded-t-lg object-cover shadow-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="mb-8 flex w-full items-center">
            <div className="mr-8 hidden items-center justify-center md:flex lg:mb-0 lg:w-auto">
              <Image
                alt={post.author?.name}
                height={30}
                width={30}
                className="rounded-full align-middle"
                src={post.author?.picture.url}
              />
              <p className="ml-2 inline align-middle text-lg font-medium text-gray-700">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 inline h-6 w-6 text-myPurple "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">{post.createdAt}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          <RichText content={post.content.raw.children} />
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
