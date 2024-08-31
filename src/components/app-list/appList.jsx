import { IconButton, Tree } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import { dimentions } from '../main-layout/layoutConfig';
import { useState, useEffect } from 'react';
import NoData from '../no-data';

export default function AppList({ config={}, onSelect = () => { },onCreate=()=>{}, hidden = false }) {
    const [data, setData] = useState([]);
    const {emptyText,definition} = JSON.parse(JSON.stringify(config));

    useEffect(() => {
        const apiData = [
            { name: 'English', code:"en", langId: 12 }, { name: 'German', code:"ger", langId: 11 },
            { name: 'Spanish', code:"sp", langId: 13 }, { name: 'French', code:"fr", langId: 14 }
        ];
        setData(apiData);
    }, [])

    const onListSelect = (node) => {
        onSelect(node)
    }
    const onCreateClick = () => {
        onCreate();
    }

    if(!definition) return <NoData size={70} text={emptyText} />

    return <>

        <IconButton appearance='subtle' icon={<PlusIcon />} size="xs" onClick={onCreateClick}
            style={{ position: 'absolute', height: 32, width: 32, top: 8, right: 8, zIndex: 1 }} />

        <Tree data={data} labelKey={definition?.label || 'label'} draggable={false} valueKey={definition?.value || 'id'} 
        onSelect={onListSelect} searchable className='tree-to-list'
            height={`calc(100vh - ${(dimentions.header.h + dimentions.crumb.h)})`}
            style={{ overflowY: 'auto', display: hidden ? 'none' : 'block', position: 'relative' }}
        />
    </>
}