// @flow
export type Pic = {
  data: {
    id: string,
    score: number,
    thumbnail: string,
    permalink: string,
    title: string,
    created_utc: number,
    num_comments: number,
    author: string,
  },
};

export type Pics = {
  children: Pic[],
  after: ?string,
};
