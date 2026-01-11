const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

export type FetchOptions = RequestInit & {
    params?: Record<string, string>;
};

export async function fetcher<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...init } = options;

    // Construct URL with query params
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set default headers
    const headers = new Headers(init.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    if (!(init.body instanceof FormData) && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url.toString(), {
        ...init,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        if (!window.location.pathname.startsWith('/admin/login')) {
            window.location.href = '/admin/login';
        }
        throw new Error('Unauthorized');
    }

    const data = await response.json();

    if (!response.ok) {
        throw data || new Error('Something went wrong');
    }

    return data;
}
