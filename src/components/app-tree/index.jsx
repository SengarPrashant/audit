import { useEffect } from 'react';
import { Tree } from 'rsuite';
import { useSnapshot } from 'valtio';
import { clientStore } from '../../stores/client';

export default function AppTree({ data = [], onSelect = () => { }, hidden=false }) {

    const treedata = useSnapshot(clientStore);
    useEffect(() => {
        if (treedata.tree.length == 0)
            clientStore.load();
      }, [])

      const clonedTreeData = JSON.parse(JSON.stringify(treedata.tree));
    
    return <>
        <Tree data={clonedTreeData || []} searchable
        height="fit-content"
        style={{overflowY:'auto', display:hidden ? 'none' :'block'}}
         />
    </>
}