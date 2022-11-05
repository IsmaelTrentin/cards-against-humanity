import { ApiResponseError } from 'shared-types';
import { Axios } from '@/services/axios';
import { AxiosError } from 'axios';
import { Submission } from 'shared-types';
import { useMutation } from 'react-query';

type Payload = Omit<Submission, '_id'>;

export const usePostSubmission = () =>
  useMutation<unknown, AxiosError<ApiResponseError>, Payload>(submission => {
    return Axios.post('/submissions', submission);
  });
