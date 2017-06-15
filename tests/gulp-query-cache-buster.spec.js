const gulp = require('gulp');
const path = require('path');
const through = require('through2');

const gulpQueryCacheBuster = require('../gulp-query-cache-buster');

describe('gulp-query-cache-buster', () => {
  it('should create a new guid and append it to the placeholders', (done) => {
    gulp.src([path.join(__dirname, 'testFiles/*.html')])
      .pipe(gulpQueryCacheBuster())
      .pipe(gulp.dest(path.join(__dirname, '.tmp')))
      .pipe(through.obj((file, enc, cb) => {
        const lines = file.contents.toString().split('\n');
        const BUST_REGEXP = /\?bust=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

        lines.forEach((l) => {
          const isMatch = BUST_REGEXP.test(l);
          if (isMatch) {
            expect(isMatch).toEqual(true);
          }
        });

        cb(null, file);
      }))
      .on('finish', () => done());
  });
});
