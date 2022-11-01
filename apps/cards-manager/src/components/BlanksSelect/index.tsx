import { MultiSelect, SelectItem } from '@mantine/core';

import { MultiSelectCreateLabel } from '../MultiSelectCreateLabel';
import React from 'react';

interface Props {
  value?: number[];
  list?: SelectItem[];
  onChange?: (values: number[]) => void;
  onCreate?: (item: { value: string; label: string }) => void;
}

export const BlanksSelect: React.FC<Props> = props => {
  const { value = [], list = [], onChange, onCreate } = props;
  return (
    <MultiSelect
      label="Blanks"
      data={list}
      placeholder="Add index"
      value={value.map(e => `${e}`)}
      onChange={value => onChange && onChange(value.map(e => parseInt(e)))}
      getCreateLabel={query => <MultiSelectCreateLabel query={query} />}
      onCreate={query => {
        const item = { value: query, label: query };
        onCreate && onCreate(item);
        return item;
      }}
      searchable
      creatable
    />
  );
};
