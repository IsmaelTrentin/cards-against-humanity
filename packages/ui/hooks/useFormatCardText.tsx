import { AbstractCard } from 'shared-types';
import { Blank } from '../components/Blank';
import { ReactNode } from 'react';
import { Text } from '@mantine/core';

export const useFormatCardText = (card: Omit<AbstractCard, '_id'>) => {
  const { text, blanks, isBlack } = card;

  // return unparsed text
  if (!isBlack) return text;

  // all text characters + blank spaces
  const characters: (string | undefined)[] = Array(
    text.length + blanks.length
  ).fill(undefined);
  // map end indexing to zero based
  const zeroBasedBlanks = blanks.map(bIdx =>
    bIdx >= 0 ? bIdx : characters.length + bIdx + 1
  );

  // insert blanks on their indexes
  let offset = 0;
  for (let i = 0; i < text.length + offset; i++) {
    if (zeroBasedBlanks.includes(i)) {
      offset++;
      continue;
    }
    characters[i] = text.charAt(i - offset);
  }

  // card body components
  const components: ReactNode[] = [];

  // current string buffer
  let current: string = '';
  characters.forEach((c, i) => {
    if (c == undefined) {
      // add text with blank component
      current.trim().length > 0 &&
        components.push(
          <Text color={card.isBlack ? '#fff' : '#000'}>{current}</Text>
        );
      components.push(<Blank />);
      current = '';
    } else {
      // fill buffer
      current = current.concat(c);
    }
  });
  // add remaining text
  current.trim().length > 0 &&
    components.push(
      <Text color={card.isBlack ? '#fff' : '#000'}>{current}</Text>
    );

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {components}
    </div>
  );
};
