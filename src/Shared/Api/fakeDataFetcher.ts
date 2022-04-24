const PAGE_LENGTH = 20;

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const fakeDataFetcher = {
  getComments: async (page: number): Promise<Comment[]> => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_start=${
        (page - 1) * PAGE_LENGTH
      }&_limit=${PAGE_LENGTH}`,
    );
    return response.json();
  },
};
