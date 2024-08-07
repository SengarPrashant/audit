import React from 'react'
import { Container, Content, Sidebar, IconButton } from 'rsuite'
import { ArrowLeftLine, ArrowRightLine } from '@rsuite/icons'
import { dimentions } from '../components/main-layout/layoutConfig';

function ListDetail({ children, onToggle = (expanded = false) => { } }) {
    const [expand, setExpand] = React.useState(true);

    return (
        <>
            <Container style={{ flexDirection: 'row' }}>
                <Sidebar collapsible className='col-flex'
                    style={{ background: '#ebebeb', height: `calc(100vh - ${(dimentions.header.h + dimentions.crumb.h)}px)` }}
                    width={expand ? dimentions.menu.expanded : dimentions.menu.collapsed}>
                    {children[0]}
                    <NavToggle expand={expand} onChange={() => {
                        setExpand(!expand);
                        setTimeout(() => onToggle(!expand), 100);
                    }} />
                </Sidebar>
                <Content className='px-4'>
                    {children[1]}
                </Content>
            </Container>
        </>
    )
}

const NavToggle = ({ expand, onChange }) => {
    return (
        <IconButton circle className='toggle-floating' onClick={onChange} size="xs" icon={expand ? <ArrowLeftLine /> : <ArrowRightLine />}
        />
    );
};

export default ListDetail
