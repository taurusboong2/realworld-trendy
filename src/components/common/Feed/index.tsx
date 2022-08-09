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
  noticeOpt?: {
    isNotice?: boolean;
    noticeSlug?: string;
  };
};

const Feed: FC<Props> = ({ slug, author, date, title, description, image, inRef, noticeOpt }) => {
  return (
    <>
      <div className="article-preview" ref={inRef}>
        <div className="article-meta">
          <a href={noticeOpt?.isNotice ? 'https://github.com/taurusboong2' : '/profile'}>
            <img src={image} />
          </a>
          <div className="info">
            <a href={noticeOpt?.isNotice ? 'https://github.com/taurusboong2' : '/profile'} className="author">
              {author}
            </a>
            <span className="date">{date}</span>
          </div>
        </div>
        <MyLink
          href={noticeOpt?.isNotice ? `/notice/${noticeOpt.noticeSlug}` : `/article-detail/${slug}`}
          className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
        </MyLink>
      </div>
    </>
  );
};

export default Feed;
