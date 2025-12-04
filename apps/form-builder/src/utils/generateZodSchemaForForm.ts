import { z } from 'zod';
import { FormMetadata } from '../types/form';

export const generateZodSchemaForForm = (metadata: FormMetadata) => {
  const fieldsSchema: Record<string, any> = {};

  metadata.sections.forEach((section) => {
    section.rows.forEach((row) => {
      row.fields.forEach((field) => {
        let schema: any;

        // -------------------------------------
        // TEXT + TEXTAREA
        // -------------------------------------
        if (field.type === 'text' || field.type === 'textarea') {
          schema = z.string().optional().or(z.literal(''));

          if (field.required) {
            schema = schema.refine(
              (v: any) => typeof v === 'string' && v.trim() !== '',
              `${field.label} is required`
            );
          }

          if (field.minLength) {
            schema = schema.refine(
              (v: any) =>
                typeof v === 'string' &&
                (v === '' || v.length >= field.minLength!),
              `${field.label} must be at least ${field.minLength} characters`
            );
          }

          if (field.maxLength) {
            schema = schema.refine(
              (v: any) =>
                typeof v === 'string' &&
                (v === '' || v.length <= field.maxLength!),
              `${field.label} must be at most ${field.maxLength} characters`
            );
          }
        }

        // -------------------------------------
        // NUMBER
        // -------------------------------------
        else if (field.type === 'number') {
          schema = z
            .string()
            .optional()
            .or(z.literal(''))
            .refine(
              (v: any) => v === '' || !isNaN(Number(v)),
              `${field.label} must be a number`
            );

          if (field.required) {
            schema = schema.refine(
              (v: any) => v !== '',
              `${field.label} is required`
            );
          }

          if (field.min !== undefined) {
            schema = schema.refine(
              (v: any) => v === '' || Number(v) >= field.min!,
              `${field.label} must be ≥ ${field.min}`
            );
          }

          if (field.max !== undefined) {
            schema = schema.refine(
              (v: any) => v === '' || Number(v) <= field.max!,
              `${field.label} must be ≤ ${field.max}`
            );
          }
        }

        // -------------------------------------
        // DATE
        // -------------------------------------
        else if (field.type === 'date') {
          schema = z.string().optional().or(z.literal(''));

          if (field.required) {
            schema = schema.refine(
              (v: any) => v !== '',
              `${field.label} is required`
            );
          }
        }

        // -------------------------------------
        // CHECKBOX
        // -------------------------------------
        else if (field.type === 'checkbox') {
          schema = z.boolean().optional();

          if (field.required) {
            schema = schema.refine(
              (v: any) => v === true,
              `${field.label} must be checked`
            );
          }
        }

        // -------------------------------------
        // SELECT
        // -------------------------------------
        else if (field.type === 'select') {
          schema = z.string().optional().or(z.literal(''));

          if (field.required) {
            schema = schema.refine(
              (v: any) => v !== '',
              `${field.label} is required`
            );
          }

          if (field.options && field.options.length > 0) {
            schema = schema.refine(
              (v: any) =>
                v === '' ||
                (typeof v === 'string' &&
                  (field.options?.includes(v) ?? false)),

              `${field.label} must be a valid option`
            );
          }
        }

        // -------------------------------------
        // DEFAULT
        // -------------------------------------
        else {
          schema = z.any();
        }

        fieldsSchema[field.id] = schema;
      });
    });
  });

  return z.object(fieldsSchema);
};
