

export const SelectField = ({ field, register, error, disabled }: any) => {
 
 
  const isView = Boolean(disabled);

  return (
    <div>
      <label className="block mb-1 font-medium">{field.label}</label>
      <select
        {...register(field.id)}
       disabled={isView}
        readOnly={isView}
        className={`border px-2 py-1 rounded w-full ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">Select an option</option>

        {(field.options ?? []).map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {String(error.message)}
        </p>
      )}
    </div>
  );
};
