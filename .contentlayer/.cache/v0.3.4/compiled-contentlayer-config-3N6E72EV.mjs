// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import removeMarkdown from "remove-markdown";
function extractHeadings(raw) {
  const slugger = new GithubSlugger();
  slugger.reset();
  const headings = [];
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const stripEmoji = (text) => text.replace(/\p{Extended_Pictographic}|\uFE0F/gu, "");
  let match;
  while (match = headingRegex.exec(raw)) {
    const hashes = match[1];
    const rawText = match[2].replace(/#+$/, "").trim();
    const cleanText = stripEmoji(removeMarkdown(rawText)).trim();
    const safeText = cleanText || rawText;
    headings.push({
      level: hashes.length,
      title: safeText,
      id: safeText ? slugger.slug(safeText) : slugger.slug(`heading-${headings.length + 1}`)
    });
  }
  return headings;
}
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    summary: { type: "string", required: false },
    giscusId: { type: "string", required: false },
    category: { type: "string", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/^posts\//, "")
    },
    headings: {
      type: "json",
      resolve: (post) => extractHeadings(post.body?.raw ?? "")
    }
  }
}));
var Log = defineDocumentType(() => ({
  name: "Log",
  filePathPattern: `logs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    summary: { type: "string", required: false },
    giscusId: { type: "string", required: false },
    cover: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (log) => log._raw.flattenedPath.replace(/^logs\//, "")
    },
    headings: {
      type: "json",
      resolve: (log) => extractHeadings(log.body?.raw ?? "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Log],
  mdx: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-3N6E72EV.mjs.map
