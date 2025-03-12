export interface Meaning {
  partOfSpeech: string;
  definitions: {
    definition: string;
    example?: string;
  }[];
}

export interface Word {
  id: string;
  word: string;
  phonetic?: string;
  meanings?: Meaning[];
  createdAt?: string;
  audioUrl?: string | null;
}
