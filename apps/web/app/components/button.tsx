import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type TVariant = 'text' | 'contained';

const variants: { [key in TVariant]: string } = {
  text: 'text-gray-700 dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5',
  contained: 'text-white bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-400',
};

function Button({
  href,
  Icon,
  label,
  variant,
}: {
  href: string;
  Icon: typeof PuzzlePieceIcon;
  label: string;
  variant?: TVariant;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm/7 font-semibold ${variants[variant || 'text']}`}
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  );
}

export default Button;
