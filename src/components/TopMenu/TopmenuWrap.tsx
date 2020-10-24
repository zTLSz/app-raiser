import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux'
import { LogoutOutlined, AppstoreOutlined, EditOutlined, ProfileFilled } from '@ant-design/icons';
import { requestLogout } from '../../actions/auth'
import { Link } from 'react-router-dom'


const { SubMenu } = Menu;


const MenuWrap =  styled.menu`
  .menu-item__right {
    float: right;
  }
`

const GlobalMenuStyle = createGlobalStyle`
  menu {
    margin: 0;
    padding: 0;
  }
`

interface TopMenuTypes {
  activeEl: string
}


const TopMenu: React.FC<TopMenuTypes> = ({ activeEl }) => {

    const dispatch = useDispatch();


    return (
      <MenuWrap>
        <GlobalMenuStyle />
        <Menu theme={'dark'} className={"test"} defaultSelectedKeys={[activeEl]} mode="horizontal">
          <Menu.Item key="main" icon={<ProfileFilled />}>
            <Link to="/">
              Главная
            </Link>
          </Menu.Item>
          <Menu.Item key="charts"  icon={<AppstoreOutlined />}>
            <Link to="/charts">
              Чарты
            </Link>
          </Menu.Item>
          <Menu.Item key="editprofile"  icon={<EditOutlined />}>
            <Link to="/editprofile">
              Редактировать профиль
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" className="menu-item__right" icon={<LogoutOutlined />} onClick={() => dispatch(requestLogout())}>
              Выход
          </Menu.Item>
      </Menu>
    </MenuWrap>
    )
}



/*

          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

*/

export default TopMenu