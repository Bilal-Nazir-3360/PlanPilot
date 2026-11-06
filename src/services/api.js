const baseUrl = import.meta.env.VITE_API_URL || ''

export class ApiError extends Error {
  constructor(status, message, errors = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export async function api(path, options = {}) {
  const { body, ...requestOptions } = options
  let response

  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...requestOptions,
      credentials: 'include',
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...requestOptions.headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, 'Cannot reach the server. Try again.')
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    if (!response.ok) {
      throw new ApiError(response.status, 'The server returned an invalid response.')
    }
  }

  if (!response.ok) {
    if (import.meta.env.DEV && path.startsWith('/api/tasks')) {
      console.warn(`[task API] ${requestOptions.method || 'GET'} ${path} failed with status ${response.status}`)
    }
    throw new ApiError(
      response.status,
      data?.message || 'Something went wrong. Please try again.',
      data?.errors || {},
    )
  }

  return data
}
