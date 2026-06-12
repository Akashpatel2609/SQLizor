declare module 'sql.js' {
  export interface Database {
    run(sql: string, params?: any[]): void;
    exec(sql: string, params?: any[]): { columns: string[]; values: any[][] }[];
    prepare(sql: string, params?: any[]): any;
    close(): void;
  }
  
  export interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer) => Database;
  }
  
  export interface Config {
    locateFile?: (file: string) => string;
  }
  
  export default function initSqlJs(config?: Config): Promise<SqlJsStatic>;
}
