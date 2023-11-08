import Image from 'next/image';
import Link from 'next/link';

interface PostProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    image: {
      url: string;
    };
  };
}

const PostCard = ({ post }: PostProps) => (
  <div className="mb-8 rounded-lg bg-myPurple bg-opacity-40  p-0 pb-12 shadow-lg lg:p-4">
    <Image
      src={post.image.url}
      width={300}
      height={200}
      alt={`image - ${post.title}`}
      className="w-full h-[200px] rounded-t-lg object-cover shadow-lg lg:rounded-lg mb-4"
    />

    <h2 className="mb-4 cursor-pointer text-center text-2xl font-semibold transition duration-700 hover:text-myPurple">
      <Link href={'/post/${post.slug}'}>{post.title}</Link>
    </h2>

    {/* <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
      <div className="mb-4 mr-8 flex w-full items-center items-center justify-center lg:mb-0 lg:w-auto">
        <Image
          alt={post.author.name}
          height="30px"
          width="30px"
          className="rounded-full align-middle"
          src={post.author.photo.url}
        />
        <p className="ml-2 inline align-middle text-lg font-medium text-gray-700">
          {post.author.name}
        </p>
      </div>
      <div className="font-medium text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 inline h-6 w-6 text-pink-500"
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
        <span className="align-middle">
          {moment(post.createdAt).format('MMM DD, YYYY')}
        </span> 
      </div>
    </div>*/}

    <p className="mb-8 text-lg  text-gray-700 line-clamp-4 ">{post.excerpt}</p>

    <div className="text-center">
      {/* <Link href={`/post/${post.slug}`} passHref> */}
      <span className="ease inline-block transform cursor-pointer rounded-full bg-myPurple  px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1">
        Leer articulo
      </span>
      {/* </Link> */}
    </div>
  </div>
);

export default PostCard;
