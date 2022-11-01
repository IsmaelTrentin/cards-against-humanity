import { useMantineTheme } from '@mantine/core';

interface Props {
  query: string;
}

export const MultiSelectCreateLabel: React.FC<Props> = ({ query }) => {
  const theme = useMantineTheme();

  return (
    <p>
      Add blank at: <span style={{ color: theme.primaryColor }}>{query}</span>
    </p>
  );
};
