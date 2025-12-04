import { ReactNode, useState } from 'react';
import { FormBuilderContext } from './FormBuilderContext';
import { FormMetadata, Section, Row, Field } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

const initialMetadata: FormMetadata = {
  title: '',
  viewType: 'CREATE',
  sections: [],
};

export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<FormMetadata>(initialMetadata);

  // ⭐ FIX — this MUST be inside the provider
  const [submittedData, setSubmittedData] = useState<any>(null);

  // -----------------------------
  // Add a new section
  // -----------------------------
  const addSection = () => {
    const newSection: Section = {
      id: uuidv4(),
      label: 'New Section',
      collapsed: false,
      rows: [],
    };

    setMetadata((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  // -----------------------------
  // Delete a section
  // -----------------------------
  const deleteSection = (sectionId: string) => {
    setMetadata((prev) => ({
      ...prev,
      sections: prev.sections.filter((sec) => sec.id !== sectionId),
    }));
  };

  // -----------------------------
  // Add a row inside a section
  // -----------------------------
  const addRow = (sectionId: string) => {
    setMetadata((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              rows: [...section.rows, { id: uuidv4(), fields: [] }],
            }
      ),
    }));
  };

  // -----------------------------
  // Delete a row
  // -----------------------------
  const deleteRow = (sectionId: string, rowId: string) => {
    setMetadata((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              rows: section.rows.filter((row) => row.id !== rowId),
            }
      ),
    }));
  };

  // -----------------------------
  // Add a field inside a row
  // -----------------------------
  const addField = (sectionId: string, rowId: string) => {
    setMetadata((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              rows: section.rows.map((row) =>
                row.id !== rowId
                  ? row
                  : {
                      ...row,
                      fields: [
                        ...row.fields,
                        {
                          id: uuidv4(),
                          label: 'New Field',
                          type: 'text',
                          size: 'SMALL',

                          // ⭐ DEFAULT VALIDATION RULES
                          required: false,
                          minLength: undefined,
                          maxLength: undefined,
                          min: undefined,
                          max: undefined,

                          // placeholder: '',
                          options: [], // for select field (can change later)

                          defaultValue: false, // for checkbox
                        },
                      ],
                    }
              ),
            }
      ),
    }));
  };

  // -----------------------------
  // Delete a field
  // -----------------------------
  const deleteField = (sectionId: string, rowId: string, fieldId: string) => {
    setMetadata((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              rows: section.rows.map((row) =>
                row.id !== rowId
                  ? row
                  : {
                      ...row,
                      fields: row.fields.filter(
                        (field) => field.id !== fieldId
                      ),
                    }
              ),
            }
      ),
    }));
  };

  return (
    <FormBuilderContext.Provider
      value={{
        metadata,
        setMetadata,
        submittedData,
        setSubmittedData,
        addSection,
        deleteSection,
        addRow,
        addField,
        deleteField,
        deleteRow,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};
