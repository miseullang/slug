import { allDocuments } from "contentlayer/generated";
import Book, { PlaceholderBook } from "./components/book";
import Bookshelf from "./components/bookshelf";

const getDeterministicTilt = (seed: string) =>
  seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2 === 0
    ? "left"
    : "right";

type LogDocument = {
  slug?: string;
  title: string;
  date: string;
  cover?: string;
  _raw?: { flattenedPath?: string };
};

const getLogSlug = (log: LogDocument) =>
  log.slug ?? log._raw?.flattenedPath?.replace(/^logs\//, "") ?? log.title;

const formatLogDate = (rawDate: string) => {
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return rawDate;
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const LogsPage = () => {
  const logs = (allDocuments as unknown as LogDocument[])
    .filter((doc) => doc._raw?.flattenedPath?.startsWith("logs/"))
    .map((log) => ({
      title: log.title,
      date: formatLogDate(log.date),
      slug: getLogSlug(log),
      cover: log.cover,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const booksPerShelf = 8;
  const shelves = logs.reduce<
    { title: string; date: string; slug: string; cover?: string }[][]
  >((rows, book, index) => {
    const rowIndex = Math.floor(index / booksPerShelf);
    if (!rows[rowIndex]) {
      rows[rowIndex] = [];
    }
    rows[rowIndex].push(book);
    return rows;
  }, []);

  return (
    <main className="relative min-h-screen bg-linear-to-b from-transparent to-gray-50/50">
      {shelves.map((shelf, index) => (
        <Bookshelf key={`shelf-${index}`}>
          {shelf.map((book, bookIndex) => {
            const isFirst = bookIndex === 0;
            const isLast = bookIndex === shelf.length - 1;
            const tilt = isFirst
              ? "right"
              : isLast
              ? "left"
              : getDeterministicTilt(book.title);

            return (
              <Book
                key={book.slug}
                title={book.title}
                date={book.date}
                slug={book.slug}
                image={book.cover}
                tilt={tilt}
              />
            );
          })}
        </Bookshelf>
      ))}
      <Bookshelf>
        <PlaceholderBook />
      </Bookshelf>
      <Bookshelf>
        <PlaceholderBook />
      </Bookshelf>
    </main>
  );
};

export default LogsPage;
