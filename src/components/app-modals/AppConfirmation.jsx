import React from 'react';
import { Button, Highlight, HStack, Modal, Placeholder } from 'rsuite';
import { IconMap } from '../../assets/icons/iconMap';

const AppConfirmation = ({ open = false,
    title = '',
    confirmationMessage = '',
    onClose = () => { },
    onConfirm = () => { }
}) => {

    const highlight = confirmationMessage.split('#h');
    const displayMessage = confirmationMessage.split('#h').join('');

    return (
        <Modal backdrop='static' open={open} role='alertdialog' size="xs">
            {title && <>
                <HStack>
                    <IconMap name='warn' w={24} h={24} /> <Modal.Title>
                        {title || <Placeholder rows={1} as="title" />}
                    </Modal.Title>
                </HStack>
            </>}
            <Modal.Body>
                <HStack justifyContent='center' alignItems='flex-start'>
                    <Highlight query={highlight.length ? highlight[1] : ''}>
                        {displayMessage || <Placeholder rows={2} as="p" />}
                    </Highlight>
                </HStack>
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' appearance='default' onClick={onClose} >Cancel</Button>
                <Button size='sm' appearance='primary' onClick={onConfirm}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppConfirmation;