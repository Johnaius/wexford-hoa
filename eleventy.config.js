import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Rewrites absolute links when the site is served from a sub-path (e.g. username.github.io/repo/).
  eleventyConfig.addPlugin(HtmlBasePlugin);
  // Static files copied as-is.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/uploads");

  eleventyConfig.addCollection("announcements", (api) =>
    api.getFilteredByGlob("src/announcements/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByGlob("src/events/*.md").sort((a, b) => a.date - b.date)
  );

  // Dates from the CMS are date-only values, so format them in UTC to avoid off-by-one-day shifts.
  eleventyConfig.addFilter("readableDate", (value) =>
    new Date(value).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString().slice(0, 10));
  eleventyConfig.addFilter("monthShort", (value) =>
    new Date(value).toLocaleDateString("en-US", { timeZone: "UTC", month: "short" })
  );
  eleventyConfig.addFilter("dayNum", (value) => new Date(value).getUTCDate());
  eleventyConfig.addFilter("initials", (name = "") =>
    name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase()
  );

  eleventyConfig.addFilter("pinnedFirst", (posts) => [
    ...posts.filter((p) => p.data.pinned),
    ...posts.filter((p) => !p.data.pinned),
  ]);

  eleventyConfig.addFilter("limit", (items, n) => items.slice(0, n));

  eleventyConfig.addFilter("uniqueValues", (items, key) => [...new Set((items || []).map((i) => i[key] || "Other"))]);

  const today = () => new Date().toISOString().slice(0, 10);
  const day = (item) => new Date(item.date).toISOString().slice(0, 10);
  eleventyConfig.addFilter("upcoming", (events) => events.filter((e) => day(e) >= today()));
  eleventyConfig.addFilter("past", (events) => events.filter((e) => day(e) < today()).reverse());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Content written by editors in the CMS is plain Markdown; never run it through a template engine.
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
