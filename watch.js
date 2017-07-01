require('./config.js')
  .use(require('metalsmith-serve')({
    host: '192.168.102.2',
    verbose: true,
    document_root: './'
  }))
  .use(require('metalsmith-watch')({
    '${source}/**/*': true,
    'layouts/**/*': '**/*'
  }))
  .build(err => { if (err) throw err; });
