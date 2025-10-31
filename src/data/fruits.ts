import type { Fruit } from '../types'

/**
 * Comprehensive fruit database with tags for filtering and organization
 * Tags allow fruits to belong to multiple categories (e.g., banana is both 'popular' and 'tropical')
 */
export const FRUITS: Fruit[] = [
  // Popular supermarket fruits
  { id: 'banana', name: 'Banana', emoji: '🍌', tags: ['popular', 'tropical'] },
  {
    id: 'apple-red',
    name: 'Red Apple',
    emoji: '🍎',
    tags: ['popular', 'orchard'],
  },
  {
    id: 'apple-green',
    name: 'Green Apple',
    emoji: '🍏',
    tags: ['popular', 'orchard'],
  },
  { id: 'orange', name: 'Orange', emoji: '🍊', tags: ['popular', 'citrus'] },
  {
    id: 'strawberry',
    name: 'Strawberry',
    emoji: '🍓',
    tags: ['popular', 'berries'],
  },
  { id: 'grape', name: 'Grape', emoji: '🍇', tags: ['popular', 'orchard'] },
  {
    id: 'watermelon',
    name: 'Watermelon',
    emoji: '🍉',
    tags: ['popular', 'melons'],
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    emoji: '🫐',
    tags: ['popular', 'berries'],
  },
  { id: 'pear', name: 'Pear', emoji: '🍐', tags: ['popular', 'orchard'] },

  // Berries
  {
    id: 'raspberry',
    name: 'Raspberry',
    emoji: '🫐',
    tags: ['berries'],
    searchTerms: ['red berry'],
  },
  { id: 'blackberry', name: 'Blackberry', emoji: '🫐', tags: ['berries'] },
  { id: 'cranberry', name: 'Cranberry', emoji: '🫐', tags: ['berries'] },
  {
    id: 'gooseberry',
    name: 'Gooseberry',
    emoji: '🫐',
    tags: ['berries', 'exotic'],
  },
  {
    id: 'elderberry',
    name: 'Elderberry',
    emoji: '🫐',
    tags: ['berries', 'exotic'],
  },
  { id: 'mulberry', name: 'Mulberry', emoji: '🫐', tags: ['berries'] },
  {
    id: 'boysenberry',
    name: 'Boysenberry',
    emoji: '🫐',
    tags: ['berries', 'exotic'],
  },

  // Stone fruits
  { id: 'peach', name: 'Peach', emoji: '🍑', tags: ['stone-fruit', 'orchard'] },
  {
    id: 'cherry',
    name: 'Cherry',
    emoji: '🍒',
    tags: ['popular', 'stone-fruit', 'orchard'],
  },
  {
    id: 'plum',
    name: 'Plum',
    emoji: '🫐',
    tags: ['stone-fruit', 'orchard'],
    searchTerms: ['purple plum'],
  },
  {
    id: 'apricot',
    name: 'Apricot',
    emoji: '🍑',
    tags: ['stone-fruit', 'orchard'],
    searchTerms: ['dried apricot'],
  },
  {
    id: 'nectarine',
    name: 'Nectarine',
    emoji: '🍑',
    tags: ['stone-fruit', 'orchard'],
  },

  // Citrus
  { id: 'lemon', name: 'Lemon', emoji: '🍋', tags: ['citrus', 'popular'] },
  {
    id: 'lime',
    name: 'Lime',
    emoji: '🍋',
    tags: ['citrus', 'popular'],
    searchTerms: ['key lime'],
  },
  { id: 'grapefruit', name: 'Grapefruit', emoji: '🍊', tags: ['citrus'] },
  {
    id: 'tangerine',
    name: 'Tangerine',
    emoji: '🍊',
    tags: ['citrus'],
    searchTerms: ['mandarin'],
  },
  { id: 'clementine', name: 'Clementine', emoji: '🍊', tags: ['citrus'] },
  {
    id: 'blood-orange',
    name: 'Blood Orange',
    emoji: '🍊',
    tags: ['citrus', 'exotic'],
  },
  { id: 'kumquat', name: 'Kumquat', emoji: '🍊', tags: ['citrus', 'exotic'] },
  { id: 'pomelo', name: 'Pomelo', emoji: '🍊', tags: ['citrus', 'exotic'] },
  { id: 'yuzu', name: 'Yuzu', emoji: '🍋', tags: ['citrus', 'exotic'] },

  // Tropical
  { id: 'mango', name: 'Mango', emoji: '🥭', tags: ['tropical', 'popular'] },
  {
    id: 'pineapple',
    name: 'Pineapple',
    emoji: '🍍',
    tags: ['tropical', 'popular'],
  },
  {
    id: 'papaya',
    name: 'Papaya',
    emoji: '🫐',
    tags: ['tropical'],
    searchTerms: ['pawpaw'],
  },
  { id: 'coconut', name: 'Coconut', emoji: '🥥', tags: ['tropical'] },
  {
    id: 'kiwi',
    name: 'Kiwi',
    emoji: '🥝',
    tags: ['tropical', 'popular'],
    searchTerms: ['kiwifruit'],
  },
  {
    id: 'passion-fruit',
    name: 'Passion Fruit',
    emoji: '🫐',
    tags: ['tropical', 'exotic'],
  },
  { id: 'guava', name: 'Guava', emoji: '🫐', tags: ['tropical', 'exotic'] },
  {
    id: 'lychee',
    name: 'Lychee',
    emoji: '🫐',
    tags: ['tropical', 'exotic'],
    searchTerms: ['litchi'],
  },
  { id: 'longan', name: 'Longan', emoji: '🫐', tags: ['tropical', 'exotic'] },
  { id: 'plantain', name: 'Plantain', emoji: '🍌', tags: ['tropical'] },

  // Melons
  {
    id: 'cantaloupe',
    name: 'Cantaloupe',
    emoji: '🍈',
    tags: ['melons'],
    searchTerms: ['rockmelon'],
  },
  { id: 'honeydew', name: 'Honeydew', emoji: '🍈', tags: ['melons'] },
  {
    id: 'watermelon-seedless',
    name: 'Seedless Watermelon',
    emoji: '🍉',
    tags: ['melons'],
  },

  // Exotic/specialty
  {
    id: 'dragonfruit',
    name: 'Dragon Fruit',
    emoji: '🐲',
    tags: ['exotic', 'tropical'],
    searchTerms: ['pitaya'],
  },
  { id: 'durian', name: 'Durian', emoji: '🌰', tags: ['exotic', 'tropical'] },
  {
    id: 'starfruit',
    name: 'Star Fruit',
    emoji: '⭐',
    tags: ['exotic', 'tropical'],
    searchTerms: ['carambola'],
  },
  {
    id: 'rambutan',
    name: 'Rambutan',
    emoji: '🫐',
    tags: ['exotic', 'tropical'],
  },
  {
    id: 'mangosteen',
    name: 'Mangosteen',
    emoji: '🫐',
    tags: ['exotic', 'tropical'],
  },
  {
    id: 'jackfruit',
    name: 'Jackfruit',
    emoji: '🫐',
    tags: ['exotic', 'tropical'],
  },
  {
    id: 'persimmon',
    name: 'Persimmon',
    emoji: '🍊',
    tags: ['exotic', 'orchard'],
  },
  { id: 'pomegranate', name: 'Pomegranate', emoji: '🫐', tags: ['exotic'] },
  { id: 'fig', name: 'Fig', emoji: '🫐', tags: ['exotic', 'orchard'] },
  {
    id: 'date',
    name: 'Date',
    emoji: '🫐',
    tags: ['exotic', 'dried'],
    searchTerms: ['medjool date'],
  },
  {
    id: 'acai',
    name: 'Acai',
    emoji: '🫐',
    tags: ['exotic', 'berries'],
    searchTerms: ['acai berry'],
  },

  // Culinary vegetables (botanically fruits)
  {
    id: 'tomato',
    name: 'Tomato',
    emoji: '🍅',
    tags: ['culinary-vegetable', 'popular'],
  },
  {
    id: 'avocado',
    name: 'Avocado',
    emoji: '🥑',
    tags: ['culinary-vegetable', 'popular', 'tropical'],
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    emoji: '🥒',
    tags: ['culinary-vegetable', 'popular'],
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper',
    emoji: '🫑',
    tags: ['culinary-vegetable'],
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    emoji: '🍆',
    tags: ['culinary-vegetable'],
  },
  { id: 'squash', name: 'Squash', emoji: '🫐', tags: ['culinary-vegetable'] },
  { id: 'pumpkin', name: 'Pumpkin', emoji: '🎃', tags: ['culinary-vegetable'] },
  {
    id: 'zucchini',
    name: 'Zucchini',
    emoji: '🥒',
    tags: ['culinary-vegetable'],
    searchTerms: ['courgette'],
  },
  {
    id: 'olive',
    name: 'Olive',
    emoji: '🫒',
    tags: ['culinary-vegetable', 'exotic'],
  },

  // Additional popular fruits
  {
    id: 'cherry-tomato',
    name: 'Cherry Tomato',
    emoji: '🍅',
    tags: ['culinary-vegetable', 'popular'],
  },
  {
    id: 'grape-tomato',
    name: 'Grape Tomato',
    emoji: '🍅',
    tags: ['culinary-vegetable'],
  },
  {
    id: 'blackcurrant',
    name: 'Blackcurrant',
    emoji: '🫐',
    tags: ['berries', 'exotic'],
  },
  {
    id: 'redcurrant',
    name: 'Redcurrant',
    emoji: '🫐',
    tags: ['berries', 'exotic'],
  },
  { id: 'quince', name: 'Quince', emoji: '🍐', tags: ['orchard', 'exotic'] },
]

/**
 * Tag metadata for display and filtering
 */
export const TAG_METADATA: Record<
  string,
  { label: string; description: string }
> = {
  popular: {
    label: 'Popular',
    description: 'Common fruits found in most supermarkets',
  },
  berries: {
    label: 'Berries',
    description: 'Small, juicy fruits with seeds',
  },
  tropical: {
    label: 'Tropical',
    description: 'Fruits from tropical climates',
  },
  citrus: {
    label: 'Citrus',
    description: 'Tangy fruits rich in vitamin C',
  },
  'stone-fruit': {
    label: 'Stone Fruits',
    description: 'Fruits with a hard pit or stone',
  },
  melons: {
    label: 'Melons',
    description: 'Large, sweet fruits with thick rind',
  },
  exotic: {
    label: 'Exotic',
    description: 'Specialty or harder-to-find fruits',
  },
  'culinary-vegetable': {
    label: 'Culinary Vegetables',
    description: 'Botanically fruits, culinarily vegetables',
  },
  dried: {
    label: 'Dried',
    description: 'Fruits commonly consumed dried',
  },
  orchard: {
    label: 'Orchard',
    description: 'Tree fruits from orchards',
  },
}
