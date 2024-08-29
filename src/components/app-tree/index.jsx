import React, { useEffect } from 'react';
import { Tree } from 'rsuite';
import { useSnapshot } from 'valtio';
import { clientStore } from '../../stores/client';

export default function AppTree({ data = [], onSelect = () => { }, hidden = false }) {
    const treeRef = React.useRef();
    const treedata = useSnapshot(clientStore);
    // useEffect(() => {
    //     if (treedata.tree.length == 0)
    //         clientStore.load();
    //     // inref.current
    // }, [])

    useEffect(() => {
    
      }, []);

      const handleSearch = () => {
        // Delay to allow RSuite Tree component to finish rendering the search results
        setTimeout(() => {
          const treeElement = treeRef.current;
          if (treeElement) {
            // Customize the "No results found" message
            const noResultsMessage = treeElement.querySelector('.rs-tree .rs-tree-empty');
            if (noResultsMessage) {
              noResultsMessage.innerText = 'No matching results found'; // Custom message
            }
          }
        }, 0); // Adjust timeout if necessary
      };
    
      useEffect(() => {
        if (treedata.tree.length == 0)
            clientStore.load();
        // Customize the search placeholder text
        const searchInput = treeRef.current.querySelector('input[placeholder="Search"]');
        if (searchInput) {
          searchInput.placeholder = 'Type to search...'; // Custom placeholder text
        }
      }, []);



    const clonedTreeData = JSON.parse(JSON.stringify(treedata.tree));

    return <div ref={treeRef}>
        <Tree data={clonedTreeData || []} searchable
            height="fit-content" onSearch={handleSearch}
            style={{ overflowY: 'auto', display: hidden ? 'none' : 'block' }}
            renderExtraFooter={() => <div style={{ textAlign: 'center', padding: 10 }}>No matching results found</div>} // Custom 'no results found' message
        />
    </div>
}