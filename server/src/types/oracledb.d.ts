// Minimal module declaration so ts-node can compile without @types/oracledb.
// Replace with official types if/when available.
declare module 'oracledb' {
  export type Pool = any
  export type Connection = any
  export type ExecuteOptions = any
  export type Result<T> = any
  export const OUT_FORMAT_OBJECT: any
  export function initOracleClient(options?: any): void
  export function createPool(options: any): Promise<Pool>
}
