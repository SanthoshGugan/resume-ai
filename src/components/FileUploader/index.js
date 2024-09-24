import React, { useState, useRef } from "react";
import { Table, Button, Pagination } from 'react-bootstrap';

const FileUploader = ({ onAddFiles, onRemoveFiles, onCancel, multiple, description = "Drag & Drop or Add your files" }) => {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(new Set());
    const [allSelected, setAllSelected] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 10;

    const fileInputRef = useRef(null); // Reference for input to reset value

    const isPDFFile = (file) => {
        return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter(isPDFFile);

        if (validFiles.length !== selectedFiles.length) {
            alert("Only PDF files are allowed.");
        }

        addFiles(validFiles);
        fileInputRef.current.value = ''; // Clear the file input value after adding files
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        const validFiles = droppedFiles.filter(isPDFFile);

        if (validFiles.length !== droppedFiles.length) {
            alert("Only PDF files are allowed.");
        }

        if (!multiple && validFiles.length > 1) {
            alert("Only one file can be uploaded at a time.");
            return;
        }

        addFiles(validFiles);
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
        setCurrentPage(1);
    };

    const removeFiles = () => {
        const remainingFiles = files.filter((file) => !selectedFiles.has(file.name));
        onRemoveFiles(selectedFiles);
        setFiles(remainingFiles);
        setSelectedFiles(new Set());
        setAllSelected(false);
        setCurrentPage(1);
        fileInputRef.current.value = ''; // Clear the file input value after removing files
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
            setAllSelected(true);
        } else {
            setAllSelected(false);
        }
    };

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedFiles(new Set());
            setAllSelected(false);
        } else {
            const allFileNames = new Set(files.map((file) => file.name));
            setSelectedFiles(allFileNames);
            setAllSelected(true);
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(files.length / filesPerPage);
    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
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
                ref={fileInputRef}
                type="file"
                accept=".pdf"  // Accept only PDF files
                multiple={multiple}
                onChange={handleFileChange}
                style={{ display: "none" }} 
                id="fileInput"
            />
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
                <Button 
                    variant="danger"
                    onClick={removeFiles} 
                    disabled={selectedFiles.size === 0}
                >
                    Remove Selected
                </Button>
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

            {files.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h4>Uploaded Files: ({files.length})</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <input 
                                        type="checkbox" 
                                        checked={allSelected} 
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th>File Name</th>
                                <th>File Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFiles.map((file) => (
                                <tr key={file.name} onClick={() => toggleSelectFile(file.name)} style={{ cursor: "pointer", background: selectedFiles.has(file.name) ? "#f0f8ff" : "transparent" }}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedFiles.has(file.name)} 
                                            onChange={() => toggleSelectFile(file.name)}
                                        />
                                    </td>
                                    <td>{file.name}</td>
                                    <td>{file.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* React Bootstrap Pagination */}
                    <Pagination className="justify-content-center">
                        <Pagination.Prev 
                            onClick={prevPage} 
                            disabled={currentPage === 1}
                        />
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Next 
                            onClick={nextPage} 
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
