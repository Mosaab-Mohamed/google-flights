import { NavLink } from "react-router";
import { useColorScheme, Button, IconButton, Tooltip, Paper, Box, Avatar, useTheme, SvgIconProps } from "@mui/material";
import { blue } from '@mui/material/colors';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Sidebar from "@components/Layout/Sidebar";
import googleLogo from "@assets/images/google_logo.svg";
import { list1 } from "../Sidebar/navList";
import classes from "./style.module.scss";

type NavButtonProps = { text: string, Icon: React.FC<SvgIconProps>, to: string };

{/* Navigation button to be used in the header */ }
const NavButton = ({ text, Icon, to }: NavButtonProps) => {
    const { palette } = useTheme();
    return (
        <NavLink to={to} >
            {({ isActive }) => (
                <Button
                    variant="outlined"
                    startIcon={<Icon sx={{ color: blue[600] }} />}
                    sx={{
                        borderRadius: '20px',
                        color: isActive ? blue[600] : palette.text.primary,
                        backgroundColor: isActive ? blue[50] : 'transparent',
                        border: isActive ? `1px solid ${blue[50]}` : `1px solid ${palette.grey[500]}`,
                    }} >
                    {text}
                </Button>
            )}
        </NavLink>
    )
}

export default function Header() {
    const { mode, setMode } = useColorScheme();

    return (
        <header className={classes.header}>
            <Paper elevation={1} square sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 5 }}>
                {/* Left side contains toggle button and logo */}
                <Box display="flex" alignItems="center" gap={1}>
                    <Sidebar />
                    <img src={googleLogo} alt="logo" />
                </Box>

                {/* Center side contains navigation buttons */}
                <Box display='flex' gap={2} flex={1} className="web_navbar">
                    {list1.map((item, index) => (
                        <NavButton key={index} text={item.text} Icon={item.icon} to={item.to} />
                    ))}
                </Box>

                {/* Right side contains mode switcher and user avatar */}
                <Box display="flex" alignItems="center" gap={2}>
                    <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
                        <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Tooltip>
                    <Avatar sx={{ width: 34, height: 34 }} />
                </Box>
            </Paper>
        </header>
    )
}
