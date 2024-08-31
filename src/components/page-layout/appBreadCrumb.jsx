import { Breadcrumb } from 'rsuite';
import { useSnapshot } from 'valtio';
import {IconMap} from "../../assets/icons/iconMap";
import {commonStore} from "../../stores/common";


function AppBreadCrumb({ }) {
    const store=useSnapshot(commonStore);
    return (
        <>
            <Breadcrumb className='space-dense-resp'
                // maxItems={5}
                separator={<IconMap name='next' />}
                // onExpand={() => {
                //     console.log('call onExpand');
                // }}
            >
                {store.breadCrumb.map((item,i)=>{
                    return <Breadcrumb.Item href="#" key={i}>{item}</Breadcrumb.Item>
                })}
            </Breadcrumb>
        </>
    )
}


export default AppBreadCrumb
