import { ApiResponse, AbstractCard } from 'shared-types';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

type GetAllCardsResponse = ApiResponse & {
  data: AbstractCard[];
  nextPage: number;
  previousPage: number;
};

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
  const res = await window.fetch(
    `http://localhost:2424/cah-api-rest/v1/cards?${qParams.toString()}`
  );

  // return results
  return (await res.json()) as GetAllCardsResponse;
};

const useInfiniteCards = (text?: string, type?: number) =>
  useInfiniteQuery(['cards', text, type], fetchCards, {
    getNextPageParam: lastPage => lastPage.nextPage,
  });

export default useInfiniteCards;
