import React from 'react'
import { useSnapshot } from 'valtio';
import { Container, Content, Sidebar, IconButton } from 'rsuite'
import { ArrowLeftLine, ArrowRightLine } from '@rsuite/icons'

import { dimentions } from '../components/main-layout/layoutConfig';
import { listDetailEventStore } from '../stores/list-detail-event';

function ListDetail({ children, onToggle = (expanded = false) => { } }) {
    const [expand, setExpand] = React.useState(true);

    const selectedData = useSnapshot(listDetailEventStore);

    const child2 = React.cloneElement(children[1], { defaultData: selectedData.selectedNodes[0] || {} });

    return (
        <>
            <Container style={{ flexDirection: 'row' }}>
                <Sidebar collapsible className='col-flex'
                    style={{ border: '1px solid #EBEBEB', height: `calc(100vh - ${(dimentions.header.h + dimentions.crumb.h)}px)` }}
                    width={expand ? dimentions.menu.expanded : dimentions.menu.collapsed}>
                    {children[0]}
                    <NavToggle expand={expand} onChange={() => {
                        setExpand(!expand);
                        setTimeout(() => onToggle(!expand), 100);
                    }} />
                </Sidebar>
                <Content className='px-4'>
                    {/* {children[1]} */}
                    {child2}
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
