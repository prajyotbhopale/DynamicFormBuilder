declare global {
  function alert(message?: any): void;
}

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom"; // ⭐ ADD THIS

import { FormBuilderContext } from "../../context/FormBuilderContext";

import { TextField } from "../FieldTypes/TextField";
import { NumberField } from "../FieldTypes/NumberField";
import { DateField } from "../FieldTypes/DateField";
import { TextareaField } from "../FieldTypes/TextareaField";
import { CheckboxField } from "../FieldTypes/CheckboxField";
import { SelectField } from "../FieldTypes/SelectField";

import { generateZodSchemaForForm } from "../../utils/generateZodSchemaForForm";
import { getExactWidth } from "../../utils/getExactWidth";

type PreviewFormProps = {
  mode: "create" | "view" | "edit";
};

export const PreviewForm = ({ mode }: PreviewFormProps) => {
  const ctx = useContext(FormBuilderContext);
  const navigate = useNavigate(); // ⭐ ADD THIS
  if (!ctx) return null;

  const { metadata, submittedData, setSubmittedData, setMetadata } = ctx;

  // Generate validation schema dynamically
  const formSchema = generateZodSchemaForForm(metadata);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" || mode === "view" ? submittedData || {} : {},
  });

  // ⭐ Final clean onSubmit function
 const onSubmit = (data: any) => {
  setSubmittedData(data);

  // ⭐ Save filled response
  const allResponses = JSON.parse(localStorage.getItem("savedFilledForms") || "[]");

  const newResponse = {
    id: crypto.randomUUID(),
    title: metadata.title || "Untitled Form",
    values: data,
    submittedAt: new Date().toISOString(),
  };

  allResponses.push(newResponse);
  localStorage.setItem("savedFilledForms", JSON.stringify(allResponses));

  alert("Form submitted successfully!");

  setMetadata((prev) => ({
    ...prev,
    viewType: "VIEW",
  }));


    // ⭐ CRITICAL: go to /view so mode === "view"
    navigate("/view");
  };

  const disabled = mode === "view";

  const renderField = (field: any) => {
    const props = {
      field,
      register,
      error: errors[field.id],
      disabled, // ⭐ this is true only in view mode
    };

    switch (field.type) {
      case "text":
        return <TextField {...props} />;
      case "number":
        return <NumberField {...props} />;
      case "date":
        return <DateField {...props} />;
      case "textarea":
        return <TextareaField {...props} />;
      case "checkbox":
        return <CheckboxField {...props} />;
      case "select":
        return <SelectField {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">
        {metadata.title ||
          (mode === "edit"
            ? "Edit Form"
            : mode === "view"
            ? "View Submitted Data"
            : "Fill Form")}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Loop through all sections */}
      {metadata.sections.map((section) => (
  <div
    key={section.id}
    className="p-5 mb-6 border-2 border-gray-200 rounded-lg shadow-sm bg-gray-50"
  >
    {/* ⭐ Section Label inside Preview */}
    <h2 className="text-xl font-semibold mb-4 text-gray-800">
      {section.label}
    </h2>

    {/* Rows */}
    {section.rows.map((row) => (
      <div key={row.id} className="flex flex-wrap mb-4 -mx-2">
        {row.fields.map((field) => (
          <div
            key={field.id}
            style={{ width: getExactWidth(field.size) }}
            className="px-2"
          >
            {renderField(field)}
          </div>
        ))}
      </div>
    ))}
  </div>
))}


        {mode !== "view" && (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {mode === "edit" ? "Update Form" : "Submit Form"}
          </button>
        )}
      </form>
    </div>
  );
};
