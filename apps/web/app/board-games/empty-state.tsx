import { FaceFrownIcon, PlusIcon } from '@heroicons/react/24/outline';

import Button from '../components/button';

export default function EmptyState() {
  return (
    <div className="flex flex-col grow-1 items-center justify-center gap-6 py-6">
      <FaceFrownIcon className="size-12" />
      <span className="text-md font-bold text-center">Ton placard est pour le moment vide...</span>
      <Button
        href="/board-games/new"
        Icon={PlusIcon}
        label="Ajouter mon premier jeu"
        variant="contained"
      />
    </div>
  );
}
