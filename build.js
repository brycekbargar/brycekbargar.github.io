require('metalsmith')(__dirname)
  .metadata({
    site: {
      name: 'brycekbargar.com',
      description: "bryce's site"
    }
  })
  .source('./src')
  .destination('./public')
  .use(require('metalsmith-collections')({
    all: {
      pattern: ['**/*.md', '!*.md'],
      reverse: true,
      limit: 5
    },
    reviews: {
      pattern: 'reviews/*.md',
      reverse: true
    },
    life: {
      pattern: 'life/*.md',
      reverse: true
    },
    tech: {
      pattern: 'tech/*.md',
      reverse: true
    }
  }))
  .use(require('metalsmith-markdown')())
  .use(require('metalsmith-layouts')({
    engine: 'handlebars',
  }))
  .build(err => { if (err) throw err; });
