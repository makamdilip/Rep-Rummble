// Minimal module declaration so ts-node can compile without @types/oracledb.
// Replace with official types if/when available.
declare module 'oracledb' {
  const oracledb: any
  export default oracledb
}
