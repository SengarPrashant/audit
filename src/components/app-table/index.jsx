import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { HStack, Button, Panel, Table, Pagination, Divider } from 'rsuite';
import * as _ from 'lodash';
import { http } from '../../helper/http';
import { IconMap } from '../../assets/icons/iconMap';
import ActionMenu from './actionMenu';
import { constants } from '../main-layout/layoutConfig';
import DrawerForm from '../drawer-form/drawerForm';
import DrawerFormMultistep from '../drawer-form/drawerFormMultiStep';

const AppTable = forwardRef(({ columnDefinition = [], rowActions = [], globaleActions = [],
    dataSource = '', raiseEvent = () => { }, height = 420, parent = { pageId: 0, parentId: 0 } }, ref) => {
        const { Column, HeaderCell, Cell } = Table;
        const [sortColumn, setSortColumn] = React.useState();
        const [sortType, setSortType] = React.useState();
        const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
        const [drawer, setDrawer] = useState({ open: false, data: {} });
        const [multiStepDrawer, setMultiStepDrawerDrawer] = useState({ open: false, data: {} });
    
        const tableHeight = useMemo(() => globaleActions.length > 0 ? height - 34 : height, [])
    
        useEffect(() => {
            // http.get(dataSource).then(res=>setData(res.data));
            resetTable();
            loadData();
        }, []);
        useImperativeHandle(ref, () => {
            return {
              reload() {
                loadData();
              },
              openEditForm(event, _editData) {
                const action = globaleActions.filter(x=>x.event.name===event.name);
                setDrawer({ open: true, data: { defaultData: _editData, ...action[0].event, title:event.title } });
              },
              openMultiStepForm(event, _editData) {
                const action = globaleActions.filter(x=>x.event.name===event.name);
                setMultiStepDrawerDrawer({ open: true, data: { defaultData: _editData, ...event } });
              },
            };
          }, []);
    
        const loadData = () => {
            const _mockData = [];
            for (let index = 0; index < 30; index++) {
                _mockData.push({ id: index + 1, status: 'Active', name: `Name ${index}`, description: `Dummy description ${index}` })
            }
            setData(_mockData)
        }
    
        const resetTable = () => {
            setSortColumn(undefined);
            setSortColumn(undefined);
            setSortType(undefined);
            setPage(1);
        }
    
        const getData = () => {
            if (sortColumn && sortType) {
                const list = JSON.parse(JSON.stringify(data));
                const ordered = _.orderBy(list, item => item[sortColumn], [sortType]);
                return currentPage(ordered, page);
            }
            return currentPage(data, page);;
        };
    
        const currentPage = (_data, _currentPage) => {
            return _data.filter((v, i) => {
                const start = 10 * (_currentPage - 1);
                const end = start + 10;
                return i >= start && i < end;
            })
        }
    
        const handleSortColumn = (sortColumn, sortType) => {
            setSortColumn(sortColumn);
            setSortType(sortType);
        };
    
        const globalActionClick = (event) => {
            if (event.name == constants.events.reloadtable) {
                loadData();
            }
            else if (event.name == constants.events.openDrawerForm) {
                setDrawer({ open: true, data: { defaultData: [], ...event } });
            }
            else if (event.name == constants.events.openmultiStepDrawerForm) {
                setMultiStepDrawerDrawer({ open: true, data: { defaultData: [], ...event } });
            }
            else {
                raiseEvent(event);
            }
        }
    
        const closeDrawer = () => {
            setDrawer({
                open: false, data: {
                    title: "",
                    formDefinition: []
                }
            })
            setMultiStepDrawerDrawer({
                open: false, data: {
                    title: "",
                    formSteps: []
                }
            })
        }
    
        const CustomCell = ({ rowData, dataKey, linkClickEvent, type, ...props }) => (
            <Cell {...props}>
                {type == 'link' && <Button style={{ padding: 0 }} appearance="link" color='blue' onClick={() => { raiseEvent(linkClickEvent, rowData) }}>
                    {rowData[dataKey]}
                </Button>}
                {(!type || type != 'link') && rowData[dataKey]}
            </Cell>
        );
    
        return (
            <>
                <DrawerFormMultistep open={multiStepDrawer.open} data={multiStepDrawer.data} onClose={closeDrawer} parent={parent} />
                <DrawerForm open={drawer.open} data={drawer.data} onClose={closeDrawer} parent={parent} />
                <HStack>
                    {globaleActions.map((action, i) => {
                        return <Button key={action.id} appearance="link" disabled={action.disabled} color='blue' onClick={() => globalActionClick(action.event)}>
                            <HStack><IconMap name={action.icon} /> {action.label}</HStack>
                        </Button>
                    })}
                </HStack>
                {/* <Divider style={{ marginTop: 0, marginBottom: 0 }} /> */}
                <Panel bordered shaded className='bg-light1 p-0' bodyFill style={{ height: { tableHeight } }}>
                    <Table bordered height={tableHeight} data={getData()} onSortColumn={handleSortColumn}
                        sortColumn={sortColumn}
                        sortType={sortType}
                        style={{ backgroundColor: 'white', flexGrow: 1 }}
                        cellBordered>
                        {columnDefinition.filter(x => !x.hidden).map((col, i) => {
                            return <Column width={col.w || 50} key={col.key} flexGrow={1} align="left" fixed sortable verticalAlign='center'>
                                <HeaderCell style={{ borderBottom: '2px solid lightgrey' }}>
                                    <b>{col.label || col.key}</b>
                                </HeaderCell>
                                <CustomCell dataKey={col.key} type={col.type} linkClickEvent={col.event} />
                            </Column>
                        })}
                        {(rowActions && rowActions.length) && <Column width={50}>
                            <HeaderCell>
                            </HeaderCell>
                            <ActionMenu dataKey="id" actionList={rowActions} onActionSelect={raiseEvent} />
                        </Column>}
                    </Table>
                    <Panel bordered bodyFill className='p-2' >
                        <Pagination total={data.length} limit={10} prev next first last maxButtons={5} layout={['pager']}
                            activePage={page} onChangePage={setPage} />
                    </Panel>
                </Panel>
            </>
        );
});



export default AppTable;