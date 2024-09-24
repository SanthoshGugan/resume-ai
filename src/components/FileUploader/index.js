import React, { useState } from "react";

const FileUploader = ({ onAddFiles, onRemoveFiles, onCancel, multiple, description = "Drag & Drop or Add your files" }) => {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(new Set());
    const [allSelected, setAllSelected] = useState(false); // Track if all files are selected

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        addFiles(selectedFiles);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);

        // If multiple is false, limit to one file
        if (!multiple && droppedFiles.length > 1) {
            alert("Only one file can be uploaded at a time.");
            return;
        }

        addFiles(droppedFiles);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const addFiles = (newFiles) => {
        if (!multiple && files.length > 0) {
            alert("Only one file can be uploaded at a time.");
            return;
        }
        onAddFiles(newFiles);
        setFiles((prevFiles) => multiple ? [...prevFiles, ...newFiles] : newFiles);
    };

    const removeFiles = () => {
        const remainingFiles = files.filter((file) => !selectedFiles.has(file.name));
        onRemoveFiles(selectedFiles);
        setFiles(remainingFiles);
        setSelectedFiles(new Set()); // Clear selection after removal
        setAllSelected(false); // Deselect the header checkbox

        if (remainingFiles.length === 0) {
            setAllSelected(false); // Deselect the header checkbox if no files remain
        }
    };

    const toggleSelectFile = (fileName) => {
        const updatedSelection = new Set(selectedFiles);
        if (updatedSelection.has(fileName)) {
            updatedSelection.delete(fileName);
        } else {
            updatedSelection.add(fileName);
        }
        setSelectedFiles(updatedSelection);

        if (updatedSelection.size === files.length) {
            setAllSelected(true); // Select the header checkbox if all files are selected
        } else {
            setAllSelected(false); // Deselect the header checkbox if not all files are selected
        }
    };

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedFiles(new Set()); // Deselect all
            setAllSelected(false);
        } else {
            const allFileNames = new Set(files.map(file => file.name));
            setSelectedFiles(allFileNames); // Select all
            setAllSelected(true);
        }
    };

    return (
        <div 
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
            style={{
                border: "2px dashed #ccc",
                borderRadius: "5px",
                padding: "20px",
                textAlign: "center",
                marginBottom: "20px"
            }}
        >
            <h3>{description}</h3>
            <input 
                type="file" 
                multiple={multiple}  // Use the multiple prop
                onChange={handleFileChange} 
                style={{ display: "none" }} 
                id="fileInput"
            />
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
                <button 
                    onClick={removeFiles} 
                    disabled={selectedFiles.size === 0}
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: selectedFiles.size === 0 ? "not-allowed" : "pointer",
                        padding: "10px 15px",
                        opacity: selectedFiles.size === 0 ? 0.5 : 1
                    }}
                >
                    Remove Selected
                </button>
                <label 
                    htmlFor="fileInput" 
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "20px"
                    }}
                >
                    Add Files
                </label>
            </div>
            {(
                <div style={{ marginTop: "20px" }}>
                    <h4>Uploaded Files: ({files.length})</h4>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>
                                    <input 
                                        type="checkbox" 
                                        checked={allSelected} 
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th style={{ textAlign: "left" }}>File Name</th>
                                <th style={{ textAlign: "left" }}>File Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file.name} onClick={() => toggleSelectFile(file.name)} style={{ cursor: "pointer", background: selectedFiles.has(file.name) ? "#f0f8ff" : "transparent" }}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedFiles.has(file.name)} 
                                            onChange={() => toggleSelectFile(file.name)}
                                        />
                                    </td>
                                    <td>
                                        <strong>{file.name}</strong>
                                    </td>
                                    <td>{file.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
