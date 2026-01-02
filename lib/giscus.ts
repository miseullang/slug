const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_REPO = "miseullang/slug";

type DiscussionSearchResponse = {
  data?: {
    search?: {
      nodes?: Array<{
        title?: string | null;
        url?: string | null;
        comments?: { totalCount?: number } | null;
      }>;
    };
  };
};

const fetchDiscussionCommentCount = async (
  pathname: string
): Promise<number> => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return 0;
  }

  const normalizedPath = pathname.replace(/^\/+/, "");
  const query = `repo:${GITHUB_REPO} in:title "${normalizedPath}"`;
  const body = JSON.stringify({
    query: `
      query ($query: String!) {
        search(query: $query, type: DISCUSSION, first: 5) {
          nodes {
            ... on Discussion {
              title
              url
              comments {
                totalCount
              }
            }
          }
        }
      }
    `,
    variables: { query },
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  let response: Response;
  try {
    response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
      next: { revalidate: 300 },
      signal: controller.signal,
    });
  } catch {
    clearTimeout(timeoutId);
    return 0;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    return 0;
  }

  const json = (await response.json()) as DiscussionSearchResponse;
  const nodes = json.data?.search?.nodes ?? [];
  const exactMatch = nodes.find((node) => node?.title === normalizedPath);
  const selected =
    exactMatch ??
    nodes.reduce((current, node) => {
      const currentCount = current?.comments?.totalCount ?? -1;
      const nextCount = node?.comments?.totalCount ?? -1;
      return nextCount > currentCount ? node : current;
    }, nodes[0]);
  const count = selected?.comments?.totalCount ?? 0;
  return count;
};

export const fetchDiscussionCommentCounts = async (
  pathnames: string[]
): Promise<Record<string, number>> => {
  const entries = await Promise.all(
    pathnames.map(async (pathname) => [
      pathname,
      await fetchDiscussionCommentCount(pathname),
    ])
  );

  return Object.fromEntries(entries);
};
