import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Nav, IconButton, HStack, Loader, Content, SelectPicker, Input, Tag } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import AppTable from '../../components/app-table';
import { constants, dimentions } from '../../components/main-layout/layoutConfig';
import AppConfirmation from '../../components/app-modals/AppConfirmation';
import { commonStore } from '../../stores/common';

const TabsTable = ({ pageData }) => {
    const [activeTabKey, setActiveTab] = useState();
    const [localTabs, setLocalTabs] = useState([]);
    const [events, setEvents] = useState([]);
    const tableRefs = useRef([]);
    const tableHeight = useMemo(() => dimentions.calCulatedViewPortHeight(-90))

    useEffect(() => {
        const { tabs } = pageData;
        setLocalTabs([...(JSON.parse(JSON.stringify(tabs)))]);
        setActiveTab(tabs[0]?.id);
        commonStore.addBreadCrumb(tabs[0]?.title);
    }, [])

    const RaiseEvent = (_event, _data) => {
        if (_event.name.toLocaleLowerCase() == constants.events.newTab) {
            // make api call with tab id (_event.tabId)
            const existing = localTabs.filter(x => x.id == _event.tabId);
            if (existing.length == 0) {
                // commonStore.addBreadCrumb(`${_data.name} / Enum element`);
                localTabs.push({
                    id: 2, title: `${_data.name} / Enum element`,
                    pageId: pageData.id,
                    parentId: _data.id,
                    tableConfig: {
                        globalAction: [
                            { label: 'Reload', disabled: false, icon: 'reload', event: { id: 12, name: 'reloadtable' } },
                            {
                                label: 'Create', disabled: false, icon: 'plus', event: {
                                    id: 1, name: 'open-multistep-drawer-form', title: "Create Enum element",
                                    size: 'sm', // xs/sm/md/lg/full
                                    formSteps: [{
                                        type: 'form', formDefinition: [{
                                            name: 'name',
                                            label: "Enum element name",
                                            placeHolder: 'Enter Enum element name',
                                            helpText: null,
                                            dataType: "string",
                                            controleType: "text", // number, select, checkbox, radio
                                            defaultValue: "",
                                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                                            displayOrder: 1,
                                            validations: [
                                                { type: 'required', message: 'This is required' }
                                            ],
                                        },
                                        {
                                            name: 'description',
                                            label: "Description",
                                            placeHolder: 'Enter Enum element description',
                                            helpText: null,
                                            dataType: "string",
                                            controleType: "text", // number, select, checkbox, radio
                                            defaultValue: "",
                                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                                            displayOrder: 2,
                                            validations: [
                                                { type: 'required', message: 'This is required' }
                                            ],
                                        },
                                        {
                                            name: 'status',
                                            label: "Status",
                                            placeHolder: '',
                                            helpText: null,
                                            dataType: 'bool',
                                            controleType: "checkbox", // number, select, checkbox, radio
                                            defaultValue: "",
                                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                                            displayOrder: 3,
                                            validations: [],
                                        }]
                                    },
                                    { type: 'preview-translation', translate: "api/translate" }
                                    ]
                                }
                            }
                        ],
                        rowActions: [
                            {
                                label: 'Edit', disabled: false, icon: 'edit', event: {
                                    id: 12, name: 'open-multistep-drawer-form', title: "Update Enum element",
                                    formSteps: [{
                                        type: 'form', 
                                        formDefinition: [{
                                            name: 'name',
                                            label: "Enum element name",
                                            placeHolder: 'Enter Enum element name',
                                            helpText: null,
                                            dataType: "string",
                                            controleType: "text", // number, select, checkbox, radio
                                            defaultValue: "",
                                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                                            displayOrder: 1,
                                            validations: [
                                                { type: 'required', message: 'This is required' }
                                            ],
                                        },
                                        {
                                            name: 'description',
                                            label: "Description",
                                            placeHolder: 'Enter Enum element description',
                                            helpText: null,
                                            dataType: "string",
                                            controleType: "text", // number, select, checkbox, radio
                                            defaultValue: "",
                                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                                            displayOrder: 2,
                                            validations: [
                                                { type: 'required', message: 'This is required' }
                                            ],
                                        },
                                        {
                                            name: 'status',
                                            label: "Status",
                                            placeHolder: '',
                                            helpText: null,
                                            dataType: 'bool',
                                            controleType: "checkbox", // number, select, checkbox, radio
                                            defaultValue: "",
                                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                                            displayOrder: 3,
                                            validations: [],
                                        }]
                                    },
                                    { type: 'preview-translation', translate: "api/translate" }
                                    ]

                                }
                            },
                            {
                                label: 'Delete', disabled: false, icon: 'delete', event: {
                                    id: 13, name: 'delete-confirmation',
                                    title: 'Delete Confirmation', message: 'Are you sure you want to delete {resourcename}? This action cannot be undone.'
                                }
                            }
                        ],
                        columnDefinition: [{ label: 'Id', key: 'id', hidden: true },
                        { label: 'Name', key: 'name' },
                        { label: 'Status', key: 'status' },
                        { label: 'Description', key: 'description' }]
                    }
                })
            } else {
                const _temp = JSON.parse(JSON.stringify(localTabs)).map(x => {
                    if (x.id == _event.tabId) {
                        x.title = `${_data.name} / ${x.title.split(" / ")[1]}`
                    }
                    return x;
                });
                setLocalTabs(_temp);
            }
            setActiveTab(+_event.tabId);
        }
        else if (_event.name.toLocaleLowerCase() == constants.events.openDrawerForm) {
            tableRefs.current[activeTabKey].openEditForm(_event, _data);
        }
        else if (_event.name.toLocaleLowerCase() == constants.events.openmultiStepDrawerForm) {
            tableRefs.current[activeTabKey].openMultiStepForm(_event, [_data]);
        }
        else if (_event.name.toLocaleLowerCase() == constants.events.deleteConfirm) {
            setEvents([...events, { ..._event, metaData: _data }])
        }
    }

    const closeTab = (_tabId) => {
        const filtered = localTabs.filter(x => x.id != _tabId);
        setLocalTabs(filtered);
        setActiveTab(filtered[0].id);
        // const oldTab = localTabs.filter(x=>x.id== _tabId)
        // commonStore.removeBreadCrumb(oldTab[0].title)
    }

    const deleteEvent = useMemo(() => {
        const e = events.filter(x => x.name == constants.events.deleteConfirm);
        if (e.length) {
            e[0].message = e[0].message.replace('{resourcename}', `#h${e[0].metaData?.name}#h`)
            return e[0];
        }

    }, [events])

    const CloseDeleteModal = (e) => {
        const remainingEvents = events.filter(x => x.id != e.id);
        setEvents([...remainingEvents])
    }

    return (
        <>
            {/* <HStack justifyContent='space-around'>
                <Tag color='blue'>Module 1</Tag>
                <Tag>Module 2</Tag>
                <Tag>Module 3</Tag>
                <Tag>Module 4</Tag>
                <Tag>Module 5</Tag>
            </HStack> */}
            <Nav appearance="subtle" activeKey={activeTabKey}>
                {localTabs.map((tab, index) => {
                    return <Nav.Item key={tab.id} eventKey={tab.id} onClick={() => setActiveTab(tab.id)}>
                        <HStack>
                            {tab.title}
                            {index > 0 && <IconButton icon={<CloseIcon />} size="xs"
                                appearance="subtle" style={{ padding: '4px 6px' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeTab(tab.id);
                                }}
                            />}
                        </HStack>
                    </Nav.Item>
                })}
            </Nav>
            <AppConfirmation open={deleteEvent} title={deleteEvent?.title}
                confirmationMessage={deleteEvent?.message} onClose={() => CloseDeleteModal(deleteEvent)} />

            <Content className='px-2 pb-2'>
                {localTabs.map((tab, i) => {
                    return <div key={tab.id + i} style={{ display: activeTabKey == tab.id ? 'block' : 'none' }}>
                        <AppTable
                            ref={el => tableRefs.current[tab.id] = el}
                            columnDefinition={tab?.tableConfig?.columnDefinition}
                            height={tableHeight} raiseEvent={RaiseEvent}
                            dataSource={tab?.tableConfig?.dataSource} rowActions={tab?.tableConfig?.rowActions}
                            globaleActions={tab?.tableConfig?.globalAction}
                            parent={{ pageId: tab.pageId, parentId: tab.parentId }}
                        />
                    </div>
                })}
            </Content>
        </>
    );
};

export default TabsTable;