import React, { Suspense, lazy } from 'react';
import SectionRenderar from './sectionRenderar';

export const TableDrawer = lazy(() => import('../../page-templates/table-drawer'));
export const TabsTable = lazy(() => import('../../page-templates/tabs-table'));
export const ListStepForm = lazy(() => import('../../page-templates/list-step-form/listStepForm'));


function LayoutRenderar({ data = {} }) {
    const layout = data.layout?.toLocaleLowerCase();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {layout == 'tabledrawer' && <TableDrawer entityType={data.entityType}
                    table={{ columDefinition: data.columnDefinition, data: data.tableData }} actions={data.actionItems}
                />}
                {layout == 'tabs-table' && <TabsTable pageData={data} />}
                {layout == 'list-step-form' && <ListStepForm pageData={data} />}
            </Suspense>
        </>
    );
};

export default LayoutRenderar;