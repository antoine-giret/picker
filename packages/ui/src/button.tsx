import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { UrlObject } from 'url';

type TVariant = 'text' | 'contained';

const variants: { [key in TVariant]: string } = {
  text: 'text-gray-700 dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5',
  contained: 'text-white bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-400',
};

type Url = string | UrlObject;

export function Button({
  Icon,
  label,
  variant,
  ...props
}: {
  Icon: typeof PuzzlePieceIcon;
  label: string;
  variant?: TVariant;
} & (
  | {
      Link: React.ForwardRefExoticComponent<
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
          href: Url;
        } & React.RefAttributes<HTMLAnchorElement>
      >;
      href: string;
    }
  | { onClick: () => void }
)) {
  const className = `flex items-center gap-2 rounded-md px-4 py-2 text-sm/7 font-semibold ${variants[variant || 'text']}`;

  if ('Link' in props) {
    const { Link, href } = props;

    return (
      <Link href={href} className={className}>
        <Icon className="size-4 shrink-0" />
        {label}
      </Link>
    );
  }

  return (
    <button className={className}>
      <Icon className="size-4 shrink-0" />
      {label}
    </button>
  );
}
