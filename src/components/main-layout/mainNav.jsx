import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { Container, Header, Sidebar, Stack, Sidenav, Content, Nav, Breadcrumb, IconButton } from 'rsuite';

import { mainMenuStore } from '../../stores/common';
import { colors, dimentions } from './layoutConfig';
import MenuIcons from './menuIcons';


function MainNav() {
  const [expand, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('0-0');
  const menu = useSnapshot(mainMenuStore)

  useEffect(() => {
    if (menu.list.length == 0)
      mainMenuStore.load();
  }, [])

  return (
    <>
      <Sidebar
        style={{
          height: `calc(100vh - ${dimentions.header.h}px)`,
          boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
        }}
        width={expand ? dimentions.menu.expanded : dimentions.menu.collapsed}
        collapsible>
        <Sidenav expanded={expand} appearance='subtle' defaultOpenKeys={[]} style={{ height: `calc(100vh - ${dimentions.header.h}px)` }}>
          <Sidenav.Body>
            <Nav appearance='subtle' activeKey={activeKey} onSelect={(k) => {
              k && setActiveKey(k)
            }}>
              <RecursiveComponent data={menu.list} parentIndex={0} selectedKey={activeKey} />
            </Nav>
            {/* <Nav activeKey={activeKey} onSelect={(k) => {
              console.log(k)
              setActiveKey(k)
            }}>
              <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<GroupIcon />}>
                User Group
              </Nav.Item>
              <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
                <Nav.Item eventKey="3-1">Geo</Nav.Item>
                <Nav.Item eventKey="3-2">Devices</Nav.Item>
                <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                placement="rightStart"
                eventKey="4"
                title="Settings"
                icon={<GearCircleIcon />}
              >
                <Nav.Item eventKey="4-1">Applications</Nav.Item>
                <Nav.Item eventKey="4-2">Channels</Nav.Item>
                <Nav.Item eventKey="4-3">Versions</Nav.Item>
                <Nav.Menu eventKey="4-5" title="Custom Action">
                  <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                  <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
            </Nav> */}
          </Sidenav.Body>
          <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
        </Sidenav>
      </Sidebar>
    </>
  )
}


const RecursiveComponent = ({ data, parentIndex, selectedKey }) => {
  return <>
    {data.map((menu, i) => {
      const key = `${parentIndex}-${i}`;


      const hasActiveChild = (children, parentKey) => {
        return children.some((child, index) => {
          const childKey = `${parentKey}-${index}`;
          return childKey === selectedKey || (child.children && hasActiveChild(child.children, index));
        });
      };

      const isActive = key === selectedKey || (menu.children && hasActiveChild(menu.children, i));

      return <>
        {(menu.children && menu.children.length > 0) ?
          <Nav.Menu placement="rightStart" key={key} eventKey={key} title={menu.name}
            icon={<MenuIcons icon={menu.icon} className='menu-icon' color={isActive ? colors.primary.main : undefined} />}>
            <RecursiveComponent data={menu.children} parentIndex={i} />
          </Nav.Menu>
          :
          <Nav.Item eventKey={key} key={key} as={NavLink} to={`/${menu.name}`.toLocaleLowerCase().split(' ').join('-')}
            icon={parentIndex == 0 ?
              <MenuIcons icon={menu.icon} className='menu-icon' color={isActive ? colors.primary.main : undefined} />
              : undefined}>
            {menu.name}
          </Nav.Item>
        }
      </>;
    })}
  </>
};

export default MainNav
