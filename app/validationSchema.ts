import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire.").max(255),
  description: z.string().min(1, "La description est obligatoire.").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire.").max(255).optional(),
  description: z
    .string()
    .min(1, "La description est obligatoire.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "L'id de l'utilisateur attribué était requis.")
    .max(255)
    .optional()
    .nullable(),
});
