import { ApiResponseError } from 'shared-types';
import { Axios } from '@/services/axios';
import { AxiosError } from 'http-client';
import { useMutation } from 'react-query';

type Payload = {
  _id: string;
};

export const useAcceptSubmission = () =>
  useMutation<unknown, AxiosError<ApiResponseError>, Payload>(({ _id }) => {
    return Axios.delete(`/submissions/accept/${_id}`);
  });
