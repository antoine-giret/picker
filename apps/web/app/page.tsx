import { MusicalNoteIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const colors = {
  purple: 'bg-purple-500 dark:bg-purple-900',
  fuchsia: 'bg-fuchsia-500 dark:bg-fuchsia-900',
};

const hoverColors = {
  purple: 'hover:bg-purple-600 dark:hover:bg-purple-800',
  fuchsia: 'hover:bg-fuchsia-600 dark:hover:bg-fuchsia-800',
};

function Card({
  soon,
  color,
  hoverColor,
  href,
  Icon,
  label,
}: {
  color: string;
  hoverColor: string;
  href: string;
  Icon: typeof PuzzlePieceIcon;
  label: string;
  soon?: boolean;
}) {
  const className = 'flex flex-col items-center gap-3 w-xl max-w-full rounded-md p-6 text-white';
  const labelClassName = 'font-(family-name:--chewy) text-2xl';

  if (soon) {
    return (
      <div className={`${className} ${color}`}>
        <Icon className="size-12" />
        <div className="flex items-center gap-2">
          <span className={labelClassName}>{label}</span>
          <span className="text-sm">(bientôt)</span>
        </div>
      </div>
    );
  }

  return (
    <Link className={`${className} ${color} ${hoverColor}`} href={href}>
      <Icon className="size-12" />
      <span className={labelClassName}>{label}</span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col grow-1 items-center justify-center gap-6 py-6">
      <h1 className="text-md font-bold text-center">Que souhaites-tu sortir du placard ?</h1>
      <Card
        color={colors.purple}
        hoverColor={hoverColors.purple}
        href="/board-games"
        Icon={PuzzlePieceIcon}
        label="Jeux de société"
      />
      <Card
        soon
        color={colors.fuchsia}
        hoverColor={hoverColors.fuchsia}
        href="#"
        Icon={MusicalNoteIcon}
        label="Vinyles"
      />
    </div>
  );
}
