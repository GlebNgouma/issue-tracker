"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function NewIssueButton() {
  return (
    <div className='mb-5'>
      <Button>
        <Link href='/issues/new'>Enregistrer un poblème</Link>
      </Button>
    </div>
  );
}
