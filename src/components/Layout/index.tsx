import { Outlet } from "react-router";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";
import Header from "@components/Header";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        }
    }
});

export default function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Box sx={{ pt: '70px' }}>
                <Outlet />
            </Box>
        </ThemeProvider>
    )
}
