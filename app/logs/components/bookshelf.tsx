type BookshelfProps = {
  children: React.ReactNode;
};

const Bookshelf = ({ children }: BookshelfProps) => {
  return (
    <aside className="w-full bg-linear-to-b from-transparent flex gap-6 flex-wrap justify-center align-baseline to-gray-100/70 pt-30 pb-3">
      {children}
    </aside>
  );
};

export default Bookshelf;
