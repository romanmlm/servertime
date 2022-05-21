import en from './en.json';

export interface Lang {
  en: Record<string, unknown>;
}

export const lang: Lang = {
  en: en
};
