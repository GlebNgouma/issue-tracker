import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import { IssueForm } from "../../_components/IssueFormDynamic";

interface Props {
  params: Promise<{ id: string }>;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function EditIssuePage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
}
