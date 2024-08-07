import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { Sidebar, Sidenav, Nav } from 'rsuite';
import { useNavigate } from 'react-router-dom';


import { mainMenuStore } from '../../stores/common';
import { colors, dimentions } from './layoutConfig';
import MenuIcons from './menuIcons';


function MainNav() {
  const [expand, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('0-0');
  const menu = useSnapshot(mainMenuStore)
  const navigate = useNavigate();

  useEffect(() => {
    if (menu.list.length == 0)
      mainMenuStore.load();
  }, [])

  const setCurrentMenu = (menuItem) => {
    mainMenuStore.setCurrent(menuItem);
    navigate(`/${menuItem.name}`.toLocaleLowerCase().split(' ').join('-'))
  }

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
              <RecursiveComponent data={menu.list} parentIndex={0} setCurrent={setCurrentMenu} selectedKey={activeKey} />
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
        </Sidenav>
      </Sidebar>
    </>
  )
}


const RecursiveComponent = ({ data, parentIndex, selectedKey, setCurrent }) => {
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
            <RecursiveComponent data={menu.children} parentIndex={i} setCurrent={setCurrent} />
          </Nav.Menu>
          :
          <Nav.Item eventKey={key} key={key} // as={NavLink} 
            onClick={(event) => {
              event.preventDefault();
              setCurrent(menu);
            }}
            // to={`/${menu.name}`.toLocaleLowerCase().split(' ').join('-')}
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
