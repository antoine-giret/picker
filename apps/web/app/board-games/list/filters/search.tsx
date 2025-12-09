import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '@repo/ui/input-field';

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
        <InputField
          hideLabel
          id="search"
          label="Search"
          onChange={setSearch}
          placeholder="Rechercher un jeu"
          secondaryAction={
            <button
              className="shrink-0 h-9 w-9 rounded-md flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              onClick={(event) => {
                handleSubmit();
                event.preventDefault();
              }}
            >
              <MagnifyingGlassIcon className="size-4 text-gray-400" />
            </button>
          }
          value={search}
        />
      </div>
    </>
  );
}
