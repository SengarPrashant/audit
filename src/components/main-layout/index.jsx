
import AppBreadCrumb from '../page-layout/appBreadCrumb';
import AppHeader from './appHeader'
import MainNav from './mainNav'
import { Container, Header, Content } from 'rsuite';

function MainLayout({children}) {
    
    return (
        <>
            <Container>
                <Header>
                    <AppHeader />
                </Header>
            </Container>
            <Container style={{ flexDirection: 'row' }}>
                <MainNav />
                <Content className='space-resp-'>
                    <AppBreadCrumb />
                    {children}
                </Content>
            </Container>
        </>
    )
}

export default MainLayout
