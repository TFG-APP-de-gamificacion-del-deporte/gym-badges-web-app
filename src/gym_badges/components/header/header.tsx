"use client";

import styles from "./header.module.scss";
import Link from "next/link";
import { CheckBadgeIcon, StarIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { usePathname } from "next/navigation";

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
    icon: <UserIcon className={styles.icon}/> 
  },
  { 
    name: 'Stats', 
    href: '/stats', 
    icon: <ChartBarIcon className={styles.icon}/> 
  },
];

export default function Header() {
  const pathname = usePathname();
  
  return (
    <div className={styles.header}>
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
    </div>
  );
}
