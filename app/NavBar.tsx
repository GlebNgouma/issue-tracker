"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

export default function NavBar() {
  //Recupere le chemin actuel
  const currentPath = usePathname();
  //permet d'acceder a la session en cours de user
  const { data: session, status } = useSession();

  const links = [
    { label: "Tableau de bord", href: "/" },
    { label: "Poblemes", href: "/issues/list" },
  ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <FaBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Box>
        {status === "authenticated" && (
          <Link href='/api/auth/signout'>Se déconnecter</Link>
        )}

        {status === "unauthenticated" && (
          <Link href='/api/auth/signin'>Se connecter</Link>
        )}
      </Box>
    </nav>
  );
}
