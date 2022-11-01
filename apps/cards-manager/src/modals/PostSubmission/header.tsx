import { Text, useMantineTheme } from '@mantine/core';

import React from 'react';

export const PostSubmissionHeader: React.FC<Record<string, unknown>> = () => {
  const theme = useMantineTheme();

  return (
    <Text
      style={{
        maxWidth: 800,
        paddingBottom: '1rem',
        marginBottom: '1rem',
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
      }}
    >
      Here you can create a card and submit it for review. Once the submission
      will be reviewed and accepted it will be added to the database and will be
      playable.{' '}
      <span
        style={{
          color: theme.colors.gray[5],
        }}
      >
        Tip: you can index the blank spots with negative numbers, it will count
        from the end of the text.
      </span>
    </Text>
  );
};
