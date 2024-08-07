import React, { useEffect } from 'react';
import { mainMenuStore } from '../../stores/common';
import { pageStore } from '../../stores/page';
import { useSnapshot } from 'valtio';
import ListDetail from '../../page-templates/list-details';
import AppList from '../../components/app-list';
import AppForm from '../../components/app-form';
import LayoutRenderar from './layoutRenderar';

const MasterPage = () => {
    const menu = useSnapshot(mainMenuStore);
    const layoutData = useSnapshot(pageStore);
    useEffect(() => {
        pageStore.load(menu.current?.ConfigMetaId);
    }, [menu.current?.ConfigMetaId]);

    return (
        <>
            <LayoutRenderar data={layoutData.data} />
        </>
    );
};

export default MasterPage;