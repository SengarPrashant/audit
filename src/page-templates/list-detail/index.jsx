import React from 'react';
import { Col, Content, Row,Container, Sidebar } from 'rsuite';
import AppTree from '../../components/app-tree';
import { dimentions } from '../../components/main-layout/layoutConfig';

const ListDetail = () => {
    const [expand, setExpand] = React.useState(true);
    return (
        <Container style={{ flexDirection: 'row' }}>
            <Sidebar collapsible className='col-flex'
                style={{ border: '1px solid #EBEBEB', height: `calc(100vh - ${(dimentions.header.h + dimentions.crumb.h)}px)` }}
                width={expand ? dimentions.menu.expanded : dimentions.menu.collapsed}>
                <AppTree />
                {/* <NavToggle expand={expand} onChange={() => {
                 setExpand(!expand);
                 setTimeout(() => onToggle(!expand), 100);
             }} /> */}
            </Sidebar>
            <Content>
                content 
            </Content>
        </Container>
    );
};

export default ListDetail;