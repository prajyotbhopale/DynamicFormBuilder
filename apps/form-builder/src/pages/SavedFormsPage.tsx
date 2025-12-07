// SavedFormsPage.tsx

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormBuilderContext } from '../context/FormBuilderContext';

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
    const raw = localStorage.getItem('savedForms');
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
    setMetadata({
      ...form.metadata,
      id: form.id,
      viewType: 'VIEW',
    });

    setSubmittedData(form.submittedData || null);
    localStorage.setItem('currentFormId', form.id);
    navigate('/view');
  };

  const deleteForm = (id: string) => {
    const updated = forms.filter((f) => f.id !== id);
    setForms(updated);
    localStorage.setItem('savedForms', JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
        Saved Forms
      </h2>

      {forms.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No saved forms yet.</p>
      )}

      <div className="space-y-6 mt-6">
        {forms.map((form) => (
          <div key={form.id} className="flex justify-center">
            
            <div
              className="
                relative
                w-[800px]
                min-h-[180px]
                p-10
                rounded-2xl
                shadow-lg
                bg-gradient-to-br from-gray-50 to-gray-100
                border border-gray-300
                hover:shadow-2xl
                hover:from-blue-50 hover:to-blue-100
                transition-all duration-300
              "
            >
              {/* Left Accent Bar */}
              <div className="absolute left-0 top-0 h-full w-3 bg-blue-600 rounded-l-2xl"></div>

              {/* Header Row */}
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-2xl font-bold text-gray-900 tracking-wide">
                  {form.title}
                </h3>

                <div className="flex gap-4">
                  <button
                    className="
                      px-6 py-2
                      bg-blue-600
                      text-white
                      rounded-xl
                      text-base
                      hover:bg-blue-700
                      transition
                      font-semibold
                    "
                    onClick={() => openForm(form)}
                  >
                    Open
                  </button>

                  <button
                    className="
                      px-6 py-2
                      bg-red-500
                      text-white
                      rounded-xl
                      text-base
                      hover:bg-red-600
                      transition
                      font-semibold
                    "
                    onClick={() => deleteForm(form.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Date */}
              <p className="text-lg text-gray-700 mt-2">
                <span className="font-semibold text-gray-900">Saved at:</span>{' '}
                {new Date(form.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
