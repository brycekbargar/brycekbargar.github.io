const metalsmith = require('metalsmith');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'brycekbargar.com',
      description: "bryce's site"
    }
  })
  .source('./src')
  .destination('./public')
  .build(err => { if (err) throw err; });
