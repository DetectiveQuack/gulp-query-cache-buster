const through = require('through2');
const uuidV4 = require('uuid/v4');

const LINK_REGEXP = /(?:href=|src=|url\()['|"]([^\s>"']+?)/;
const GUID_REGEXP = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

const defaultOptions = {
  param: 'bust',
  splitCharacter: '\n'
};

const gulpQueryCacheBuster = (options = defaultOptions) => through.obj((file, enc, cb) => {
  const lines = file.contents.toString().split(options.splitCharacter);

  const checkedLines = lines.map((line) => {
    let l = line;

    if (LINK_REGEXP.test(l)) {
      l = l.replace(new RegExp(`\\?${options.param}=${GUID_REGEXP}`), `?${options.param}=`);
      l = l.replace(new RegExp(`\\?${options.param}=`, 'g'), `?${options.param}=${uuidV4()}`);
    }

    return l;
  });

  file.contents = new Buffer(checkedLines.join('\n'));

  return cb(null, file);
});

module.exports = gulpQueryCacheBuster;
