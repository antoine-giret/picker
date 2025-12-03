import { HomeIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col grow-1 items-center gap-6 pt-6 pb-24">
      <div className="flex flex-col grow-1 items-center justify-center gap-6 py-6">
        <div className="flex flex-col items-center gap-3">
          <span className="text-6xl font-bold text-center">404</span>
          <span className="text-md text-center">Page non trouvée</span>
        </div>
        <Button
          Link={Link}
          href="/"
          Icon={HomeIcon}
          label="Revenir à l'accueil"
          variant="contained"
        />
      </div>
    </div>
  );
}
