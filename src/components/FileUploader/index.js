import React, { useState, useRef } from "react";
import { Table, Button, Pagination } from 'react-bootstrap';
import { FaFileUpload, FaTrashAlt, FaPlus } from 'react-icons/fa'; // Import icons
import { MdOutlineCloudUpload } from 'react-icons/md'; // Icon for drag and drop

const FileUploader = ({ onAddFiles, onRemoveFiles, onCancel, multiple, description = "Drag & Drop or Add your files", disabled }) => {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(new Set());
    const [allSelected, setAllSelected] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [isDragging, setIsDragging] = useState(false);
    const filesPerPage = 5;

    const fileInputRef = useRef(null);

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
        fileInputRef.current.value = '';
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
        onRemoveFiles(remainingFiles);
        setFiles(remainingFiles);
        setSelectedFiles(new Set());
        setAllSelected(false);
        setCurrentPage(1);
        fileInputRef.current.value = '';
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

    // Handle drag enter event
    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    // Handle drag leave event
    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            style={{
                border: isDragging ? "2px dashed #007bff" : "2px solid transparent", // Dashed border visible only on drag
                borderRadius: "10px",
                padding: "30px 0",
                textAlign: "center",
                marginBottom: "30px",
                // backgroundColor: "#f9f9f9",
                transition: "border 0.3s",
            }}
        >

            {!disabled && (
                <>
                    <MdOutlineCloudUpload size={50} color="#007bff" style={{ marginBottom: "15px" }} />
                    <h4>{description}</h4>
                    {/* <p>Only PDF files are allowed.</p> */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        multiple={multiple}
                        onChange={handleFileChange}
                        style={{ display: "none", opacity: disabled ? '0.5' : '1' }}
                        id="fileInput"
                        disabled={disabled}
                    />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px", gap: "15px" }}>
                        {files.length > 0 && (<Button
                            variant="danger"
                            onClick={removeFiles}
                            disabled={selectedFiles.size === 0 || disabled}
                        >
                            <FaTrashAlt style={{ marginRight: "5px" }} />
                            Remove
                        </Button>)}
                        <label
                            htmlFor="fileInput"
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                borderRadius: "5px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FaPlus style={{ marginRight: "5px" }} />
                            <span className="fw-semibold">Browse Files</span>
                        </label>
                    </div>
                </>)}

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
