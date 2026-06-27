export interface ApiError extends Error {
    message: string;
    statusCode?: number;
}
export interface JwtPayload {
    id: string;
    iat?: number;
    exp?: number;
}
export interface IUser {
    _id: string;
    id: string;
    email: string;
    displayName?: string;
    streak?: number;
    xp?: number;
    level?: number;
}
//# sourceMappingURL=index.d.ts.map