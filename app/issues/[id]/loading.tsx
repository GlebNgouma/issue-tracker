import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "../../components";

export default function LoadingIssueDetailPage() {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex className='space-x-3' my='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='break-normal w-xl' mt='4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}
