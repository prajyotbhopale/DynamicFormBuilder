import { useContext, useState, useEffect } from "react";
import { FormBuilderContext } from "../../context/FormBuilderContext";
import { Field } from "../../types/form";

type FieldProps = {
  field: Field;
  rowId: string;
  sectionId: string;
};

export const FieldComponent = ({ field, rowId, sectionId }: FieldProps) => {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) return null;

  const { metadata, setMetadata, deleteField } = ctx;

  // Generic helper to update a field
  const updateField = (updates: Partial<Field>) => {
    const updatedSections = metadata.sections.map((section) => {
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

    setMetadata({ ...metadata, sections: updatedSections });
  };

  return (
    <div className="border p-3 rounded bg-white shadow-sm">
      {/* Field Label */}
      <input
        type="text"
        value={field.label}
        onChange={(e) => updateField({ label: e.target.value })}
        className="border px-2 py-1 w-full rounded mb-2"
        placeholder="Field Label"
      />

      {/* Field Type Dropdown */}
      <select
        value={field.type}
        onChange={(e) => updateField({ type: e.target.value as Field["type"] })}
        className="border px-2 py-1 w-full rounded mb-2"
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="textarea">Textarea</option>
        <option value="select">Select</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {/* Field Size Dropdown */}
      <select
        value={field.size}
        onChange={(e) => updateField({ size: e.target.value as Field["size"] })}
        className="border px-2 py-1 w-full rounded mb-2"
      >
        <option value="SMALL">Small (33%)</option>
        <option value="MEDIUM">Medium (50%)</option>
        <option value="LARGE">Large (66%)</option>
        <option value="XL">XL (100%)</option>
      </select>

      {/* Required Toggle */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={field.required ?? false}
          onChange={(e) => updateField({ required: e.target.checked })}
        />
        <label className="font-medium">Required</label>
      </div>

      {/* Text / Textarea: minLength & maxLength */}
      {(field.type === "text" || field.type === "textarea") && (
        <div className="mb-2">
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">Min Length</label>
              <input
                type="number"
                value={field.minLength ?? ""}
                onChange={(e) =>
                  updateField({
                    minLength:
                      e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className="border px-2 py-1 w-full rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Max Length</label>
              <input
                type="number"
                value={field.maxLength ?? ""}
                onChange={(e) =>
                  updateField({
                    maxLength:
                      e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className="border px-2 py-1 w-full rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Number: min & max */}
      {field.type === "number" && (
        <div className="mb-2">
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">Min</label>
              <input
                type="number"
                value={field.min ?? ""}
                onChange={(e) =>
                  updateField({
                    min: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className="border px-2 py-1 w-full rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Max</label>
              <input
                type="number"
                value={field.max ?? ""}
                onChange={(e) =>
                  updateField({
                    max: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className="border px-2 py-1 w-full rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Select: options (comma separated) */}
      {field.type === "select" && (
        <SelectOptionsEditor field={field} updateField={updateField} />
      )}

      {/* Checkbox: default value */}
      {field.type === "checkbox" && (
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={field.defaultValue ?? false}
            onChange={(e) => updateField({ defaultValue: e.target.checked })}
          />
          <label className="text-sm">Default Checked</label>
        </div>
      )}

      {/* Delete Field */}
      <button
        onClick={() => deleteField(sectionId, rowId, field.id)}
        className="bg-red-500 text-white w-full py-1 rounded mt-2"
      >
        Delete Field
      </button>
    </div>
  );
};

// -------------------------------------
// FIXED: Select Options Editor Component
// -------------------------------------
const SelectOptionsEditor = ({ field, updateField }: any) => {
  const [text, setText] = useState((field.options ?? []).join(", "));

  // Sync when switching fields
  useEffect(() => {
    setText((field.options ?? []).join(", "));
  }, [field.id]);

  const handleChange = (value: string) => {
    setText(value);

    const list = value
      .split(",")
      .map((opt) => opt.trim())
      .filter(Boolean);

    updateField({ options: list });
  };

  return (
    <div className="mb-2">
      <label className="block text-sm mb-1">Options (comma separated)</label>

      <input
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="border px-2 py-1 w-full rounded mb-2"
        placeholder="Option 1, Option 2, Option 3"
      />
    </div>
  );
};
