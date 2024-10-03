export const downloadCsv = (headers, rows, onDownload) => {
    const csvContent = [
        headers.join(','), // Add header row
        ...rows.map(row => headers.map(fieldName => `"${row[fieldName] || ''}"`).join(',')) // Add data rows
      ].join('\n');
    
      // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sorted_resumes.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if(onDownload){
      onDownload();
    }
    
}