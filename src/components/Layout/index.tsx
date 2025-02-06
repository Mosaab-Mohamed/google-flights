import { Outlet } from "react-router";
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@libs/redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from "./Header";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Layout() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ReduxProvider store={store}>
                <ThemeProvider theme={theme}>
                    <NotificationsProvider>
                        <CssBaseline />
                        <Header />
                        <Box sx={{ pt: '70px' }}>
                            <Outlet />
                        </Box>
                    </NotificationsProvider>
                </ThemeProvider>
            </ReduxProvider>
        </LocalizationProvider>
    )
};

const theme = createTheme({
    colorSchemes: {
        dark: {
            palette: {
                background: {
                    default: "#202124",
                    paper: "#36373a"
                }
            }
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                asterisk: {
                    color: 'red'
                }
            }
        }
    }
});
