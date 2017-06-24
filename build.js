const metalsmith = require('metalsmith')(__dirname);
const markdown = require('metalsmith-markdown')();

metalsmith
  .metadata({
    site: {
      name: 'brycekbargar.com',
      description: "bryce's site"
    }
  })
  .source('./src')
  .destination('./public')
  .use(markdown)
  .build(err => { if (err) throw err; });
