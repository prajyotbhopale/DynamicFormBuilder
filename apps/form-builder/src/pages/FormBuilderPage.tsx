import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormBuilderContext } from '../context/FormBuilderContext';
import { SectionComponent } from '../components/Section/Section';
import { PreviewForm } from '../components/Preview/PreviewForm';

type Props = { showPreview: boolean };

export const FormBuilderPage = ({ showPreview }: Props) => {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) return null;

  const { metadata, addSection, setMetadata } = ctx;

  // ⭐ Detect current URL to avoid duplicate UI
  const location = useLocation();
  const isPreviewRoute =
    location.pathname === "/preview" ||
    location.pathname === "/view" ||
    location.pathname === "/edit";

  // ⭐ If on a preview-related route, return nothing
  if (isPreviewRoute) return null;

  // ⭐ Local state for editable title
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleBlur = () => setIsEditingTitle(false);

  // ⭐ Convert viewType to lower-case preview mode
  const previewMode =
    metadata.viewType === 'CREATE'
      ? 'create'
      : metadata.viewType === 'VIEW'
      ? 'view'
      : 'edit';

  // ⭐ If Preview button is ON → show preview form
  if (showPreview) {
    return (
      <div className="p-6">
        <PreviewForm mode={previewMode as any} />
      </div>
    );
  }

  // ⭐ Otherwise show the form builder UI
  return (
    <div className="p-6">
          {/* 🔥 Builder Validation Error Message */}
    {ctx.builderError && (
      <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 mb-4 rounded">
        {ctx.builderError}
      </div>
    )}


      {/* CREATE Mode → Builder */}
      {metadata.viewType === 'CREATE' && (
        <>
          {/* Editable Title */}
          <div className="mb-4">
            {isEditingTitle ? (
              <input
                autoFocus
                type="text"
                className="border-none outline-none px-2 py-1 rounded text-2xl font-bold"
                style={{
                  width: `${Math.max(metadata.title.length * 14, 200)}px`,
                }}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                onBlur={handleTitleBlur}
              />
            ) : (
              <h1
                className="text-2xl font-bold cursor-text"
                onClick={() => setIsEditingTitle(true)}
              >
                {metadata.title || 'Untitled Form'}
              </h1>
            )}
          </div>

          {/* Add Section Button */}
          <button
            onClick={addSection}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-5"
          >
            + Add Section
          </button>

          {/* Section List */}
          {metadata.sections.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}
        </>
      )}

      {/* VIEW Mode */}
      {metadata.viewType === 'VIEW' && <PreviewForm mode="view" />}

      {/* EDIT Mode */}
      {metadata.viewType === 'EDIT' && <PreviewForm mode="edit" />}
    </div>
  );
};
