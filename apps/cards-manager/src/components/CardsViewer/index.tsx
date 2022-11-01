import { Box, Loader } from '@mantine/core';
import React, { useEffect } from 'react';

import { BrowserCardTypeFilters } from '@/views/BrowseView';
import { Card } from 'ui';
import { useInView } from 'react-intersection-observer';
import useInfiniteCards from '@/hooks/useInfiniteCards';
import { useStyles } from './styles';

interface Props {
  filters?: BrowserCardTypeFilters;
  queryText?: string;
}

export const CardsViewer: React.FC<Props> = props => {
  const { filters, queryText } = props;
  const { ref, inView } = useInView();
  const cardType =
    filters == undefined
      ? 2
      : filters.showBlack && filters.showWhite
      ? 2
      : filters.showBlack && !filters.showWhite
      ? 0
      : 1;
  const {
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCards(queryText, cardType);
  const { classes } = useStyles();

  useEffect(() => {
    console.log(inView);
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </Box>
      )}
      <div className={classes.main}>
        {isSuccess &&
          data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((card, j) => (
                <Card
                  key={j}
                  card={card}
                />
              ))}
            </React.Fragment>
          ))}
      </div>
      <span
        ref={ref}
        style={{
          visibility: 'hidden',
          width: 0,
          height: 0,
        }}
      >
        observer marker
      </span>
      {hasNextPage && isFetchingNextPage && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </Box>
      )}
    </>
  );
};
