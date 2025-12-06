import { useContext, useState } from 'react';
import { FormBuilderContext } from '../../context/FormBuilderContext';
import { Section } from '../../types/form';
import { RowComponent } from '../Row/Row';

type SectionProps = {
  section: Section;
};

export const SectionComponent = ({ section }: SectionProps) => {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) return null;

  const { deleteSection, addRow, setMetadata, metadata } = ctx;

  const [isCollapsed, setIsCollapsed] = useState(section.collapsed);

  const isCreate = metadata.viewType === 'CREATE';

  // ⭐ Update section label
 const updateLabel = (label: string) => {
  const updatedSections = metadata.sections.map((sec) =>
    sec.id === section.id ? { ...sec, label } : sec
  );

  setMetadata({ ...metadata, sections: updatedSections });

  // ⭐ Clear Zod validation error when label is corrected
  if (ctx.setBuilderError) {
    ctx.setBuilderError(null);
  }
};


  // ⭐ Clean logic: hide "New Section" only in preview/view/edit
  const visibleLabel =
    !isCreate && section.label === 'New Section' ? '' : section.label;

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      {/* ---------- SECTION HEADER ---------- */}
      <div className="flex items-center justify-between mb-3">
        
        {/* Editable Label ONLY in CREATE mode */}
        {isCreate ? (
          <input
            type="text"
            value={section.label}
            onChange={(e) => updateLabel(e.target.value)}
            className="text-lg font-semibold border-b px-2 py-1 w-1/2"
          />
        ) : (
          // ⭐ Show the label in VIEW/EDIT mode
          <h2 className="text-xl font-semibold text-gray-800">
            {visibleLabel}
          </h2>
        )}

        <div className="flex items-center gap-2">
          {/* Collapse / Expand — ONLY in CREATE mode */}
          {isCreate && (
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? 'Expand' : 'Collapse'}
            </button>
          )}

          {/* Delete Section — ONLY in CREATE mode */}
          {isCreate && (
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => deleteSection(section.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* ---------- COLLAPSIBLE BODY ---------- */}
      {!isCollapsed && (
        <>
          {/* Add Row — ONLY in CREATE mode */}
          {isCreate && (
            <button
              className="px-3 py-1 mb-4 bg-blue-600 text-white rounded"
              onClick={() => addRow(section.id)}
            >
              + Add Row
            </button>
          )}

          {/* Render all rows */}
          <div className="space-y-4">
            {section.rows.map((row) => (
              <RowComponent key={row.id} row={row} sectionId={section.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
