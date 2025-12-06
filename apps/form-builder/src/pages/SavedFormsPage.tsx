// SavedFormsPage.tsx

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormBuilderContext } from "../context/FormBuilderContext";

type SavedForm = {
  id: string;
  title: string;
  metadata: any;
  submittedData: any | null;
  createdAt: string;
};

export const SavedFormsPage = () => {
  const [forms, setForms] = useState<SavedForm[]>([]);
  const ctx = useContext(FormBuilderContext);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("savedForms");
    if (!raw) return;
    try {
      setForms(JSON.parse(raw));
    } catch {
      setForms([]);
    }
  }, []);

  if (!ctx) return null;

  const { setMetadata, setSubmittedData } = ctx;

 const openForm = (form: SavedForm) => {

    
  // Load saved metadata but always open in VIEW mode
 setMetadata({
  ...form.metadata,
  id: form.id,          // ⭐ store saved form ID inside metadata
  viewType: "VIEW",
  
});



  setSubmittedData(form.submittedData || null);   // ⭐ LOAD SAVED VALUES HERE
console.log("FORM.SUBMITTEDDATA LOADED:", form.submittedData);

localStorage.setItem("currentFormId", form.id);
  // Go to VIEW page
  navigate("/view");
};

  const deleteForm = (id: string) => {
    const updated = forms.filter(f => f.id !== id);
    setForms(updated);
    localStorage.setItem("savedForms", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Saved Forms</h2>

      {forms.length === 0 && <p>No saved forms yet.</p>}

      <div className="space-y-3">
        {forms.map((form) => (
          <div
            key={form.id}
            className="flex items-center justify-between border rounded px-4 py-2"
          >
            <div>
              <div className="font-semibold">{form.title}</div>
              <div className="text-xs text-gray-500">
                Saved at: {new Date(form.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                onClick={() => openForm(form)}   // ⭐ EDIT preview
              >
                Open
              </button>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white text-sm"
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
