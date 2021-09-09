import React, { useState } from 'react';
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import history from '../history';

const Header = () => {
    const [activeMenu, setActiveMenu] = useState('');

    const handleMenuClick = (e, { name }) => {
        setActiveMenu(name);
    }

    return (
        <div>
            <Menu stackable size='large' secondary color='teal'>
                <Menu.Item position='left'>
                    <Image src={logo} size='tiny' />
                </Menu.Item>
                <Menu.Item name='PROJECTS' onClick={handleMenuClick} active={activeMenu === 'PROJECTS'} />
                <Menu.Item name='RESUME' onClick={handleMenuClick} active={activeMenu === 'RESUME'} />
                <Menu.Item name='CONTACT' onClick={handleMenuClick} active={activeMenu === 'CONTACT'} />
            </Menu>
        </div>
    );
}

export default Header;