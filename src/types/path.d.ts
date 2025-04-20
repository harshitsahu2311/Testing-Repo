
declare module 'path' {
  export function resolve(...paths: string[]): string;
  export function join(...paths: string[]): string;
  export function dirname(p: string): string;
  export function basename(p: string, ext?: string): string;
  export function extname(p: string): string;
  export function normalize(p: string): string;
  export function isAbsolute(p: string): boolean;
  export function relative(from: string, to: string): string;
  export function parse(pathString: string): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
  };
  export function format(pathObject: {
    root?: string;
    dir?: string;
    base?: string;
    ext?: string;
    name?: string;
  }): string;
  export const sep: string;
  export const delimiter: string;
  export const posix: typeof import('path');
  export const win32: typeof import('path');
}

// Define __dirname for use in the browser context
declare var __dirname: string;
