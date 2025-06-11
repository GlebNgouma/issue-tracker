"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

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
    <nav className='border-b mb-5 px-5 py-3'>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
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
        </Flex>

        <Box>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <span>
                  <Avatar
                    src={session.user!.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                  />
                </span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size='2'>{session.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href='/api/auth/signout'>Se déconnecter</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {status === "unauthenticated" && (
            <Link href='/api/auth/signin'>Se connecter</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
}
