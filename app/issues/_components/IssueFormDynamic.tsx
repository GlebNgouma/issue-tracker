"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./IssueFormSkeleton";

export const IssueForm = dynamic(
  () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);
