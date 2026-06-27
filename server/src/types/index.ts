// Error interface for type-safe error handling
export interface ApiError extends Error {
  message: string;
  statusCode?: number;
}

// JWT Decoded payload interface
export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// User interface for authenticated requests
export interface IUser {
  _id: string;
  id: string;
  email: string;
  displayName?: string;
  streak?: number;
  xp?: number;
  level?: number;
}
