import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Sidebar, Sidenav, Nav } from 'rsuite';
import { useNavigate } from 'react-router-dom';


import { mainMenuStore } from '../../stores/common';
import { colors, dimentions } from './layoutConfig';
import MenuIcons from './menuIcons';


function MainNav() {
  const [expand, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('');
  const menu = useSnapshot(mainMenuStore)
  const navigate = useNavigate();

  useEffect(() => {
    if (menu.list.length == 0)
      mainMenuStore.load();
  }, [])
  useEffect(() => {
    setActiveKey(menu.list[0]?.configMetaId)
  }, [menu.list])

  const setCurrentMenu = (menuItem) => {
    mainMenuStore.setCurrent(menuItem);
    navigate(`/${menuItem.name}`.toLocaleLowerCase().split(' ').join('-'))
  }

  const onSelect = (key) => {
    if (key) {
      setActiveKey(key);
      const _menu = mainMenuStore.setCurrentById(key);
      navigate(`/${_menu.name}`.toLocaleLowerCase().split(' ').join('-'))
    }
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
            <Nav activeKey={activeKey} onSelect={onSelect}>
              <RecursiveComponent list={menu.list} parentIndex={0} current={menu.current} />
            </Nav>
            
          </Sidenav.Body>
          <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
        </Sidenav>
      </Sidebar>
    </>
  )
}

const RecursiveComponent = ({ list = [], parentIndex, current }) => {

  return <>
    {list.map((menu, i) => {

      const hasActiveChild = (children) => {
        return children.some((child, index) => {
          return child.configMetaId === current?.configMetaId || (child.children && hasActiveChild(child.children));
        });
      };
      const isActive = menu.configMetaId == current?.configMetaId || (menu.children && hasActiveChild(menu.children, i));


      return (menu.children && menu.children.length > 0) ?
        <Nav.Menu placement="rightStart" eventKey={menu.configMetaId} title={menu.name}
        icon={<MenuIcons icon={menu.icon} className='menu-icon' color={isActive ? colors.primary.main : undefined} />}>
          <RecursiveComponent list={menu.children} parentIndex={i} />
        </Nav.Menu>
        :
        <Nav.Item eventKey={menu.configMetaId}
          icon={parentIndex == 0 ?
            <MenuIcons icon={menu.icon} className='menu-icon' color={isActive ? colors.primary.main : undefined} />
            : undefined}>
          {menu.name}</Nav.Item>
    })}
  </>
}



export default MainNav
