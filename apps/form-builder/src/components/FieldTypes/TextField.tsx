

export const TextField = ({ field, register, error, disabled }: any) => {
 

  // ⭐ FIX: force boolean so undefined never slips through
  const isView = Boolean(disabled);

  return (
    <div>
      <label className="block mb-1 font-medium">{field.label}</label>

      <input
        type="text"
        {...register(field.id)}

        // ⭐ Now always correctly disabled in view mode
        disabled={isView}
        readOnly={isView}

        placeholder={field.placeholder || ""}

        className={`border px-2 py-1 rounded w-full 
          ${error ? "border-red-500" : ""}
          ${isView ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {String(error.message)}
        </p>
      )}
    </div>
  );
};
