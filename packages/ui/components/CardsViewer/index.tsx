import { AbstractCard, PagedResponse } from 'shared-types';
import { Box, Loader } from '@mantine/core';
import React, { useEffect } from 'react';

import { Card } from 'ui';
import { UseInfiniteQueryResult } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useStyles } from './styles';

interface Props {
  query: UseInfiniteQueryResult<PagedResponse<AbstractCard>, unknown>;
}

export const CardsViewer: React.FC<Props> = props => {
  const { query } = props;
  const {
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = query;
  const { ref, inView } = useInView();
  const { classes } = useStyles();

  useEffect(() => {
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
