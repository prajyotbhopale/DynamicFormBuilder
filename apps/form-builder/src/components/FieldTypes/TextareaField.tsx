

export const TextareaField = ({ field, register, error, disabled }: any) => {
  

   const isView = Boolean(disabled);


  return (
    <div>
      <label className="block mb-1 font-medium">{field.label}</label>
      <textarea
        {...register(field.id)}
        disabled={isView}
        readOnly={isView}
        className={`border px-2 py-1 rounded w-full h-20 ${
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
