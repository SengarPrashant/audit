import React from 'react';
import { Popover, Dropdown, Table, Whisper, IconButton } from 'rsuite';
import { IconMap } from '../../assets/icons/iconMap';


// { label: 'Edit', disabled: false, icon: 'edit', event: { id: 12, name: 'open-drawer-form' } },


const ActionMenu = ({ rowData, dataKey, type, onActionSelect, actionList, ...props }) => {
    const { Cell } = Table;

    const renderMenu = ({ onClose, left, top, className, ...rest }, ref) => {
        const handleSelect = eventKey => {
            if (onActionSelect) {
                const selected=actionList.filter(x=>x.event.id==eventKey)[0]
                onActionSelect(selected.event, rowData);
                onClose()
            }
        };
        return (
            <Popover ref={ref} className={className} style={{ left, top, padding:0, minWidth:120 }} {...rest}>
                <Dropdown.Menu onSelect={handleSelect} className='p-1'>
                    {actionList.map((item,i)=>{
                        return <Dropdown.Item eventKey={item?.event?.id} icon={<IconMap name={item.icon}/>}>{item.label}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Popover>
        );
    };

    return <Cell {...props} style={{ paddingTop: 0, paddingBottom: 0, display: 'flex', alignItems: 'center' }}>
        <Whisper placement="autoHorizontal" trigger="click"
            speaker={renderMenu}>
            <IconButton icon={<IconMap name='more' />} style={{ padding: '4px 4px' }} />
        </Whisper>
    </Cell>
};

export default ActionMenu