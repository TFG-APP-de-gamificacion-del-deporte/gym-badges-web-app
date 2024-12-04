"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import styles from "./nav.module.scss";
import { FaChartSimple, FaMedal, FaTrophy, FaUserGroup } from "react-icons/fa6";

const LINKS = [
  { 
    name: "Badges", 
    href: "/", 
    icon: <FaMedal size="1.2rem"/>, 
  },
  { 
    name: "Rankings", 
    href: "/rankings", 
    icon: <FaTrophy size="1.2rem"/>, 
  },
  { 
    name: "Friends", 
    href: "/friends", 
    icon: <FaUserGroup size="1.2rem"/>, 
  },
  { 
    name: "Stats", 
    href: "/stats", 
    icon: <FaChartSimple size="1.2rem"/>, 
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      {LINKS.map(link => (
        <Link 
          key={link.name}
          href={link.href}
          className={clsx(
            styles.link,
            { [styles.link_active]: pathname === link.href }
          )}
        >
          <div>
            {link.icon}
            <h3>{link.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}