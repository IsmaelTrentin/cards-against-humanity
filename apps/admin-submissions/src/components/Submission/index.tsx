import { Card, useRandomCardId } from 'ui';

import React from 'react';
import { Submission as SubmissionType } from 'shared-types';

interface Props {
  submission: SubmissionType;
}

export const Submission: React.FC<Props> = props => {
  const { submission } = props;
  const randomId = useRandomCardId();

  return (
    <div>
      <Card
        card={{
          ...submission.card,
          _id: randomId,
        }}
      />
    </div>
  );
};
