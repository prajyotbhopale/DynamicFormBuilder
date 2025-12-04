import { useEffect, useState } from "react";

export const SavedFilledFormsPage = () => {
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedFilledForms") || "[]");
    setResponses(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saved Responses</h1>

      {responses.length === 0 && (
        <p className="text-gray-600">No responses saved yet.</p>
      )}

      <div className="space-y-6">
        {responses.map((res) => (
          <div key={res.id} className="p-4 border rounded bg-white shadow">
            <h2 className="text-xl font-semibold">{res.title}</h2>

            <pre className="mt-3 bg-gray-100 p-3 rounded">
              {JSON.stringify(res.values, null, 2)}
            </pre>

            <p className="text-sm text-gray-500 mt-2">
              Submitted on {new Date(res.submittedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
