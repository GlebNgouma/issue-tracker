import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../../components";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Editer un problème</Link>
    </Button>
  );
};
export default EditIssueButton;
