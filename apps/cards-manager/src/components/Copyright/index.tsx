import { Anchor, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Heart } from 'tabler-icons-react';

interface Props { }

export const Copyright: React.FC<Props> = () => {
  const theme = useMantineTheme();

  return (
    <Text
      color={theme.colors.gray[7]}
    >
      Made with
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0 .25rem',
          transform: 'translateY(.25rem)'
        }}
      >
        <Heart
          size={18}
          strokeWidth={2}
          color={theme.colors.indigo[9]}
        />
      </span>
      by
      <Anchor
        href="https://github.com/IsmaelTrentin"
        target="_blank"
        style={{
          padding: '0 .3rem'
        }}
      >
        Ismael Trentin
      </Anchor>
    </Text>
  );
};