import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, ProfileFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'


const { SubMenu } = Menu;

interface TopMenuTypes {
  activeEl: string
}


const TopMenu: React.FC<TopMenuTypes> = ({ activeEl }) => {

    // const dispatch = useDispatch();


    return (
        <Menu theme={'dark'} defaultSelectedKeys={[activeEl]} mode="horizontal">
          <Menu.Item key="main" icon={<ProfileFilled />}>
            <Link to="/">
              Профиль
            </Link>
          </Menu.Item>
          <Menu.Item key="charts"  icon={<AppstoreOutlined />}>
            <Link to="/charts">
              Чарты
            </Link>
          </Menu.Item>
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
      </Menu>
    )
}

export default TopMenu