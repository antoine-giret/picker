import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({
  search,
  setSearch,
  handleSubmit,
}: {
  handleSubmit: () => void;
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <>
      <div>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="flex items-center rounded-md pl-3 bg-black/5 dark:bg-white/5 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-purple-500">
          <input
            className="block min-w-0 grow px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            id="search"
            name="search"
            onChange={({ target: { value } }) => setSearch(value)}
            placeholder="Rechercher un jeu"
            type="text"
            value={search}
          />
          <button
            className="shrink-0 h-9 w-9 rounded-md flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            onClick={handleSubmit}
          >
            <MagnifyingGlassIcon className="size-4 text-gray-400" />
          </button>
        </div>
      </div>
    </>
  );
}
