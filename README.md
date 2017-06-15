# Gulp Query Cache Buster

[![Build Status](https://travis-ci.org/DetectiveQuack/gulp-query-cache-buster.svg?branch=master)](https://travis-ci.org/DetectiveQuack/gulp-query-cache-buster)

#### Appends script tags with a guid for cache busting

append url with a query string param, this will fill it with a guid

## Usage
```javascript
  return gulp.src('*.html'))
      .pipe(gulpQueryCacheBuster())
      .gulp.dest('.');
```

### Options
  param: defaults to 'bust' (Used as the key to add the guid to)

  splitCharacter: If the default `\n` doesn't work try `\r`