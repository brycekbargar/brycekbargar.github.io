require('metalsmith')(__dirname)
  .metadata({
    site: {
      name: 'brycekbargar.com',
      description: "bryce's site"
    }
  })
  .source('./src')
  .destination('./public')
  .use(require('metalsmith-markdown')())
  .use(require('metalsmith-layouts')({
    engine: 'handlebars',
    default: 'default.hbs',
  }))
  .build(err => { if (err) throw err; });
