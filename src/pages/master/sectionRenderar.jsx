import React, { Suspense, lazy } from 'react';

export const AppTree = lazy(() => import('../../components/app-tree'));
export const AppList = lazy(() => import('../../components/app-list'));
export const AppForm = lazy(() => import('../../components/app-form'));


function SectionRenderar({ data, section='' }) {
    const _section=section?.toLocaleLowerCase();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {_section=='list' && <AppList data={data.data} />}
                {_section=='form' && <AppForm formData={data.data} actions={data.actionItems} emptyText={data?.emptyText} />}
            </Suspense>
        </>
    );
};

export default SectionRenderar;