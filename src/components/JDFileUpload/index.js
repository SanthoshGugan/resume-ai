import React, { useState, useRef } from "react";
import { Button, Badge, Row, Col } from 'react-bootstrap';
import { FaFileUpload, FaTrashAlt } from 'react-icons/fa'; // Import icons
import { MdOutlineCloudUpload } from 'react-icons/md'; // Icon for drag and drop

const JDFileUploader = ({ onAddFiles, onRemoveFiles, description = "Upload your JD" }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Utility function to check if the file is a PDF
    const isPDFFile = (file) => {
        return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    };

    // Handle file selection from input
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (isPDFFile(selectedFile)) {
            setFile(selectedFile);
            onAddFiles([selectedFile]);
        } else {
            alert("Only PDF files are allowed.");
        }
        fileInputRef.current.value = ''; // Clear file input after selection
    };

    // Handle file drop in drag-and-drop area
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0];
        if (isPDFFile(droppedFile)) {
            setFile(droppedFile);
            onAddFiles([droppedFile]);
        } else {
            alert("Only PDF files are allowed.");
        }
    };

    // Prevent default behavior for dragOver event
    const handleDragOver = (event) => {
        event.preventDefault();
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

    // Remove the uploaded file
    const removeFile = () => {
        setFile(null);
        onRemoveFiles([]);
    };

    // Styles for the drop area, file display, and delete icon
    const dropAreaStyle = {
        borderRadius: "10px",
        padding: "30px 0",
        textAlign: "center",
        marginBottom: "30px",
        backgroundColor: "#f9f9f9",
        transition: "border 0.3s",
        position: "relative",
        border: isDragging ? "2px dashed #007bff" : "2px solid transparent", // Dashed border visible only on drag
    };

    const fileDisplayStyle = {
        textAlign: "center",
        position: "relative",
    };

    const fileNameStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px", // Space between file name and delete icon
    };

    const deleteBadgeStyle = {
        cursor: "pointer",
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            style={dropAreaStyle}
        >
            {!file && (
                <>
                    <MdOutlineCloudUpload size={50} color="#007bff" style={{ marginBottom: "15px" }} />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="fileInput"
                    />
                    <Row className="d-flex justify-content-center">
                        <Col md={4}>
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
                                    justifyContent: "center"
                                }}
                            >
                                {description}
                            </label>
                        </Col>
                    </Row>
                </>
            )}

            {file && (
                <div style={fileDisplayStyle}>
                    <FaFileUpload size={50} color="#007bff" style={{ marginBottom: "15px" }} />
                    <Row className="d-flex justify-content-center">
                        <Col md={3} style={fileNameStyle}>
                            <h5>{file.name}</h5>
                            <Badge
                                pill
                                bg="danger"
                                style={deleteBadgeStyle}
                                onClick={removeFile}
                            >
                                <FaTrashAlt />
                            </Badge>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default JDFileUploader;