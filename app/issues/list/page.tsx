import { Status } from "@prisma/client";
import prisma from "../../../prisma/client";
import Pagination from "../../components/Pagination";
import NewIssueButton from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

export default async function IssuePage({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) {
  const statuses = Object.values(Status);
  const params = await searchParams;
  const status = statuses.includes(params.status) ? params.status : undefined;
  const orderBy = columnNames.includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;
  const where = { status };

  const page = parseInt(params.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  // await delay(2000);

  return (
    <Flex direction='column' gap='3'>
      <NewIssueButton />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
}

//Desactive le rendu static
export const dynamic = "force-dynamic";
