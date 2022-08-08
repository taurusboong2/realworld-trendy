import React, { FC } from 'react';
import MyLink from '../MyLink';

type Props = {
  author: string;
  date: string;
  title: string;
  description: string;
  inRef?: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  slug?: string;
  image?: string;
};

const Feed: FC<Props> = ({ slug, author, date, title, description, image, inRef }) => {
  return (
    <>
      <div className="article-preview" ref={inRef}>
        <div className="article-meta">
          <MyLink href="profile">
            <img src={image} />
          </MyLink>
          <div className="info">
            <a href="/profile" className="author">
              {author}
            </a>
            <span className="date">{date}</span>
          </div>
        </div>
        <MyLink href={`/article-detail/${slug}`} className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
        </MyLink>
      </div>
    </>
  );
};

export default Feed;
