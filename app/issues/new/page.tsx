"use client"; // Exécution côté client (Next.js)

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createIssueSchema } from "../../validationSchema";
import { z } from "zod";

// Chargement dynamique de l'éditeur Markdown (pas côté serveur)
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

// Typage automatique à partir du schéma Zod
type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();

  // Initialisation du formulaire avec validation Zod
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState("");

  // Fonction appelée à la soumission du formulaire
  const onHandleSubmit = async () => {
    const data = getValues();
    try {
      await axios.post("/api/issues", data); // Envoie à l'API
      router.push("/issues"); // Redirection
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* Description gérée avec Controller car SimpleMDE est un composant contrôlé */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
