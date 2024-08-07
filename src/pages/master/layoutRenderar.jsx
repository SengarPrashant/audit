import React, { Suspense, lazy } from 'react';
import SectionRenderar from './sectionRenderar';

export const ListDetail = lazy(() => import('../../page-templates/list-details'));


function LayoutRenderar({ data = {} }) {
    const layout = data.layout?.toLocaleLowerCase();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {layout == 'listdetail' && <ListDetail>
                    <SectionRenderar data={data.col1} section={data.col1?.section} />
                    <SectionRenderar data={data.col2} section={data.col2?.section} />
                </ListDetail>}

                {/* {conditionB && <ComponentB />} */}
            </Suspense>
        </>
    );
};

export default LayoutRenderar;