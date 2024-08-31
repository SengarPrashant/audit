import React, { useMemo, useState } from 'react';
import { Grid, Row, Col, Container, Sidebar, Content } from 'rsuite';
import AppList from '../../components/app-list/appList';
import { constants, dimentions } from '../../components/main-layout/layoutConfig';
import StepForm from '../../components/app-form/stepForm';

const ListStepForm = ({ pageData }) => {
    const { sections } = JSON.parse(JSON.stringify(pageData));
    const listConfig = sections.filter(x => x.type == 'list');
    const formConfig = sections.filter(x => x.type == 'step-form');
    const [events, setEvents] = useState([]);

    const raiseEvent = (_event, _data) => {
        const { name } = _event;
        switch (name) {
            case constants.events.edit:
                const editEv = events.filter(x => x.name != constants.events.edit);
                setEvents([...editEv, { ..._event, metaData: _data }])
                break;
            case constants.events.create:
                const createEv = events.filter(x => x.name != constants.events.create && x.name != constants.events.edit);
                setEvents([...createEv, { ..._event, metaData: undefined }])
                break;
            default:
                break;
        }
    }

    const onListSelect = (selectedNode) => {
        raiseEvent({ name: constants.events.edit }, selectedNode)
    }
    const onCreate = () => {
        raiseEvent({ name: constants.events.create })
    }

    const defaultData = useMemo(() => {
        const e = events.filter(x => x.name == constants.events.edit);
        return e.length ? e[0].metaData : undefined;
    }, [events])

    return (
        <>
            <Grid fluid>
                <Row>
                    <Col xs={24}>
                        <Container style={{ flexDirection: 'row' }}>
                            <Sidebar collapsible className='col-flex'
                                style={{ border: '1px solid #EBEBEB', height: `calc(100vh - ${(dimentions.header.h + dimentions.crumb.h)}px)` }}
                                width={dimentions.menu.expanded}
                            >
                                <AppList config={listConfig[0]} onSelect={onListSelect} onCreate={onCreate} />
                            </Sidebar>
                            <Content>
                                <StepForm config={formConfig[0]} defaultData={defaultData} />
                            </Content>
                        </Container>
                    </Col>
                </Row>
            </Grid>
        </>
    );
};

export default ListStepForm;