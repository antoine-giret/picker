import Search from './search';

export const className =
  'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6';

export default function Filters({
  search,
  setSearch,
  handleSubmit,
}: {
  handleSubmit: () => void;
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Search handleSubmit={handleSubmit} search={search} setSearch={setSearch} />
    </form>
  );
}
