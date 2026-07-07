const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api/v1' : 'http://localhost:8000/api/v1');

export class APIError extends Error {
  status: number;
  errorType: string;

  constructor(status: number, message: string, errorType: string) {
    super(message);
    this.status = status;
    this.errorType = errorType;
  }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred on the server.';
    let errorType = 'APIError';

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
      errorType = errorData.error_type || errorType;
    } catch {
      // JSON parsing failed, fallback to status code message
      errorMessage = response.statusText || errorMessage;
    }

    throw new APIError(response.status, errorMessage, errorType);
  }

  // Handle empty responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
