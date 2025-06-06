"use client"; // Exécution côté client (Next.js)

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { issueSchema } from "../../validationSchema";

import SimpleMDE from "react-simplemde-editor";

// Chargement dynamique de l'éditeur Markdown (pas côté serveur)
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

// Typage automatique à partir du schéma Zod
type IssueFormData = z.infer<typeof issueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();

  // Initialisation du formulaire avec validation Zod
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");

  // Fonction appelée à la soumission du formulaire
  const onHandleSubmit = async () => {
    const data = getValues();
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data); // Envoie à l'API
      }
      router.push("/issues/list"); // Redirection
      router.refresh();
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
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='Title'
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* Description gérée avec Controller car SimpleMDE est un composant contrôlé */}
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Mise à jour" : "Soumettre"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
