// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import removeMarkdown from "remove-markdown";

// lib/remark-arrow-replace.ts
var SKIP_TYPES = /* @__PURE__ */ new Set(["code", "inlineCode"]);
function transform(node) {
  if (!node)
    return;
  if (node.type && SKIP_TYPES.has(node.type))
    return;
  if (typeof node.value === "string") {
    node.value = node.value.replace(/→|->/g, "\u2192").replace(/⇒|=>/g, "\u21D2");
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      transform(child);
    }
  }
}
function remarkArrowReplace() {
  return (tree) => {
    transform(tree);
  };
}

// contentlayer.config.ts
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
    summary: { type: "string", required: false }
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
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm, remarkArrowReplace]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-2IJYECW6.mjs.map
