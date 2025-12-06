import { z } from "zod";

// ----------------------
// FIELD SCHEMA
// ----------------------
export const FieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Field label is required."),
  type: z.string().min(1, "Field type is required."),
  size: z.string(),

  required: z.boolean().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),

  // ⭐ Select fields must have options
//  options: z.array(z.string()).optional().superRefine((opts, ctx) => {
//   const type = (ctx as any).parent.type;

//   if (type === "select" && (!opts || opts.length === 0)) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Select field must contain at least one option.",
//     });
//   }
// }),

});

// ----------------------
// ROW SCHEMA
// ----------------------
export const RowSchema = z.object({
  id: z.string(),

  // ⭐ Must have at least 1 field
  fields: z
    .array(FieldSchema)
    .min(1, "Each row must contain at least one field."),
});

// ----------------------
// SECTION SCHEMA
// ----------------------
export const SectionSchema = z.object({
  id: z.string(),

  // ⭐ Section label required & cannot stay "New Section"
  label: z
    .string()
    .min(1, "Section label is required.")
    .refine(
      (l) => l.trim() !== "New Section",
      "Please rename the section label."
    ),

  collapsed: z.boolean(),

  // ⭐ Must have at least 1 row
  rows: z
    .array(RowSchema)
    .min(1, "Section must contain at least one row."),
});

// ----------------------
// FORM METADATA
// ----------------------
export const FormMetadataSchema = z.object({
  title: z.string().min(1, "Form title is required."),
  viewType: z.enum(["CREATE", "VIEW", "EDIT"]),

  // ⭐ Must have at least 1 section
  sections: z
    .array(SectionSchema)
    .min(1, "Your form must contain at least one section."),
});
