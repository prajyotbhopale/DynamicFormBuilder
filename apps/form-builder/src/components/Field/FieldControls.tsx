import { useCallback, useEffect, useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextFieldUI from "@mui/material/TextField";

export const FieldControls = ({ field, updateField, deleteField }: any) => {
  const fieldTypeOptions = useMemo(
    () => ["text", "number", "date", "textarea", "select", "checkbox", "email"],
    []
  );

  return (
    <div>
      <FieldLabel field={field} updateField={updateField} />

      <FieldType field={field} updateField={updateField} options={fieldTypeOptions} />

      <FieldSize field={field} updateField={updateField} />

      <FieldRequired field={field} updateField={updateField} />

      {/* Text + Textarea Settings */}
      {["text", "textarea"].includes(field.type) && (
        <TextMinMax field={field} updateField={updateField} />
      )}

      {/* Number Settings */}
      {field.type === "number" && (
        <NumberMinMax field={field} updateField={updateField} />
      )}

      {/* Select Options */}
      {field.type === "select" && (
        <SelectOptions field={field} updateField={updateField} />
      )}

      {/* Checkbox Default */}
      {field.type === "checkbox" && (
        <CheckboxDefault field={field} updateField={updateField} />
      )}

      <button
        className="bg-red-500 text-white w-full py-1 rounded mt-2"
        onClick={deleteField}
      >
        Delete Field
      </button>
    </div>
  );
};

//
// ─────────── INDIVIDUAL UI COMPONENTS ───────────
//

const FieldLabel = ({ field, updateField }: any) => (
  <input
    type="text"
    value={field.label}
    onChange={(e) => updateField({ label: e.target.value })}
    className="border px-2 py-1 w-full rounded mb-2"
    placeholder="Field Label"
  />
);

const FieldType = ({ field, updateField, options }: any) => (
  <Autocomplete
    disablePortal
    options={options}
    value={field.type}
    onChange={(e, val) => updateField({ type: val ?? "" })}
    renderInput={(params) => (
      <TextFieldUI {...params} label="Field Type" size="small" />
    )}
    sx={{ mb: 2 }}
  />
);

const FieldSize = ({ field, updateField }: any) => (
  <select
    value={field.size}
    onChange={(e) => updateField({ size: e.target.value })}
    className="border px-2 py-1 w-full rounded mb-2"
  >
    <option value="SMALL">Small (33%)</option>
    <option value="MEDIUM">Medium (50%)</option>
    <option value="LARGE">Large (66%)</option>
    <option value="XL">XL (100%)</option>
  </select>
);

const FieldRequired = ({ field, updateField }: any) => (
  <div className="flex items-center gap-2 mb-2">
    <input
      type="checkbox"
      checked={field.required ?? false}
      onChange={(e) => updateField({ required: e.target.checked })}
    />
    <label>Required</label>
  </div>
);

const TextMinMax = ({ field, updateField }: any) => (
  <div className="flex gap-2 mb-2">
    <div className="flex-1">
      <label>Min Length</label>
      <input
        type="number"
        value={field.minLength ?? ""}
        onChange={(e) =>
          updateField({ minLength: e.target.value ? Number(e.target.value) : undefined })
        }
        className="border px-2 py-1 rounded w-full"
      />
    </div>
    <div className="flex-1">
      <label>Max Length</label>
      <input
        type="number"
        value={field.maxLength ?? ""}
        onChange={(e) =>
          updateField({ maxLength: e.target.value ? Number(e.target.value) : undefined })
        }
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  </div>
);

const NumberMinMax = ({ field, updateField }: any) => (
  <div className="flex gap-2 mb-2">
    <div className="flex-1">
      <label>Min</label>
      <input
        type="number"
        value={field.min ?? ""}
        onChange={(e) =>
          updateField({ min: e.target.value ? Number(e.target.value) : undefined })
        }
        className="border px-2 py-1 rounded w-full"
      />
    </div>
    <div className="flex-1">
      <label>Max</label>
      <input
        type="number"
        value={field.max ?? ""}
        onChange={(e) =>
          updateField({ max: e.target.value ? Number(e.target.value) : undefined })
        }
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  </div>
);

const SelectOptions = ({ field, updateField }: any) => {
  const [text, setText] = useState((field.options ?? []).join(", "));

  useEffect(() => {
    setText((field.options ?? []).join(", "));
  }, [field.id]);

  const handleChange = useCallback(
    (val: string) => {
      setText(val);
      updateField({
        options: val
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean),
      });
    },
    [updateField]
  );

  return (
    <div className="mb-2">
      <label>Options (comma separated)</label>
      <input
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  );
};

const CheckboxDefault = ({ field, updateField }: any) => (
  <div className="flex items-center gap-2 mb-2">
    <input
      type="checkbox"
      checked={field.defaultValue ?? false}
      onChange={(e) => updateField({ defaultValue: e.target.checked })}
    />
    <label>Default Checked</label>
  </div>
);
