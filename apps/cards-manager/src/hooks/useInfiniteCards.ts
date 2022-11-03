import { AbstractCard, PagedResponse } from 'shared-types';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

import { Axios } from '@/services/axios';

type GetAllCardsResponse = PagedResponse<AbstractCard>;

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
  const { data } = await Axios.get<GetAllCardsResponse>(
    `/cards?${qParams.toString()}`
  );

  return data;
};

export const useInfiniteCards = (text?: string, type?: number) =>
  useInfiniteQuery(['cards', text, type], fetchCards, {
    getNextPageParam: lastPage => lastPage.nextPage,
  });
