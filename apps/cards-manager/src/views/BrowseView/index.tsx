import { Badge, Text, TextInput, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';

import { CardsViewer } from '@/components/CardsViewer';
import { Panel } from 'ui';
import { Search } from 'tabler-icons-react';
import { View } from '@/components/View';
import { useDebouncedState } from '@mantine/hooks';
import useStyles from './styles';

export interface BrowserCardTypeFilters {
  showBlack: boolean;
  showWhite: boolean;
}

interface Props {}

export const BrowseView: React.FC<Props> = () => {
  const [activeFilters, setActiveFilters] = useState<BrowserCardTypeFilters>({
    showBlack: true,
    showWhite: true,
  });
  const [query, setQuery] = useDebouncedState<string | undefined>(
    undefined,
    300
  );
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const toggleFilter = (name: keyof BrowserCardTypeFilters) => {
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
      <CardsViewer
        filters={activeFilters}
        queryText={query}
      />
    </View>
  );
};
