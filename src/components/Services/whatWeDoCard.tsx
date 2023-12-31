import Image, { StaticImageData } from 'next/image';

type Props = {
  title: string;
  text: string;
  image: StaticImageData;
};

export const WhatWeDoCard = (props: Props) => {
  const { title, text, image } = props;
  return (
    <article className="p-4">
      <div className="flex items-center flex-col">
        <Image src={image} alt={title} width={300} height={300} className="" />
        <h3 className="text-center text-4xl my-8">{title}</h3>
        <p className="text-center text-xl">{text} </p>
      </div>
    </article>
  );
};
