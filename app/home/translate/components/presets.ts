export interface Preset {
  id: string;
  name: string;
}

const options = [
  "Blog post",
  "Documentation",
  "Landing page",
  "Research markdown",
  "Research proposal",
  "Literature review",
  'Marketing copy',
  'Product description',
  'Tweet', // We could add other social medias later like Facebook, LinkedIn, Instagram, TikTok
  'Instagram caption post',
  'English',
  'Spanish',
  'Chinese',
  'Spanish as spoken locally in Mexico',
  'Grammatical standard English',
  'Expand',
  'Shorten' // We could add other filters later that are action-oriented like: shorten, summarize, expand, etc.
];

export const presets: Preset[] = options.map((option, i) => ({
  id: i.toString(),
  name: option,
}));
