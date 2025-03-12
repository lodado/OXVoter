export interface SupabaseLoaderParams {
  src: string
  width?: number

  quality?: number
}

export default function supabaseLoader({ src, width, quality }: SupabaseLoaderParams) {
  return `${src}`;

  /**
   * preload가 안되던 문제가 있어 임시 수정
   */
  // return `${src}?width=${width || 500}&quality=${quality || 75}`
}
