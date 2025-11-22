import { Menu, MenuButton, MenuItem as HeadlessUIMenuItem, MenuItems } from '@headlessui/react';
import { ArchiveBoxArrowDownIcon, Bars3Icon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import Button from '../components/button';

export default function Header() {
  return (
    <header className="shrink-0 border-b border-black/10 dark:border-white/10">
      <nav className="flex items-center justify-between h-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link className="flex items-center gap-4 lg:gap-3 -m-1.5 p-1.5" href="/">
            <ArchiveBoxArrowDownIcon className="size-6 text-purple-500" />
            <span className="font-(family-name:--chewy) text-xl">Quoi sortir ?</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Menu>
            <MenuButton
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2.5 -m-2.5 outline-0 text-gray-700 dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <Bars3Icon className="size-6" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="w-xs max-w-9/10 flex-auto overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 p-2"
            >
              <MenuItem href="/board-games" Icon={PuzzlePieceIcon} label="Jeux de société" />
            </MenuItems>
          </Menu>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Button href="/board-games" Icon={PuzzlePieceIcon} label="Jeux de société" />
        </div>
      </nav>
    </header>
  );
}

function MenuItem({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: typeof PuzzlePieceIcon;
  label: string;
}) {
  return (
    <HeadlessUIMenuItem>
      <Link
        href={href}
        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm/7 font-semibold text-gray-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
      >
        <Icon className="size-4" />
        {label}
      </Link>
    </HeadlessUIMenuItem>
  );
}
