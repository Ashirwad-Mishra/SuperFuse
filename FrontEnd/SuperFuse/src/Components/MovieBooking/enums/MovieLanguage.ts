export const MovieLanguage = {
  English: 'English',
  Hindi: 'Hindi',
  Tamil: 'Tamil',
  Telugu: 'Telugu',
  Malayalam: 'Malayalam',
  Kannada: 'Kannada',
} as const;

export type MovieLanguage = (typeof MovieLanguage)[keyof typeof MovieLanguage];
export const MovieLanguages: MovieLanguage[] = Object.values(MovieLanguage);
