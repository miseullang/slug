import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import removeMarkdown from "remove-markdown";
import { remarkArrowReplace } from "./lib/remark-arrow-replace";

type Heading = {
  level: number;
  title: string;
  id: string;
};

function extractHeadings(raw: string): Heading[] {
  const slugger = new GithubSlugger();
  slugger.reset();
  const headings: Heading[] = [];
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const stripEmoji = (text: string) =>
    text.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "");
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(raw))) {
    const hashes = match[1];
    const rawText = match[2].replace(/#+$/, "").trim();
    const cleanText = stripEmoji(removeMarkdown(rawText)).trim();
    const safeText = cleanText || rawText;
    headings.push({
      level: hashes.length,
      title: safeText,
      id: safeText ? slugger.slug(safeText) : slugger.slug(`heading-${headings.length + 1}`),
    });
  }

  return headings;
}

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    summary: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/^posts\//, ""),
    },
    headings: {
      type: "json",
      resolve: (post) => extractHeadings(post.body?.raw ?? ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm, remarkArrowReplace],
  },
});
