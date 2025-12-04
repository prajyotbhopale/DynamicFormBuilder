import { useContext } from "react";
import { FormBuilderContext } from "../../context/FormBuilderContext";

export const TextField = ({ field, register, error, disabled }: any) => {
  const context = useContext(FormBuilderContext);
  const isView = disabled ?? context?.metadata.viewType === "VIEW";

  return (
    <div>
      <label className="block mb-1 font-medium">{field.label}</label>
      <input
        type="text"
        {...register(field.id)}
        disabled={isView}
        placeholder={field.placeholder || ""}
        className={`border px-2 py-1 rounded w-full ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {String(error.message)}
        </p>
      )}
    </div>
  );
};
