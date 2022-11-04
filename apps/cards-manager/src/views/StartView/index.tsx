import { BrowseCardsButton } from '@/components/BrowseCardsButton';
import { Copyright } from '@/components/Copyright';
import { CreateCardButton } from '@/components/CreateCardButton';
import React from 'react';
import { Transition } from '@mantine/core';
import { useMountedTransition } from 'ui';
import useStyles from './styles';

interface Props {}

export const StartView: React.FC<Props> = props => {
  const {} = props;
  const { classes } = useStyles();
  const [mountBtns, startBtnsTransition] = useMountedTransition();
  const [mountCopyright, startCopyrightTransition] = useMountedTransition(800);

  startBtnsTransition();
  startCopyrightTransition();

  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <Transition
          mounted={mountBtns}
          transition="slide-up"
          duration={300}
          timingFunction="ease"
        >
          {styles => (
            <div style={styles}>
              <CreateCardButton />
            </div>
          )}
        </Transition>
        <Transition
          mounted={mountBtns}
          transition="slide-up"
          duration={500}
          timingFunction="ease"
        >
          {styles => (
            <div style={styles}>
              <BrowseCardsButton />
            </div>
          )}
        </Transition>
      </div>
      <Transition
        mounted={mountCopyright}
        transition="fade"
        duration={500}
        timingFunction="ease"
      >
        {styles => (
          <div
            style={styles}
            className={classes.copyright}
          >
            <span>
              <Copyright />
            </span>
          </div>
        )}
      </Transition>
    </div>
  );
};
