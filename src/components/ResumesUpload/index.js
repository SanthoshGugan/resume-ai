import React, { useState } from "react";

const ResumesUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [selectedFiles, setSelectedFiles] = useState(new Set());

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        addFiles(selectedFiles);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const addFiles = (newFiles) => {
        newFiles.forEach((file) => {
            setUploadProgress((prev) => ({
                ...prev,
                [file.name]: 0 // Initialize progress for each file
            }));
            // Simulate file upload (you can replace this with actual upload logic)
            const uploadInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    const progress = prev[file.name] + 10; // Simulating 10% increment
                    if (progress >= 100) {
                        clearInterval(uploadInterval);
                        return { ...prev, [file.name]: 100 }; // Mark as complete
                    }
                    return { ...prev, [file.name]: progress };
                });
            }, 500); // Simulate upload every 500ms
        });
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFiles = () => {
        setFiles(files.filter((file) => !selectedFiles.has(file.name)));
        setUploadProgress((prev) => {
            const newProgress = { ...prev };
            selectedFiles.forEach((fileName) => {
                delete newProgress[fileName]; // Remove progress tracking for the deleted files
            });
            return newProgress;
        });
        setSelectedFiles(new Set()); // Clear selection after removal
    };

    const toggleSelectFile = (fileName) => {
        const updatedSelection = new Set(selectedFiles);
        if (updatedSelection.has(fileName)) {
            updatedSelection.delete(fileName);
        } else {
            updatedSelection.add(fileName);
        }
        setSelectedFiles(updatedSelection);
    };

    const toggleSelectAll = () => {
        if (selectedFiles.size === files.length) {
            setSelectedFiles(new Set()); // Deselect all
        } else {
            const allFileNames = new Set(files.map(file => file.name));
            setSelectedFiles(allFileNames); // Select all
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
            <h3>Drag & Drop your resumes here or add files</h3>
            <input 
                type="file" 
                multiple 
                onChange={handleFileChange} 
                style={{ display: "none" }} 
                id="fileInput"
            />
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
                <button 
                    onClick={removeFiles} 
                    disabled={files.length === 0}
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: files.length === 0 ? "not-allowed" : "pointer",
                        padding: "10px 15px",
                        opacity: files.length === 0 ? 0.5 : 1
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
                        marginLeft: "20px" // Added space between buttons
                    }}
                >
                    Add Files
                </label>
            </div>
            {files.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h4>Uploaded Files:</h4>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedFiles.size === files.length}
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

export default ResumesUpload;
