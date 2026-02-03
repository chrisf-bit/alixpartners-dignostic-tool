import React from 'react';

import DiagnosticQuestions from '../components/DiagnosticQuestions';
import ExcelDownloadButton from '../components/ExcelDownloadButton';

const Diagnostic: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Excel Skills Diagnostic</h2>
      <DiagnosticQuestions />
      <div className="mt-8">
        <h3 className="font-bold mb-2">Practical Tasks (Excel)</h3>
        <ExcelDownloadButton />
        <form
          className="flex flex-col gap-2"
          onSubmit={e => {
            e.preventDefault();
            // TODO: Implement upload logic
            alert('Excel upload not yet implemented');
          }}
        >
          <input type="file" accept=".xlsx,.xls" className="border p-2 rounded" required />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Upload Completed Workbook</button>
        </form>
      </div>
    </div>
  );
};

export default Diagnostic;
