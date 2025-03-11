import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LocalStorageTodoDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  isCompleted: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().or(z.null()),
});

export type LocalStorageTodoDTO = z.infer<typeof LocalStorageTodoDTOSchema>;
