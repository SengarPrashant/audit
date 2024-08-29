import React from 'react';
import { Drawer, Placeholder, Button, HStack, Input } from 'rsuite';

const AppDrawer = ({ open, backdrop = true, size = 'lg',
    title,
    onClose,
    body = <Placeholder.Paragraph rows={10} /> }) => {

    return (
        <Drawer open={open} backdrop={backdrop} onClose={onClose} size={size}>
            <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body style={{ padding: 0 }}>
                {body}
            </Drawer.Body>
        </Drawer>
    );
};

export default AppDrawer;