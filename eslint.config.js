import youcan from '@youcan/lint';

export default youcan({
  formatters: true,
  unocss: true,
  vue: true,
  ignores: [
    'youcan.app.json',
  ],
});
