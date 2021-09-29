// Main Config!

// require Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {

  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Plugins
  config.addPlugin(rssPlugin);

  // Set directories to pass through to the dist folder
  // config.addPassthroughCopy('./src/images/')
// Only minify HTML if we are in production because it slows builds _right_ down
if (isProduction) {
  config.addTransform('htmlmin', htmlMinTransform);
}

  // --- COLLECTION ---
  // - Blog
  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md')
    ].reverse();
  });

  // - People
  // Returns a list of people ordered by filename
  config.addCollection('people', collection => {
    return collection.getFilteredByGlob('./src/people/*.md').sort((a, b) => {
      return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    });
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