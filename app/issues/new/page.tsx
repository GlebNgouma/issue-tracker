"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit, getValues } = useForm<IssueForm>();

  const onHandleSubmit = async () => {
    const data = getValues();
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      <TextField.Root placeholder='Title' {...register("title")} />
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
}
