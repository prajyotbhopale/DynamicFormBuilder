import React, { useCallback, useContext } from "react";
import { FormBuilderContext } from "../../context/FormBuilderContext";
import { Field } from "../../types/form";
import { FieldControls } from "./FieldControls";

type FieldProps = {
  field: Field;
  rowId: string;
  sectionId: string;
};

const FieldBase = ({ field, rowId, sectionId }: FieldProps) => {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) return null;

  const { setMetadata, deleteField } = ctx;

  // Clean update logic
  const updateField = useCallback(
    (updates: Partial<Field>) => {
      setMetadata((prev) => {
        const updatedSections = prev.sections.map((section) => {
          if (section.id !== sectionId) return section;

          const updatedRows = section.rows.map((row) => {
            if (row.id !== rowId) return row;

            const updatedFields = row.fields.map((f) =>
              f.id === field.id ? { ...f, ...updates } : f
            );

            return { ...row, fields: updatedFields };
          });

          return { ...section, rows: updatedRows };
        });

        return { ...prev, sections: updatedSections };
      });
    },
    [sectionId, rowId, field.id, setMetadata]
  );

  return (
    <div className="border p-3 rounded bg-white shadow-sm">
      <FieldControls
        field={field}
        updateField={updateField}
        deleteField={() => deleteField(sectionId, rowId, field.id)}
      />
    </div>
  );
};

export const FieldComponent = React.memo(FieldBase);
