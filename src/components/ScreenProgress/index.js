import React ,{ useState, useEffect } from "react";
import "./tint_progress.css";
const ScreenProgress = ({sourceStatus, targetStatus, progressMessages = []}) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    // Rotate messages during the RESUME_WORKFLOW_PROGRESS status
    useEffect(() => {
        let interval;
        if (sourceStatus === targetStatus) {
            interval = setInterval(() => {
                setCurrentMessageIndex(prevIndex => (prevIndex + 1) % progressMessages.length);
            }, 2000); // Change message every 2 seconds
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval); // Cleanup on unmount
    }, [sourceStatus]);
    return (
        <>
            <div className="status-overlay">
                <div className="status-text">
                    {progressMessages[currentMessageIndex]} {/* Rotate progress messages */}
                </div>
            </div>
        </>
    )
}
export default ScreenProgress;