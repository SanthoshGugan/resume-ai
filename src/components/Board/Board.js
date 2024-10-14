import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userIdSelector } from "../../store/selectors/userSelector";
import React, { useEffect } from "react";

const Board = () => {
    const userId = useSelector(state => userIdSelector(state));

    // useEffect(() => {
    //     const scrollStyle = `
    //     ::-webkit-scrollbar {
    //         width: 4px;
    //     }
    //     ::-webkit-scrollbar-thumb {
    //         background-color: rgba(0, 112, 243, 0.7);
    //         border-radius: 10px;
    //     }
    //     ::-webkit-scrollbar-track {
    //         background-color: transparent;
    //     }
    //     ::-webkit-scrollbar-thumb:hover {
    //         background-color: rgba(0, 112, 243, 1);
    //         width: 8px;
    //     }
    //     `;
        
    //     // Insert custom scrollbar styles into the document head
    //     const styleSheet = document.createElement("style");
    //     styleSheet.type = "text/css";
    //     // styleSheet.innerText = scrollStyle;
    //     document.head.appendChild(styleSheet);
    // }, []);

    return (
        <Container
            style={{
                minWidth: '100vw',              // Full width
                height: 'calc(100vh - 175px)', // Full height minus the timeline height (adjust 50px as needed)
                overflowY: 'auto',           // Vertical scroll
                // scrollbarWidth: 'none',      // For Firefox
                msOverflowStyle: 'none',     // For Internet Explorer and Edge
                display: 'flex'
            }}
        >
            <Card style={{ border: 'none', height: '100%', minWidth: '100%', flex: "1 0" }}>
                <Row style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <Col md="auto">
                        <Outlet />
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default Board;