import { useContext } from "react";
import { FormBuilderContext } from "../../context/FormBuilderContext";
import { Row } from "../../types/form";
import { FieldComponent } from "../Field/Field";
import { getExactWidth } from "../../utils/getExactWidth";

type RowProps = {
  row: Row;
  sectionId: string;
};

export const RowComponent = ({ row, sectionId }: RowProps) => {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) return null;

  const { addField, deleteRow, metadata } = ctx;


  const isCreate = metadata.viewType === "CREATE";

  return (
    <div className="border rounded p-3 bg-gray-50">

      {/* FIELDS FLEX WRAP */}
     <div className="flex flex-wrap mb-3 -mx-2">
  {row.fields.map((field) => (
    <div
      key={field.id}
      style={{ width: getExactWidth(field.size) }}
      className="px-2"
    >
      <div className="border p-3 rounded bg-white">
        <FieldComponent
          field={field}
          rowId={row.id}
          sectionId={sectionId}
        />
      </div>
    </div>
  ))}
</div>


      {/* ADD FIELD + DELETE ROW — only in CREATE mode */}
      {isCreate && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => addField(sectionId, row.id)}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            + Add Field
          </button>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => deleteRow(sectionId, row.id)}
          >
            Delete Row
          </button>
        </div>
      )}
    </div>
  );
};
