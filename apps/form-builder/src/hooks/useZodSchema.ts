import { useMemo } from "react";
import { generateZodSchemaForForm } from "../utils/generateZodSchemaForForm";
import { FormMetadata } from "../types/form";

export function useZodSchema(metadata: FormMetadata) {
  return useMemo(() => {
    return generateZodSchemaForForm(metadata);
  }, [metadata]);
}
