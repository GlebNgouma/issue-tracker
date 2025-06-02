"use client";

import { Button as RadixButton } from "@radix-ui/themes";
import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  return <RadixButton>{children}</RadixButton>;
}
