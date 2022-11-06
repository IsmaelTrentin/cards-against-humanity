import { Card } from 'ui';
import React from 'react';
import { Submission as SubmissionType } from 'shared-types';

interface Props {
  submission: SubmissionType;
}

export const Submission: React.FC<Props> = props => {
  const { submission } = props;

  return (
    <div>
      <Card
        {...submission.card}
        animate={false}
      />
    </div>
  );
};
