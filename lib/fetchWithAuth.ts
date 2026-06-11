import { api } from './api';

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
) {
  const token = localStorage.getItem(
    'accessToken',
  );

  const headers = new Headers(options.headers);

  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`,
    );
  }

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has('Content-Type')
  ) {
    headers.set(
      'Content-Type',
      'application/json',
    );
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response),
    );
  }

  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers.get('content-type');

  if (
    contentType?.includes('application/json')
  ) {
    return response.json();
  }

  return response.text();
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : String(error);
}

async function readErrorMessage(
  response: Response,
) {
  const fallback =
    response.statusText ||
    `Request failed: ${response.status}`;

  const contentType =
    response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    const payload = await response
      .json()
      .catch(() => null);

    const message = payload?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (typeof message === 'string') {
      return message;
    }

    if (typeof payload?.error === 'string') {
      return payload.error;
    }
  }

  const text = await response
    .text()
    .catch(() => '');

  return text || fallback;
}

export function getAuthHeaders() {
  const token = localStorage.getItem(
    'accessToken',
  );

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}
