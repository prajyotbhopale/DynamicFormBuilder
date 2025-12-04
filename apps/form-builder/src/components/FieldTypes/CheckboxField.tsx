import { useContext } from "react";
import { FormBuilderContext } from "../../context/FormBuilderContext";

export const CheckboxField = ({ field, register, error, disabled }: any) => {
  const context = useContext(FormBuilderContext);
  const isView = disabled ?? context?.metadata.viewType === "VIEW";

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        {...register(field.id)}
        disabled={isView}
        className={`${error ? "border-red-500" : ""}`}
      />

      <label className="font-medium">{field.label}</label>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {String(error.message)}
        </p>
      )}
    </div>
  );
};
