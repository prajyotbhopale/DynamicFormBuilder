import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormBuilderContext } from "../context/FormBuilderContext";

export const SavedFormsPage = () => {
  const [savedForms, setSavedForms] = useState<any[]>([]);
  const navigate = useNavigate();
  const ctx = useContext(FormBuilderContext);

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem("savedForms") || "[]");
    setSavedForms(forms);
  }, []);

  const openForm = (form: any) => {
    ctx?.setMetadata(form.metadata);
    navigate("/");
  };

  // ⭐ DELETE FORM
  const deleteForm = (id: string) => {
    const updated = savedForms.filter((form) => form.id !== id);

    setSavedForms(updated);
    localStorage.setItem("savedForms", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saved Forms</h1>

      {savedForms.length === 0 && (
        <p className="text-gray-600">No saved forms found.</p>
      )}

      <div className="space-y-4">
        {savedForms.map((form) => (
          <div
            key={form.id}
            className="p-4 bg-white border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{form.title}</h2>
              <p className="text-sm text-gray-500">
                Saved on {new Date(form.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => openForm(form)}
              >
                Open
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => deleteForm(form.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
