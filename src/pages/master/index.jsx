import React, { useEffect } from 'react';
import { mainMenuStore } from '../../stores/common';
import { pageStore } from '../../stores/page';
import { useSnapshot } from 'valtio';
import LayoutRenderar from './layoutRenderar';

const MasterPage = () => {
    const menu = useSnapshot(mainMenuStore);
    const layoutData = useSnapshot(pageStore);
    useEffect(() => {
        pageStore.load(menu.current.configMetaId);
    }, [menu.current]);

    return (
        <>
            <LayoutRenderar data={layoutData.data} />
        </>
    );
};

export default MasterPage;