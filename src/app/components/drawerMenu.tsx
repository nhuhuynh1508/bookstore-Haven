import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import * as React from 'react';

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {[
                { text: 'Home', icon: <HomeIcon />, href: '/' },
                { text: 'To-do List', icon: <ChecklistIcon/>, href: '/to-do-list' },
            ].map((item, index) => (
                <Link href={item.href} key={index}>
                <ListItem key={item.text} disablePadding>
                
                    <ListItemButton>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    </ListItemButton>
                
                </ListItem>
                </Link>
            ))}
        </List>

        <Divider />
        <List>
            {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))} */}
            {[
                { text: 'Mail', icon: <MailIcon/>, href: 'https://mail.google.com/' },
            ].map((item, index) => (
                <Link href={item.href} key={index}>
                <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
                </Link>
            ))}
        </List>
        </Box>
    );

    return (
        <div>
        <Button onClick={toggleDrawer(true)}><MenuIcon color="action"/></Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
        </div>
    );
}
