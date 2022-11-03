import { Badge, Text, TextInput, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';

import { BrowserCardFilters } from 'shared-types';
import { CardsViewer } from 'ui';
import { Panel } from 'ui';
import { Search } from 'tabler-icons-react';
import { View } from '@/components/View';
import { useDebouncedState } from '@mantine/hooks';
import { useInfiniteCards } from '@/hooks/useInfiniteCards';
import useStyles from './styles';

interface Props {}

export const BrowseView: React.FC<Props> = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [activeFilters, setActiveFilters] = useState<BrowserCardFilters>({
    showBlack: true,
    showWhite: true,
  });
  const [queryText, setQuery] = useDebouncedState<string | undefined>(
    undefined,
    300
  );
  const cardType =
    activeFilters == undefined
      ? 2
      : activeFilters.showBlack && activeFilters.showWhite
      ? 2
      : activeFilters.showBlack && !activeFilters.showWhite
      ? 0
      : 1;
  const cardsQuery = useInfiniteCards(queryText, cardType);

  const toggleFilter = (name: keyof BrowserCardFilters) => {
    setActiveFilters(ps => {
      const cache = {
        ...ps,
        [name]: !ps[name],
      };
      if (!cache.showBlack && !cache.showWhite) {
        if (name === 'showBlack') {
          cache.showWhite = true;
        } else {
          cache.showBlack = true;
        }
      }
      return cache;
    });
  };

  return (
    <View>
      <Panel
        fullWidth
        margin="0 0 1rem 0"
      >
        <TextInput
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          icon={
            <Search
              size={18}
              strokeWidth={2}
              color={theme.colors.gray[3]}
            />
          }
        />
        <Text
          color={theme.colors.gray[6]}
          style={{ padding: '.5rem 0 .25rem' }}
        >
          Show type:
        </Text>
        <div className={classes['filters-wrapper']}>
          <Badge
            color="dark"
            variant={activeFilters.showBlack ? 'filled' : 'outline'}
            onClick={() => toggleFilter('showBlack')}
          >
            Black
          </Badge>
          <Badge
            color="indigo"
            variant={activeFilters.showWhite ? 'filled' : 'outline'}
            onClick={() => toggleFilter('showWhite')}
          >
            White
          </Badge>
        </div>
      </Panel>
      <CardsViewer query={cardsQuery} />
    </View>
  );
};
