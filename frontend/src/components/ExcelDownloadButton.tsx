import React from 'react';

const ExcelDownloadButton: React.FC = () => {
  const handleDownload = () => {
    // TODO: Implement actual Excel template generation
    alert('Excel template download not yet implemented');
  };

  return (
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
      onClick={handleDownload}
    >
      Download Personalised Excel Workbook
    </button>
  );
};

export default ExcelDownloadButton;
