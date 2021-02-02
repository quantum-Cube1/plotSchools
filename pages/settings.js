import  React from 'react'
import Head from 'next/head';
import { Card, Row, Typography, Button, Menu, Dropdown } from 'antd';
import { theme } from '../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { PrivateRoute } from '../components/PrivateRoute';


const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const SettingPage = () => {
   return (
    <Card 
    title="User Setting "
    extra={
      <Dropdown overlay={menu}>
        <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
      </Dropdown>
    }
    bodyStyle={{ padding: '1rem' }}
    className="mb-4"> 
      <div className="p-4">

      </div>
   </Card>
   )  
}

export default PrivateRoute(SettingPage);
