import { Breadcrumb } from 'rsuite'


function AppBreadCrumb({ }) {
    return (
        <>
            {/* <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/components/overview">Components</Breadcrumb.Item>
                <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
            </Breadcrumb> */}
            <Breadcrumb className='space-dense-resp'
                maxItems={5}
                onExpand={() => {
                    console.log('call onExpand');
                }}
            >
                <Breadcrumb.Item href="#">Item A</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Item B</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Item C</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Item D</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Item E</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Item F</Breadcrumb.Item>
            </Breadcrumb>
        </>
    )
}


export default AppBreadCrumb
