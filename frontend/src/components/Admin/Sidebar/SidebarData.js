import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

 const SidebarData  = [
  {
    title: 'Order Details',
    path: '/order/id',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

 
  {
    title: 'Payment Details',
    path: '/paymentDetails',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Add Category',
    path: '/category',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'View Category',
    path: '/categoryTable',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Edit Category',
    path: '/categoryUpdate/:id',
    
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Add Chef',
    path: '/chefForm',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'View Chef',
    path: '/chefCard',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Edit Chef',
    path: '/chefUpdate/:id',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Add Food',
    path: '/food',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'View Food',
    path: '/foodTable',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Edit Food',
    path: '/foodUpdate/:id',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  }
];
export  default SidebarData 