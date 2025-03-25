import { z } from "../../../deps.ts";

export const ContactDto = z.object({
  name: z.string().max(50).min(3),
  email: z.string().email(),
  message: z.string().max(500),
});

export type ContactDtoType = z.infer<typeof ContactDto>;
