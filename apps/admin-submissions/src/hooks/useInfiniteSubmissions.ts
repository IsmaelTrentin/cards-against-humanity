import { PagedResponse, Submission } from 'shared-types';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

import { Axios } from '@/services/axios';

type GetAllSubmissionsResponse = PagedResponse<Submission>;

const limit = 18;

// workaround
const fetchCards = async (ctx: QueryFunctionContext<any>) => {
  // get context vars
  const { pageParam = 1, queryKey } = ctx;

  // create query params
  const qParams = new URLSearchParams();
  qParams.append('limit', limit.toString());
  qParams.append('page', pageParam.toString());
  qParams.append('type', queryKey[2].toString());
  queryKey[1] && qParams.append('text', queryKey[1]);

  // fire request
  const { data } = await Axios.get<GetAllSubmissionsResponse>(
    `/submissions?${qParams.toString()}`
  );

  return data;
};

export const useInfiniteSubmissions = (text?: string, type?: number) =>
  useInfiniteQuery(['submissions', text, type], fetchCards, {
    getNextPageParam: lastPage => lastPage.nextPage,
  });
