import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

//create width of the blue bar
const drawerWidth = 240;
//create elements within the bar that we want to click on
const navItems = ['Home', 'Playlists', 'Policies'];

//create Navbar function to use as component
export default function NavBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    //create styling and mapping items to assigned location
    const drawer = (
        // create box with button 
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            {/* textbox area */}
            <Typography variant="h6" sx={{ my: 2 }}>
                Fullstack MusicApp
            </Typography>
            <Divider />
            <List>
                {/* map the desired element and add styling */}
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <Link to={"/" + item}
                            style={{ textDecoration: 'none' }}
                        >
                            <ListItemButton
                                sx={{ textAlign: 'center', color: '#000000' }}
                            >
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        //create box to display the menu items
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Fullstack MusicApp
                    </Typography>
                    {/* sizing and styling */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link to={"/" + item}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button key={item} sx={{ color: '#fff' }}>
                                    {item}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Dropdown />
                </Toolbar>
            </AppBar>
            {/* moblie component, for when sizing becomes smaller */}
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography>

                </Typography>
            </Box>
        </Box>
    );
}

