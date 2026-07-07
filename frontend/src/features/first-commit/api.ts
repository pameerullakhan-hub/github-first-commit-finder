import { request } from '../../lib/http';
import { FirstCommitResponse } from './types';

export async function fetchFirstCommit(repository: string): Promise<FirstCommitResponse> {
  return request<FirstCommitResponse>('/first-commit', {
    method: 'POST',
    body: JSON.stringify({ repository }),
  });
}
