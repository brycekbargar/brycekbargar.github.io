require('metalsmith')(__dirname)
  .metadata({
    site: {
      name: 'brycekbargar.com',
    }
  })
  .source('./src')
  .destination('./blog')
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
  .use(require('metalsmith-permalinks')({
    pattern: ':title',
    relative: false,
    linksets: [{
      match: { collection: 'reviews' },
      pattern: 'reviews/:title',
    }, {
      match: { collection: 'life' },
      pattern: 'life/:title',
    }, {
      match: { collection: 'tech' },
      pattern: 'tech/:title',
    }],
  }))
  .use(require('metalsmith-layouts')({
    engine: 'handlebars',
    partials: {
      header: 'partials/header',
      footer: 'partials/footer',
      postSummary: 'partials/postSummary',
    }
  }))
  .build(err => { if (err) throw err; });
