"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit, getValues } = useForm<IssueForm>();
  const [error, setError] = useState("");

  const onHandleSubmit = async () => {
    const data = getValues();
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setError("Une erreur inattendue s'est produite.");
    }
  };

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={handleSubmit(onHandleSubmit)}>
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
    </div>
  );
}
