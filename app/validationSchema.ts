import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire.").max(255),
  description: z.string().min(1, "La description est obligatoire."),
});
