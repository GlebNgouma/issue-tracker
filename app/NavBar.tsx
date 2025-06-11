"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";

export default function NavBar() {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
          <Link href='/'>
            <FaBug />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
}

const NavLinks = () => {
  //Recupere le chemin actuel
  const currentPath = usePathname();

  const links = [
    { label: "Tableau de bord", href: "/" },
    { label: "Poblemes", href: "/issues/list" },
  ];
  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  //permet d'acceder a la session en cours de user
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated") {
    return (
      <Link className='nav-link' href='/api/auth/signin'>
        Se connecter
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <span>
            <Avatar
              src={session!.user!.image!}
              fallback='?'
              size='2'
              radius='full'
              className='cursor-pointer'
              referrerPolicy='no-referrer'
            />
          </span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Se déconnecter</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
