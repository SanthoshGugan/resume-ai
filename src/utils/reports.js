export const downloadCsv = (headers, rows, onDownload) => {
    const csvContent = [
        headers.join(','), // Add header row
        ...rows.map(row => headers.map(fieldName => `"${row[fieldName] || ''}"`).join(',')) // Add data rows
      ].join('\n');
    
      // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    downloadLink(url, 'sorted_resumes.csv');
    if(onDownload){
      onDownload();
    }
}

export const downloadLink = (url, fileName) => {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

}