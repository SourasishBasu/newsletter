import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine(
      (value) => {
        const rollno = value.split("@")[0];
        return /^2\d{6,7}$/.test(rollno);
      },
      {
        message:
          "The roll number must start with 2 and should be of 7-8 digits.",
      }
    )
    .refine(
      (value) => {
        const domain = value.split("@")[1];
        return domain === "kiit.ac.in";
      },
      { message: "The domain must be 'kiit.ac.in'." }
    ),
});
