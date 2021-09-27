// Main Config!

// require Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');


module.exports = config => {

  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/')

  // --- COLLECTION ---
  // - Blog
  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md')
    ].reverse();
  });

  // - Work
  // Returns work items, sorted by display order
  // These should really just be YAML,
  // or even better, CSV!
  config.addCollection('work', collection => {
    return collection
      .getFilteredByGlob('./src/work/*.md')
      .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1));
  });
  // cannot I simply filter my existing collection ???
  config.addCollection('featuredWork', collection => {
    return collection
      .getFilteredByGlob('./src/work/*.md')
      .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1))
      .filter(x => x.data.featured);
  });


  return {
    // markdownTemplateEngine: 'njk',
    // dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: { input: 'src', output: 'dist' },

  }
}