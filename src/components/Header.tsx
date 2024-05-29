import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Box, Breadcrumbs, Button, Link as MuiLink, Menu, MenuItem, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
    const router = useRouter();
    const [pathnames, setPathnames] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const paths = router.pathname.split('/').filter((x) => x);
        setPathnames(paths);
        setMounted(true); // Indicate that the component has mounted
    }, [router.pathname]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    if (!mounted) {
        return null; // Render nothing on the server
    }

    return (
        <Box sx={{padding: 2, backgroundColor: '#f5f5f5'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link href="/" passHref>
                        <MuiLink underline="hover" color="inherit">
                            Home
                        </MuiLink>
                    </Link>
                    {pathnames.map((value, index) => {
                        const last = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                        return last ? (
                            <Typography color="textPrimary" key={to}>
                                {value}
                            </Typography>
                        ) : (
                            <Link href={to} passHref key={to}>
                                <MuiLink underline="hover" color="inherit">
                                    {value}
                                </MuiLink>
                            </Link>
                        );
                    })}
                </Breadcrumbs>
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
