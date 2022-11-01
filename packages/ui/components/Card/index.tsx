import { AbstractCard } from 'shared-types';
import { Panel } from 'ui';
import React from 'react';
import { useCardIdToReadable } from './../../hooks/useCardId';
import { useFormatCardText } from './../../hooks/useFormatCardText';
import { useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';

interface Props {
  card: AbstractCard;
}

export const Card: React.FC<Props> = props => {
  const { card } = props;
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const base36Id = useCardIdToReadable(card?._id);
  const cardBody = useFormatCardText(card);

  return (
    <Panel
      className={classes.main}
      backgroundColor={card.isBlack ? '#000' : '#fff'}
    >
      <span
        className={classes.id}
        style={{
          color: card.isBlack ? theme.colors.dark[4] : theme.colors.gray[2],
        }}
      >
        #{base36Id}
      </span>
      {cardBody}
    </Panel>
  );
};