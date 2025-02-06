import { useState } from 'react'
import { NavLink } from 'react-router';
import { Box, Drawer, IconButton, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconProps, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { blue } from '@mui/material/colors';
import googleLogo from "@assets/images/google_logo.svg";
import { list1, list2 } from './navList';

type ListItem = {
    text: string;
    icon: React.FC<SvgIconProps>;
    to: string
};

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const { palette } = useTheme();

    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

    // Render list items with icons and text from the list array
    const renderList = (list: ListItem[]) => {
        return <List>
            {list.map((item, index) => (
                <NavLink to={item.to} key={index}>
                    {({ isActive }) => (
                        <ListItem disablePadding>
                            <ListItemButton sx={{ backgroundColor: isActive ? blue[50] : 'transparent', borderRadius: isActive ? '0 24px 24px 0' : '0' }}>
                                <ListItemIcon>
                                    <item.icon sx={{ color: isActive ? blue[600] : 'inherit' }} />
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ color: isActive ? blue[600] : palette.text.primary }} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </NavLink>
            ))}
        </List>
    }

    {/* Drawer component */ }
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Box display="flex" justifyContent="space-between" p={1}>
                <img src={googleLogo} alt="logo" />
                <IconButton>
                    <KeyboardArrowLeftIcon />
                </IconButton>
            </Box>
            <Divider />
            {renderList(list1)}
            <Divider />
            {renderList(list2)}
        </Box>
    );

    return (
        <>
            <IconButton onClick={toggleDrawer(!open)}>
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}
