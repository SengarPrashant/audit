import React, { useState } from 'react';
import AppTable from '../components/app-table';
import AppDrawer from '../components/app-drawer';
import { HStack, Button, Panel } from 'rsuite';
import { IconMap } from '../assets/icons/iconMap';
import { constants, dimentions } from '../components/main-layout/layoutConfig'
import AppForm from '../components/app-form';
import { useSnapshot } from 'valtio';
import { pageStore } from '../stores/page';

const TableDrawer = ({ table = { columDefinition: [], data: [] },
     actions = [], entityType, containerType='page' }) => {
    
    const addH=containerType=='drawer' ? -(dimentions.actions.h  + 50 +70) : -(dimentions.actions.h + dimentions.crumb.h + 50 + 41.6)

    const tableHeight = dimentions.calCulatedViewPortHeight(addH);

    const [current, SetCurrent] = useState({ selected: undefined });
    const [drawer, SetDrawer] = useState({ open: false, action: '', data: undefined, entityType:entityType });
    const snap = useSnapshot(pageStore);

    const onLinkClick = (row) => {
        SetCurrent(row);
        const _action = constants.actionCodes.detail;
        SetDrawer({ ...drawer, open: true, action: constants.actionCodes.detail, entityType:row.childEntytType, data: snap?.data[_action][entityType] });
    }
    const onActionClick = (action = '') => {
        switch (action) {
            case constants.actionCodes.create:
                SetDrawer({ ...drawer, open: true, action: action, data: snap?.data[action][entityType] });
                break;
            default:
                break;
        }
    }

    const onDrawerClose = () => {
        SetDrawer({ ...drawer, open: false, action: '', data: undefined });

    }

    return (
        <>
            <HStack justifyContent='space-between'>
                <HStack>
                    {actions.map((action, i) => {
                        return <Button key={i} appearance="link" disabled={action.disabled} color='blue' onClick={() => onActionClick(action.action)}>
                            <HStack><IconMap name={action.icon} /> {action.label}</HStack>
                        </Button>
                    })}
                </HStack>
                <HStack>
                </HStack>
            </HStack>
            <AppTable columnDefinition={table.columDefinition} data={table.data} height={tableHeight} onLinkClick={onLinkClick} />

            <AppDrawer open={drawer.open} data={current} backdrop={true} onClose={onDrawerClose} size="lg"
                title={drawer.data?.title}
                body={<>
                    {drawer.action == constants.actionCodes.create &&
                        <Panel bodyFill>
                            <AppForm formDefinition={drawer.data?.formDefinition} defaultData={{}}
                             preview={snap?.data[drawer.action][entityType]?.view}
                                emptyText={drawer.data?.emptyText || "No config"} actions={drawer.data?.actionItems} />
                        </Panel>
                    }
                    {drawer.action == constants.actionCodes.detail &&
                        <TableDrawer table={{ columDefinition: drawer.data?.columnDefinition, data: drawer.data?.tableData }}
                            actions={drawer.data?.actionItems} entityType={drawer.entityType} containerType='drawer' />
                        // <Panel bodyFill>
                        //     <AppForm formDefinition={drawer.data?.formDefinition} defaultData={{}}
                        //         emptyText={drawer.data.emptyText || "No config"} actions={drawer.data?.actionItems} />
                        // </Panel>
                    }
                </>} />
        </>
    );
};

export default TableDrawer;