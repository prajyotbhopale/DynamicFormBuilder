import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormBuilderContext } from '../../context/FormBuilderContext';
import { FormMetadataSchema } from '../../validation/validateMetadata';

type NavbarProps = {
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navbar = ({ showPreview, setShowPreview }: NavbarProps) => {
  const ctx = useContext(FormBuilderContext);
  const navigate = useNavigate();

  if (!ctx) return null;

  const { metadata, setMetadata, submittedData } = ctx;

  // ⭐ Validate builder before preview/view/edit
  const validateBeforePreview = () => {
    try {
      FormMetadataSchema.parse(metadata);
      ctx.setBuilderError(null);
      return true;
    } catch (err: any) {
      let message = 'Form is invalid.';

      if (err.issues && err.issues.length > 0) {
        message = err.issues[0].message;
      }

      ctx.setBuilderError(message);
      return false;
    }
  };

  const switchMode = (mode: 'CREATE' | 'VIEW' | 'EDIT') => {
    if (mode !== 'CREATE') {
      if (!validateBeforePreview()) return;
    }

    setMetadata({ ...metadata, viewType: mode });
    setShowPreview(true);

    if (mode === 'CREATE') navigate('/preview');
    if (mode === 'VIEW') navigate('/view');
    if (mode === 'EDIT') navigate('/edit');
  };

  // ⭐ Save Form Layout (Builder)
  const saveFormLayout = () => {
    const allForms = JSON.parse(localStorage.getItem('savedForms') || '[]');

    const newForm = {
      id: crypto.randomUUID(),
      title: metadata.title || 'Untitled Form',
      metadata,
      createdAt: new Date().toISOString(),
    };

    allForms.push(newForm);
    localStorage.setItem('savedForms', JSON.stringify(allForms));

    // ⭐ Reset builder to empty state
    ctx.setMetadata({
      title: '',
      viewType: 'CREATE',
      sections: [],
    });

    // ⭐ Turn off preview mode
    setShowPreview(false);

    // ⭐ Go to saved forms page
    navigate('/saved-forms');

    alert('Form saved successfully!');
  };

  return (
    <nav className="backdrop-blur-lg bg-white/60 border-b border-gray-200 shadow sticky top-0 z-50 w-full">
      <div className="w-full px-8 py-3 flex items-center justify-between">
        <h1
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 
                     bg-clip-text text-transparent tracking-tight"
        >
          Dynamic Form Builder
        </h1>

        {/* Mode Buttons */}
        <div className="flex items-center gap-3">
          {/* CREATE */}
          <button
            className={`px-4 py-1 rounded-lg transition-all font-medium
              ${
                metadata.viewType === 'CREATE'
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
              }`}
            onClick={() => switchMode('CREATE')}
          >
            Create
          </button>

          {/* VIEW */}
          <button
            disabled={!submittedData}
            className={`px-4 py-1 rounded-lg transition-all font-medium
              ${
                submittedData
                  ? metadata.viewType === 'VIEW'
                    ? 'bg-green-600 text-white shadow-md scale-105'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            onClick={() => switchMode('VIEW')}
          >
            View
          </button>

          {/* EDIT */}
          <button
            disabled={!submittedData}
            className={`px-4 py-1 rounded-lg transition-all font-medium
              ${
                submittedData
                  ? metadata.viewType === 'EDIT'
                    ? 'bg-purple-600 text-white shadow-md scale-105'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            onClick={() => switchMode('EDIT')}
          >
            Edit
          </button>

          {/* ⭐ SAVE FORM BUTTON */}
          <button
            className="px-4 py-1 rounded-lg bg-green-600 text-white shadow-md"
            onClick={saveFormLayout}
          >
            Save Form
          </button>

          {/* ⭐ GO TO SAVED FORMS PAGE */}
          <button
            className="px-4 py-1 rounded-lg bg-yellow-500 text-white shadow-md"
            onClick={() => navigate('/saved-forms')}
          >
            Saved Forms
          </button>

          {/* <button
  className="px-4 py-1 rounded-lg bg-orange-500 text-white shadow-md"
  onClick={() => navigate("/saved-responses")}
>
  Saved Responses
</button> */}
        </div>

        {/* Preview / Back Button */}
        <button
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white font-medium shadow-md"
          onClick={() => {
            if (showPreview) {
              setShowPreview(false);
              navigate('/');
            } else {
              if (!validateBeforePreview()) return;
              setShowPreview(true);
              navigate('/preview');
            }
          }}
        >
          {showPreview ? 'Back to Builder' : 'Preview Form'}
        </button>
      </div>
    </nav>
  );
};
