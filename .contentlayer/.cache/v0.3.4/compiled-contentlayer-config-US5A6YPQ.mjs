// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

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
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [remarkGfm, remarkArrowReplace]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-US5A6YPQ.mjs.map
