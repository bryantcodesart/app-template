import plugin from 'tailwindcss/plugin';
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');

/** HEADS UP! Add global settings to '../../tailwind-workspace-preset.js' */

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  purge: [
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    /** Remove scrollbar util */
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
    /** Custom typography components */
    plugin(({ addComponents }) => {
      addComponents({
        '.type-headline-mobile': createTypeStyle({
          stack: 'helvetica',
          sizeInPx: 64,
          lineHeightInPx: 52,
          fontWeight: 700,
          letterSpacingInPx: 0.8,
        }),
      });
    }),
  ],
};

/**
 * @typedef {'copy' | 'display' | 'monos'} FontStackKeys
 */
const fontStacks = {
  copy: ['Super Expensive Boutique Font', 'Helvetica', 'Arial', 'sans-serif'],
  display: ['Another Expensive Boutique Font', 'Georgia', 'Times', 'serif'],
  monos: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
};

/**
 * Creates a type style object with the provided parameters.
 *
 * @param {Object} options - The options for the type style.
 * @param {number} options.fontSizeInPx - The font size in pixels.
 * @param {FontStackKeys} options.fontStack - The font stack.
 * @param {number} options.lineHeightInPx - The line height in pixels.
 * @param {number} options.fontWeight - The font weight.
 * @param {number} options.letterSpacingInPx - The letter spacing in pixels.
 * @param {string} [options.textTransform="none"] - The text transform.
 * @returns {Object} The type style object.
 */
function createTypeStyle({
  // Match these to how your designer thinks about type--and edit the logic below to match.
  sizeInPx,
  stack: stackName = 'copy',
  lineHeightInPx,
  fontWeight = 400,
  letterSpacingInPx = 0,
  textTransform = 'none',
}) {
  const oneRemInPx = 16;
  const remFontSize = sizeInPx / oneRemInPx;
  const unitlessLineHeight = lineHeightInPx / sizeInPx;
  const emLetterSpacing = letterSpacingInPx / sizeInPx;
  const remLineHeight = lineHeightInPx / oneRemInPx;

  const stack = fontStacks[stackName];
  if (!stack) throw new Error(`No font font stack found for ${stack}`);
  const fontFamily = stack.join(', ');

  // Do some logic here, if you want, based off the provided options.
  // E.g. I had a client with broken declarations such that, for that font, the weight was always 400--even for bold.
  // Or maybe one font is ALWAYS uppercase or has smoothing or ligature specifications etc.

  return {
    'font-size': `${remFontSize}rem`,
    'font-family': fontFamily,
    'line-height': unitlessLineHeight,
    'font-weight': fontWeight,
    'letter-spacing': `${emLetterSpacing}em`,
    'text-transform': textTransform === 'uppercase' ? 'uppercase' : 'none',
    '--line-height': `${remLineHeight}rem`,
  };
}
