import Book from "./components/book";
import Bookshelf from "./components/bookshelf";

const LogsPage = () => {
  const books = [
    { title: "겨울의 기록", date: "2026.01.02" },
    { title: "개발 노트: 홈 개편", date: "2026.01.01" },
    { title: "한 줄 회고", date: "2025.12.28" },
    { title: "리팩터링 메모", date: "2025.12.20" },
    { title: "작은 개선 모음", date: "2025.12.12" },
    { title: "디자인 스냅샷", date: "2025.12.05" },
    { title: "새로운 시도", date: "2025.11.28" },
    { title: "회고: 가을", date: "2025.11.15" },
  ];
  const booksPerShelf = 4;
  const shelves = books.reduce<{ title: string; date: string }[][]>(
    (rows, book, index) => {
      const rowIndex = Math.floor(index / booksPerShelf);
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(book);
      return rows;
    },
    []
  );

  return (
    <main className="relative min-h-screen bg-linear-to-b from-transparent to-gray-50/50">
      {shelves.map((shelf, index) => (
        <Bookshelf key={`shelf-${index}`}>
            {shelf.map((book) => (
              <Book key={book.title} title={book.title} date={book.date} />
            ))}
        </Bookshelf>
      ))}
    </main>
  );
};

export default LogsPage;
