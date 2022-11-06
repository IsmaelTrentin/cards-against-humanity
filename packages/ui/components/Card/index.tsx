import React, { useMemo } from 'react';

import { Panel } from 'ui';
import cx from 'classnames';
import { useCardIdToReadable } from './../../hooks/useCardId';
import { useFormatCardText } from './../../hooks/useFormatCardText';
import { useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';

interface Props {
  _id?: string;
  text?: string;
  isBlack?: boolean;
  blanks?: number[];
  animate?: boolean;
}

export const Card: React.FC<Props> = props => {
  const {
    _id,
    text = '',
    isBlack = false,
    blanks = [],
    animate = true,
  } = props;
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const base36Id = useCardIdToReadable(_id || '');
  const cardData = useMemo(
    () => ({ text, isBlack, blanks }),
    [text, isBlack, blanks]
  );
  const cardBody = useFormatCardText(cardData);

  return (
    <Panel
      className={cx(classes.main, {
        [classes['with-animation']]: animate,
      })}
      backgroundColor={isBlack ? '#000' : '#fff'}
    >
      <span
        className={classes.id}
        style={{
          color: isBlack ? theme.colors.dark[4] : theme.colors.gray[2],
        }}
      >
        {base36Id ? `#${base36Id}` : null}
      </span>
      {cardBody}
    </Panel>
  );
};
