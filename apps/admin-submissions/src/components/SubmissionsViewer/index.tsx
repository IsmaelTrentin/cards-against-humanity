import { Box, Loader } from '@mantine/core';
import type { PagedResponse, Submission as SubmissionType } from 'shared-types';
import React, { useEffect } from 'react';
import { UseInfiniteQueryResult, useQueryClient } from 'react-query';

import { AcceptRefuseOverlay } from '../AcceptRefuseOverlay';
import { Submission } from '@components/Submission';
import { useAcceptSubmission } from '@/hooks/useAcceptSubmission';
import { useInView } from 'react-intersection-observer';
import { useRefuseSubmission } from '@/hooks/useRefuseSubmission';
import { useStyles } from './styles';

interface Props {
  query: UseInfiniteQueryResult<PagedResponse<SubmissionType>, unknown>;
}

export const SubmissionsViewer: React.FC<Props> = props => {
  const { query } = props;
  const { classes } = useStyles();
  const {
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = query;
  const { ref, inView } = useInView();

  const qClient = useQueryClient();
  const { mutateAsync: mutateAccept } = useAcceptSubmission();
  const { mutateAsync: mutateRefuse } = useRefuseSubmission();

  // after invalidation <Card/> will regenerate
  // a couple of ids instead of unmounting completly
  const handleAccept = async (_id: string) => {
    await mutateAccept({ _id });
    qClient.invalidateQueries(['submissions']);
  };
  const handleRefuse = async (_id: string) => {
    await mutateRefuse({ _id });
    qClient.invalidateQueries(['submissions']);
  };

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
              {page.data.map(submission => (
                <AcceptRefuseOverlay
                  key={submission._id}
                  onAccept={() => handleAccept(submission._id)}
                  onRefuse={() => handleRefuse(submission._id)}
                >
                  <Submission submission={submission} />
                </AcceptRefuseOverlay>
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
