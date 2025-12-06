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

  const location = useLocation();
  const isPreviewRoute =
    location.pathname === '/preview' ||
    location.pathname === '/view' ||
    location.pathname === '/edit';

  if (isPreviewRoute) return null;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const handleTitleBlur = () => setIsEditingTitle(false);

  const previewMode =
    metadata.viewType === 'CREATE'
      ? 'create'
      : metadata.viewType === 'VIEW'
      ? 'view'
      : 'edit';

  if (showPreview) {
    return (
      <div className="p-6">
        <PreviewForm mode={previewMode as any} />
      </div>
    );
  }

  const isEmpty = metadata.sections.length === 0;

  return (
    <div className="p-5 min-h-[68vh] flex flex-col">
      {/* Error message */}
      {ctx.builderError && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 mb-4 rounded">
          {ctx.builderError}
        </div>
      )}

      {/* ================= EMPTY STATE UI ================= */}
      {metadata.viewType === 'CREATE' && isEmpty ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="border-2 border-dashed rounded-xl p-14 text-center w-full max-w-4xl mx-auto bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your form is Empty
            </h2>

            <p className="text-md text-gray-600 mb-6">
              Click <span className="font-semibold">"+ Add Section"</span> to
              begin building your form.
            </p>

            <button
              onClick={addSection}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-md font-medium shadow hover:bg-blue-700 transition-all"
            >
              + Add Your First Section
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Title */}
          {metadata.viewType === 'CREATE' && (
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
          )}

          {/* Add Section Button (when form is not empty) */}
          {metadata.viewType === 'CREATE' && !isEmpty && (
            <div className="w-fit">
              <button
                onClick={addSection}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg mb-5 shadow hover:bg-blue-700 transition"
              >
                + Add Section
              </button>
            </div>
          )}

          {/* Section List */}
          {metadata.sections.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}

          {/* View / Edit */}
          {metadata.viewType === 'VIEW' && <PreviewForm mode="view" />}
          {metadata.viewType === 'EDIT' && <PreviewForm mode="edit" />}
        </>
      )}
    </div>
  );
};
