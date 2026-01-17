import { SESSION_TOKEN_KEY, API_BASE_URL as BASE_URL } from './constants';

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
    const token = localStorage.getItem(SESSION_TOKEN_KEY);

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
        localStorage.removeItem(SESSION_TOKEN_KEY);

        const isAuthEndpoint = ['/admin/login', '/user/login', '/user/register'].includes(endpoint);
        const isAuthPage = ['/login', '/admin/login', '/register'].includes(window.location.pathname);

        if (!isAuthEndpoint && !isAuthPage) {
            const isAdminArea = window.location.pathname.startsWith('/admin');
            window.location.href = isAdminArea ? '/admin/login' : '/login';
        }
    }

    const data = await response.json();

    if (!response.ok) {
        throw data || new Error('Something went wrong');
    }

    return data;
}
