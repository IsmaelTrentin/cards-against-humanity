import {
  Button,
  Checkbox,
  Modal,
  ModalProps,
  SelectItem,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';

import { AbstractCard } from 'shared-types';
import { BlanksSelect } from '@/components/BlanksSelect';
import { Card } from 'ui';
import { PostSubmissionHeader } from './header';
import { cardPostSchema } from '@/schemas/card';
import { useForm } from '@mantine/form';
import { usePostSubmission } from '@/hooks/usePostSubmission';
import { useRandomCardId } from '@/hooks/useRandomCardId';
import { useStyles } from './styles';

interface Props extends ModalProps {}

const initialValues = {
  blanks: [],
  isBlack: false,
  text: 'Sample text',
};

export const PostSubmissionModal: React.FC<Props> = props => {
  const { opened, onClose } = props;
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const randomCardId = useRandomCardId();
  const [blanksList, setBlanksList] = useState<SelectItem[]>([]);
  const { values, getInputProps, setFieldValue, setValues } =
    useForm<AbstractCard>({
      initialValues: {
        ...initialValues,
        _id: randomCardId,
      },
    });
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isLoading, isSuccess, isError, error, mutate } = usePostSubmission();

  const resetCard = () => {
    setValues({
      ...initialValues,
      _id: randomCardId,
    });
  };
  const handleSubmit = () => {
    mutate({
      at: Date.now(),
      card: values,
    });
  };

  React.useEffect(() => {
    const result = cardPostSchema.safeParse(values).success;
    if (result !== isValid) {
      setIsValid(result);
    }
  }, [isValid, values]);

  React.useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text size="xl">Post Card Submission</Text>}
      overlayOpacity={0.15}
      overlayBlur={2}
      centered
      size="auto"
    >
      <PostSubmissionHeader />
      <div className={classes.columns}>
        <div className={classes.left}>
          <Textarea
            label="Text"
            autosize
            maxLength={200}
            {...getInputProps('text')}
          />
          <Checkbox
            label="Black card"
            checked={values.isBlack}
            {...getInputProps('isBlack')}
          />
          {values.isBlack && (
            <BlanksSelect
              list={blanksList}
              value={values.blanks}
              onChange={v => setFieldValue('blanks', v)}
              onCreate={i => setBlanksList(ps => [...ps, i])}
            />
          )}
          {isError && (
            <Text color={theme.colors.red[5]}>
              {error?.response?.data.message}
            </Text>
          )}
        </div>
        <div className={classes.right}>
          <Card card={values} />
          <Text
            className={classes.reset}
            onClick={resetCard}
          >
            Reset
          </Text>
        </div>
      </div>
      <Button
        className={classes['submit-btn']}
        disabled={!isValid}
        loading={isLoading}
        loaderProps={{
          color: theme.primaryColor,
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Modal>
  );
};
