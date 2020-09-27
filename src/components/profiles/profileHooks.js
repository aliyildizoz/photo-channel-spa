import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";






export function Flow({ renderState, userId }) {
    const [flowState, setFlowState] = useState();
    useEffect(() => setFlowState(renderState), [renderState])

    return <div>
        <Row>
            <Col md="12">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={flowState}
                    onSelect={(k) => setFlowState(k)}
                    
                >
                    <Tab eventKey="photos" title="Fotoğraflar" >
                        <Col >

                        </Col>
                    </Tab>
                    <Tab eventKey="likes" title="Beğeniler">
                        <Col>

                        </Col>
                    </Tab>
                    <Tab eventKey="comments" title="Yorumlar">
                        <Col>

                        </Col>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    </div>
}