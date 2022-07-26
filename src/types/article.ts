import { UserInfo } from './auth';

export type ArticleType = {
  slug: string;
  author: UserInfo;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  favoritesCount: number;
  favorited: boolean;
  tagList: string[];
};

export type ArticleListType = {
  articles: ArticleType[];
  articlesCount: number;
};

export type ArticleDataType = {
  article: ArticleType;
};

export type NewArticleData = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[] | [];
  };
};

export type updateMutation = {
  props: {
    slug: string;
    newData: NewArticleData;
  };
};

export type OffsetProps = {
  pageParam: number;
};
