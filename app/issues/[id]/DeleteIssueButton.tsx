"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>Supprimer un problème</Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth='450px'>
          <AlertDialog.Title>Confirmer la suppression</AlertDialog.Title>
          <AlertDialog.Description>
            Êtes-vous sûr de vouloir supprimer ce problème ? Cette action ne
            peut pas être annulée.
          </AlertDialog.Description>

          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Annuler
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant='solid' color='red' onClick={deleteIssue}>
                Supprimer un problème
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth='450px'>
          <AlertDialog.Title>Erreur</AlertDialog.Title>
          <AlertDialog.Description>
            Ce problème n&apos;a pas pu être supprimée.
          </AlertDialog.Description>
          <Button
            variant='soft'
            color='gray'
            mt='2'
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
