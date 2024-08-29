import React, { Suspense, lazy } from 'react';
import SectionRenderar from './sectionRenderar';

export const ListDetails = lazy(() => import('../../page-templates/list-details'));
export const TableDrawer = lazy(() => import('../../page-templates/table-drawer'));
export const TabsTable = lazy(() => import('../../page-templates/tabs-table'));
export const ListDetail = lazy(() => import('../../page-templates/list-detail'));


function LayoutRenderar({ data = {} }) {
    const layout = data.layout?.toLocaleLowerCase();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {layout == 'listdetail' && <ListDetails>
                    <SectionRenderar data={data.col1} section={data.col1?.section} />
                    <SectionRenderar data={data.col2} section={data.col2?.section} />
                </ListDetails>}
                {layout == 'tabledrawer' && <TableDrawer entityType={data.entityType}
                    table={{ columDefinition: data.columnDefinition, data: data.tableData }} actions={data.actionItems}
                />}
                {layout == 'tabs-table' && <TabsTable pageData={data} />}
                {layout == 'list-detail' && <ListDetail pageData={data} />}
            </Suspense>
        </>
    );
};

export default LayoutRenderar;