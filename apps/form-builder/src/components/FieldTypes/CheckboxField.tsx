

export const CheckboxField = ({ field, register, error, disabled }: any) => {
 
  
  const isView = Boolean(disabled);

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        {...register(field.id)}
        disabled={isView}
        readOnly={isView}
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
