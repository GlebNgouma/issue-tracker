"use client";

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

export default function NewIssueButton() {
  return (
    <Flex justify='between'>
      <IssueStatusFilter />
      <Button>
        <Link href='/issues/new'>Enregistrer un poblème</Link>
      </Button>
    </Flex>
  );
}
