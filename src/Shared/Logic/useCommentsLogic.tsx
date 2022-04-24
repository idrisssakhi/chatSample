import {useEffect, useRef, useState} from 'react';
import {Comment, fakeDataFetcher} from '../Api';
import {myEmail} from '../Constants';

export interface CommentsLogic {
  isLoading: boolean;
  hasNextPage: boolean;
  isError: boolean;
  comments: Comment[];
  fetchNextPage: () => void;
  addComment: (text: string) => void;
}

const TOTAL_BACK_END_COMMENTS = 500;

export const useCommentsLogic = (): CommentsLogic => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const nextPageTofetch = useRef(1);

  const fetchData = () => {
    setIsLoading(true);
    fakeDataFetcher
      .getComments(nextPageTofetch.current)
      .then(response => {
        setComments(prev => [...response, ...prev]);
        nextPageTofetch.current = nextPageTofetch.current + 1;
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Load first page at mount.
  useEffect(() => {
    fetchData();
  }, []);

  const addComment = (text: string) => {
    setComments(prev => [
      {
        postId: 1,
        id: Math.random(),
        name: 'SAKHI Idris',
        email: myEmail,
        body: text,
      },
      ...prev,
    ]);
  };

  return {
    isLoading,
    hasNextPage: comments.length < TOTAL_BACK_END_COMMENTS,
    comments,
    isError,
    fetchNextPage: fetchData,
    addComment,
  };
};
