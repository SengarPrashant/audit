import { Button, ButtonToolbar, HStack, IconButton, Tree } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import { dimentions } from '../main-layout/layoutConfig';
import { listDetailEventStore as eventStore } from "../../stores/list-detail-event";

export default function AppList({ data = [], onSelect = () => { }, hidden = false }) {
    const clonedData = JSON.parse(JSON.stringify(data));

    const onListSelect = (node) => {
        eventStore.set([node]);
        onSelect(node)
    }
    const onCreateClick = () => {
        eventStore.set([]);
    }

    return <>
      
        <IconButton appearance='subtle' icon={<PlusIcon />} size="xs" onClick={onCreateClick}
            style={{ position: 'absolute', height: 32, width: 32, top: 8, right: 8, zIndex: 1 }} />

        <Tree data={clonedData.list} labelKey={clonedData.keys['label'] || 'label'} draggable={false} valueKey={clonedData.keys['code'] || 'code'} onSelect={onListSelect} searchable className='tree-to-list'
            height={`calc(100vh - ${(dimentions.header.h + dimentions.crumb.h)})`}
            style={{ overflowY: 'auto', display: hidden ? 'none' : 'block', position: 'relative' }}
        />
    </>
}