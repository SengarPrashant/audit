import React from 'react'
import { Container, Content, Sidebar, IconButton } from 'rsuite'
import { ArrowLeftLine, ArrowRightLine } from '@rsuite/icons'
import { dimentions } from '../main-layout/layoutConfig';

function ThreeColumn({ }) {
    const [expand, setExpand] = React.useState(true);
    return (
        <>
            <Container style={{ flexDirection: 'row' }}>
                <Sidebar collapsible className='col-flex'
                    style={{ background: '#ebebeb', height: `calc(100vh - ${(dimentions.header.h + dimentions.crumb.h)}px)` }}
                    width={expand ? dimentions.menu.expanded : dimentions.menu.collapsed}>
                   {/* Tree */}
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                </Sidebar>
                <Content className='space-resp-' style={{padding:50}}>
                    <h4>content</h4>
                </Content>
            </Container>
        </>
    )
}

const NavToggle = ({ expand, onChange }) => {
    return (
        <IconButton circle className='toggle-floating'  onClick={onChange} size="xs" icon={expand ? <ArrowLeftLine /> : <ArrowRightLine />}
        />
    );
};

export default ThreeColumn
