"use client";

import Link from "next/link";
import { CheckBadgeIcon, StarIcon, UsersIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import styles from "./nav.module.scss";

const LINKS = [
  { 
    name: 'Badges', 
    href: '/', 
    icon: <CheckBadgeIcon className={styles.icon}/> 
  },
  { 
    name: 'Rankings', 
    href: '/rankings', 
    icon: <StarIcon className={styles.icon}/> 
  },
  { 
    name: 'Friends', 
    href: '/friends', 
    icon: <UsersIcon className={styles.icon}/> 
  },
  { 
    name: 'Stats', 
    href: '/stats', 
    icon: <ChartBarIcon className={styles.icon}/> 
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {LINKS.map(link => (
        <Link 
          key={link.name}
          href={link.href}
          className={clsx(
            styles.link,
            { [styles.link_active]: pathname === link.href }
          )}
        >
          {link.icon}
          <h3>{link.name}</h3>
        </Link>
      ))}
    </>
  )
}