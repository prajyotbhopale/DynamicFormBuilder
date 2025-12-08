import { ReactNode, useState, useEffect, useRef } from 'react';
import { FormBuilderContext } from './FormBuilderContext';
import { FormMetadata, Section } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

const initialMetadata: FormMetadata = {
  title: '',
  viewType: 'CREATE',
  sections: [],
};

export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<FormMetadata>(initialMetadata);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [builderError, setBuilderError] = useState<string | null>(null);

  const firstLoadRef = useRef(true);

  // Do nothing on first load → always start empty
  useEffect(() => {}, []);

  // ⭐ 2. AUTO-SAVE AFTER LOAD FINISHES
  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return; // Do NOT auto-save on first render
    }

    // Save on every change AFTER load
    localStorage.setItem('formBuilderMetadata', JSON.stringify(metadata));
  }, [metadata]);

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

  // Delete Section
  const deleteSection = (sectionId: string) => {
    setMetadata((prev) => ({
      ...prev,
      sections: prev.sections.filter((sec) => sec.id !== sectionId),
    }));
  };

  // Add Row
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

  // Delete Row
  const deleteRow = (sectionId: string, rowId: string) => {
    setMetadata((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id !== sectionId
          ? section
          : { ...section, rows: section.rows.filter((r) => r.id !== rowId) }
      ),
    }));
  };

  // Add Field
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
                          required: false,
                          minLength: undefined,
                          maxLength: undefined,
                          min: undefined,
                          max: undefined,
                          options: [],
                          defaultValue: false, // checkbox
                        },
                      ],
                    }
              ),
            }
      ),
    }));
  };

  // Delete Field
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
                      fields: row.fields.filter((f) => f.id !== fieldId),
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
        deleteRow,
        addField,
        deleteField,
        builderError,
        setBuilderError,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};
