declare module 'astro:content' {
  export function defineCollection<T>(config: { type?: string; schema?: any }): any;
  export function getCollection(collection: string, filter?: (entry: any) => boolean): Promise<any[]>;
  export function getEntry(collection: string, slug: string): Promise<any>;
  export const z: typeof import('zod').z;
}
