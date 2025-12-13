type Node = {
  type?: string;
  value?: string;
  children?: Node[];
};

const SKIP_TYPES = new Set(["code", "inlineCode"]);

function transform(node?: Node) {
  if (!node) return;
  if (node.type && SKIP_TYPES.has(node.type)) return;

  if (typeof node.value === "string") {
    node.value = node.value.replace(/→|->/g, "→").replace(/⇒|=>/g, "⇒");
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      transform(child);
    }
  }
}

export function remarkArrowReplace() {
  return (tree: unknown) => {
    transform(tree as Node);
  };
}

