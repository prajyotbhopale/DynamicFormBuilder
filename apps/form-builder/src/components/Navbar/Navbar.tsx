import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormBuilderContext } from '../../context/FormBuilderContext';
import { FormMetadataSchema } from '../../validation/validateMetadata';

import { NavbarModes } from './NavbarModes';
import { NavbarPreviewDots } from './NavbarPreviewDots';
import { NavbarMobileMenu } from './NavbarMobileMenu';

export const Navbar = ({ showPreview, setShowPreview }: any) => {
  const ctx = useContext(FormBuilderContext);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dotsMenu, setDotsMenu] = useState(false);

  const dotsRef = useRef<any>(null);

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

  const switchMode = (mode: 'CREATE' | 'VIEW' | 'EDIT') => {
    if (mode === 'CREATE') {
      ctx.setBuilderError(null);
      setMetadata({ ...metadata, viewType: 'CREATE' });
      setShowPreview(false);
      navigate('/');
      return;
    }

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
          submittedData: submittedData || null,
        };

        localStorage.setItem('savedForms', JSON.stringify(allForms));
        alert('Form updated successfully!Check three dots');

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

    const newForm = {
      id: crypto.randomUUID(),
      title: metadata.title || 'Untitled Form',
      metadata: {
        ...metadata,
        viewType: 'CREATE',
      },
      submittedData: submittedData || null,
      createdAt: new Date().toISOString(),
    };

    allForms.push(newForm);
    localStorage.setItem('savedForms', JSON.stringify(allForms));
    alert('Form saved successfully!Check Theree dots');

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
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dynamic Form Builder
        </h1>

        <NavbarModes
          metadata={metadata}
          switchMode={switchMode}
          saveFormLayout={saveFormLayout}
        />

        <NavbarPreviewDots
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          validateBeforePreview={validateBeforePreview}
          navigate={navigate}
          dotsRef={dotsRef}
          dotsMenu={dotsMenu}
          setDotsMenu={setDotsMenu}
        />

        <button
          className="md:hidden px-4 py-2 rounded-lg bg-gray-200 text-xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>
      </div>

      <NavbarMobileMenu
        mobileMenu={mobileMenu}
        switchMode={switchMode}
        saveFormLayout={saveFormLayout}
        validateBeforePreview={validateBeforePreview}
        setShowPreview={setShowPreview}
        navigate={navigate}
        setMobileMenu={setMobileMenu}
      />
    </nav>
  );
};
