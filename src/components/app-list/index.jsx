import { Tree } from 'rsuite';
import { dimentions } from '../main-layout/layoutConfig';

export default function AppList({ data = [], onSelect = () => { }, hidden = false }) {
    const clonedData = JSON.parse(JSON.stringify(data));
    return <>
        <Tree data={clonedData} searchable className='tree-to-list'
            height={`calc(100vh - ${(dimentions.header.h+dimentions.crumb.h)})`}
            style={{ overflowY: 'auto', display: hidden ? 'none' : 'block' }}
        />
    </>
}