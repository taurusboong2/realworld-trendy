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
  tagList: string[] | string;
};

export type NewArticleData = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
};
