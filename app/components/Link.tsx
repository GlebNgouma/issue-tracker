import NextLink from "next/link";

interface Props {
  href: string;
  children: string;
}

export default function Link({ href, children }: Props) {
  return (
    <NextLink href={href} className='hover:underline'>
      {children}
    </NextLink>
  );
}
