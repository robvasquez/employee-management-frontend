import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Box, Button, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header: React.FC = () => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Indicate that the component has mounted
    }, []);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleBackClick = () => {
        router.back();
    };

    if (!mounted) {
        return null; // Render nothing on the server
    }

    return (
        <Box sx={{padding: 2, backgroundColor: '#f5f5f5'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {router.pathname !== '/' && (
                    <Button startIcon={<ArrowBackIcon/>} onClick={handleBackClick}>
                        Back
                    </Button>
                )}
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    startIcon={<MenuIcon/>}
                >
                    Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <Link href="/" passHref>
                        <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                    </Link>
                    <Link href="/employees" passHref>
                        <MenuItem onClick={handleMenuClose}>Employees</MenuItem>
                    </Link>
                </Menu>
            </Box>
        </Box>
    );
};

export default Header;
