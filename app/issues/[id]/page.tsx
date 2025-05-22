import { notFound } from "next/navigation";
import prisma from "../../../prisma/client";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";

interface Props {
  params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className='space-x-3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
}
export default IssueDetailPage;
