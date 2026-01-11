export interface User {
    id: string;
    email: string;
    username: string;
    role: 'ADMIN' | 'CUSTOMER';
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export interface UserResponse {
    status: string;
    message: string;
    data: User;
}
