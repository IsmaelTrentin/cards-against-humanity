import { useNavigate } from '@/hooks/useNavigate';
import React from 'react';
import { CardButton } from '@components/CardButton';
import useStyles from './styles';

interface Props { }

export const BrowseCardsButton: React.FC<Props> = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <CardButton
      onClick={() => navigate('/browse')}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid red',
        }}
      >
        <div className={classes.card}></div>
        <div className={classes.card}></div>
        <div className={classes.card}></div>
      </div>
    </CardButton>
  );
};