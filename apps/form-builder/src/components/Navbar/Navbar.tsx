import { useContext, useState, useRef, useEffect } from 'react';
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
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dotsMenu, setDotsMenu] = useState(false);

  const dotsRef = useRef<any>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: any) => {
      if (dotsRef.current && !dotsRef.current.contains(e.target)) {
        setDotsMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!ctx) return null;

  const { metadata, setMetadata, submittedData } = ctx;

  // Validate before preview/view/edit
  const validateBeforePreview = () => {
    try {
      FormMetadataSchema.parse(metadata);
      ctx.setBuilderError(null);
      return true;
    } catch (err: any) {
      const msg = err.issues?.[0]?.message || 'Form is invalid.';
      ctx.setBuilderError(msg);
      return false;
    }
  };

  // FIXED: Create should open builder directly
  const switchMode = (mode: 'CREATE' | 'VIEW' | 'EDIT') => {
    if (mode === 'CREATE') {
      ctx.setBuilderError(null); // ⭐ CLEAR OLD ERRORS
      setMetadata({ ...metadata, viewType: 'CREATE' });
      setShowPreview(false); // ⭐ GO BACK TO BUILDER MODE
      navigate('/'); // ⭐ OPEN BUILDER PAGE
      return;
    }

    // View or Edit → validate first
    if (!validateBeforePreview()) return;

    setMetadata({ ...metadata, viewType: mode });
    setShowPreview(true);

    if (mode === 'VIEW') navigate('/view');
    if (mode === 'EDIT') navigate('/edit');
  };

  const saveFormLayout = () => {
    try {
      FormMetadataSchema.parse(metadata);
      ctx.setBuilderError(null);
    } catch (err: any) {
      ctx.setBuilderError(err.issues?.[0]?.message || 'Form is invalid.');
      return;
    }

    const allForms = JSON.parse(localStorage.getItem('savedForms') || '[]');

    // ⭐ CASE 1 — UPDATE EXISTING FORM
    if (metadata.id) {
      const index = allForms.findIndex((f: any) => f.id === metadata.id);

      if (index !== -1) {
        allForms[index] = {
          ...allForms[index],
          title: metadata.title || 'Untitled Form',
          metadata: {
            ...metadata,
            viewType: 'CREATE',
          },
          submittedData: submittedData || null, // ⭐ update submittedData also
        };

        localStorage.setItem('savedForms', JSON.stringify(allForms));
        alert('Form updated successfully!');

        setMetadata({
          title: '',
          viewType: 'CREATE',
          sections: [],
        });
        ctx.setSubmittedData(null);
        setShowPreview(false);
        navigate('/');
        return;
      }
    }

    // ⭐ CASE 2 — CREATE NEW FORM
    const newForm = {
      id: crypto.randomUUID(),
      title: metadata.title || 'Untitled Form',
      metadata: {
        ...metadata,
        viewType: 'CREATE',
      },
      submittedData: submittedData || null, // ⭐ store filled values
      createdAt: new Date().toISOString(),
    };

    allForms.push(newForm);
    localStorage.setItem('savedForms', JSON.stringify(allForms));
    alert('Form saved successfully!');

    setMetadata({
      title: '',
      viewType: 'CREATE',
      sections: [],
    });

    ctx.setSubmittedData(null);
    setShowPreview(false);
    navigate('/');
  };

  return (
    <nav className="backdrop-blur-lg bg-white/70 border-b shadow-md sticky top-0 z-50">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dynamic Form Builder
        </h1>

        {/* DESKTOP — Center Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Mode Toggle Group */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium
                ${
                  metadata.viewType === 'CREATE'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-200'
                }`}
              onClick={() => switchMode('CREATE')}
            >
              Create
            </button>

            <button
              className={`px-4 py-2 rounded-full text-sm font-medium
    ${
      metadata.viewType === 'VIEW'
        ? 'bg-green-600 text-white shadow'
        : 'hover:bg-gray-200'
    }`}
              onClick={() => switchMode('VIEW')}
            >
              View
            </button>

            <button
              className={`px-4 py-2 rounded-full text-sm font-medium
    ${
      metadata.viewType === 'EDIT'
        ? 'bg-purple-600 text-white shadow'
        : 'hover:bg-gray-200'
    }`}
              onClick={() => switchMode('EDIT')}
            >
              Edit
            </button>
          </div>

          {/* Save Form */}
          <button
            className="px-5 py-2 rounded-full bg-green-600 text-white shadow hover:bg-green-700"
            onClick={saveFormLayout}
          >
            Save Form
          </button>
        </div>

        {/* DESKTOP — Preview + 3 Dots */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
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
            {showPreview ? 'Back to Builder' : 'Preview'}
          </button>

          {/* Three Dots Menu */}
          <div className="relative" ref={dotsRef}>
            <button
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
              onClick={() => setDotsMenu(!dotsMenu)}
            >
              ⋮
            </button>

            {dotsMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setDotsMenu(false);
                    navigate('/saved-forms');
                  }}
                >
                  Saved Forms
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE — Hamburger */}
        <button
          className="md:hidden px-4 py-2 rounded-lg bg-gray-200 text-xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg border-t py-3 px-6 space-y-3">
          <button
            className="w-full text-left"
            onClick={() => switchMode('CREATE')}
          >
            Create
          </button>
          <button
            className="w-full text-left"
            onClick={() => switchMode('VIEW')}
          >
            View
          </button>
          <button
            className="w-full text-left"
            onClick={() => switchMode('EDIT')}
          >
            Edit
          </button>

          <button className="w-full text-left" onClick={saveFormLayout}>
            Save Form
          </button>

          <button
            className="w-full text-left"
            onClick={() => {
              if (!validateBeforePreview()) return;
              setShowPreview(true);
              navigate('/preview');
              setMobileMenu(false);
            }}
          >
            Preview
          </button>

          <button
            className="w-full text-left"
            onClick={() => {
              navigate('/saved-forms');
              setMobileMenu(false);
            }}
          >
            Saved Forms
          </button>
        </div>
      )}
    </nav>
  );
};
