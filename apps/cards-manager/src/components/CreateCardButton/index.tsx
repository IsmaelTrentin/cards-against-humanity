import React, { useState } from 'react';
import { Text, useMantineTheme } from '@mantine/core';

import { CardButton } from '../CardButton';
import { PostSubmissionModal } from '@/modals/PostSubmission';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export const CreateCardButton: React.FC<Props> = props => {
  const theme = useMantineTheme();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <CardButton
        {...props}
        onClick={() => setShowModal(true)}
      >
        <Text
          color={theme.colors.gray[3]}
          style={{
            fontSize: '4rem',
            fontWeight: 100,
            transform: 'translateY(-0.4rem)',
          }}
        >
          +
        </Text>
      </CardButton>
      <PostSubmissionModal
        opened={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
