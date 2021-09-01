module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("rendersection", function (name) {
    if (!this.page.sections) return "";

    return this.page.sections[name] || "";
  });
  eleventyConfig.addPairedShortcode("section", function (content, name) {
    this.page.sections = this.page.sections || {};
    this.page.sections[name] = content;

    return "";
  });

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy("site/static/*");

  return {
    dir: {
      input: "site",
    },
    passthroughFileCopy: true,
  };
};
