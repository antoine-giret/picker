import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { UrlObject } from 'url';

import { Button } from './button';

type Url = string | UrlObject;

export type TBreadcrumbItem = {
  href?: string;
  Icon?: typeof HomeIcon;
  key: string;
  label: React.ReactNode;
};

export function Breadcrumb({
  Link,
  items,
}: {
  items: TBreadcrumbItem[];
  Link: React.ForwardRefExoticComponent<
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
      href: Url;
    } & React.RefAttributes<HTMLAnchorElement>
  >;
}) {
  const lastLinkItem = items
    .slice()
    .reverse()
    .find(({ href }) => href);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="hidden md:inline-flex items-center gap-3">
        {items.map(({ key, href, Icon, label }, index) => (
          <li key={key}>
            <div className="flex items-center gap-3">
              {index > 0 && <ChevronRightIcon className="size-4 shrink-0" />}
              {href ? (
                <Link
                  className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-black/90 dark:hover:text-white/90"
                  href={href}
                >
                  {Icon && <Icon className="size-4 shrink-0" />}
                  <span>{label}</span>
                </Link>
              ) : (
                <span className="text-sm font-medium text-body-subtle">{label}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
      {lastLinkItem?.href && (
        <div className="inline-flex md:hidden">
          <Button
            Icon={ChevronLeftIcon}
            Link={Link}
            size="small"
            href={lastLinkItem.href}
            label={lastLinkItem.label}
          />
        </div>
      )}
    </nav>
  );
}
