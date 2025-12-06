import { createContext } from "react";
import { FormMetadata } from "../types/form";

export type FormBuilderContextType = {
  metadata: FormMetadata;
  setMetadata: React.Dispatch<React.SetStateAction<FormMetadata>>;

  submittedData: any;
  setSubmittedData: React.Dispatch<React.SetStateAction<any>>;

  addSection: () => void;
  deleteSection: (sectionId: string) => void;

  addRow: (sectionId: string) => void;
  deleteRow: (sectionId: string, rowId: string) => void;

  addField: (sectionId: string, rowId: string) => void;
  deleteField: (sectionId: string, rowId: string, fieldId: string) => void;

  // ⭐ New validation error system
  builderError: string | null;
  setBuilderError: (msg: string | null) => void;
};

export const FormBuilderContext =
  createContext<FormBuilderContextType | null>(null);
