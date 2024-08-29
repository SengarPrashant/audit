import React, { Suspense, lazy } from 'react';

export const AppTree = lazy(() => import('../../components/app-tree'));
export const AppList = lazy(() => import('../../components/app-list'));
export const AppForm = lazy(() => import('../../components/app-form'));
export const NestedForm = lazy(() => import('../../components/app-form/nestedForm'));


function SectionRenderar({ data, section = '', ...additionalProps }) {
    const _section = section?.toLocaleLowerCase();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {_section == 'list' && <AppList data={data.data} {...additionalProps} />}
                {_section == 'form' && <AppForm formDefinition={data.formDefinition} actions={data.actionItems}
                    emptyText={data?.emptyText} {...additionalProps} />}
                {_section == 'nestedForm' && <NestedForm formDefinition={data.formDefinition} actions={data.actionItems}
                    emptyText={data?.emptyText} {...additionalProps} />}
            </Suspense>
        </>
    );
};

export default SectionRenderar;