import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import SidebarData from './SidebarData'; // Import SidebarData as default
import './sidebar.css';
import { IconContext } from 'react-icons';

function Sidebar() {
  const isAdmin = true;
  const {id} = useParams();
  const state = useSelector((state) => state.handleCart);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section'); // Assuming each section has a unique ID
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <IconContext.Provider value={{ color: '#fb2157' }}>
      <nav className='nav-menu active'>
        <ul className='nav-menu-items'>


          {SidebarData.map((item, index) => (
            <li
              key={index}
              style={{ rowGap: '1rem' }}
              className={`${item.cName} ${activeSection === item.path ? 'active' : ''}`}
            >
              <Link to={item.path}>
                <span style={{ fontSize: '30px' }}>{item.icon}</span>
                <span style={{ color: 'black', fontSize: '17px', paddingLeft: '1rem' }}>{item.title}</span>
              </Link>
            </li>
          ))}
                {/* <Link to={`/ordersPage/${id}`}><button ><b>Order</b></button></Link> */}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;
