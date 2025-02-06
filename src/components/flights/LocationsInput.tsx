import { useRef, useEffect, useState } from "react";
import { useColorScheme, Box, IconButton, TextField, InputAdornment, CircularProgress, Menu, MenuItem } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { grey } from "@mui/material/colors";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import RoomIcon from '@mui/icons-material/Room';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAppDispatch, useAppSelector } from "@libs/redux/hooks";
import { changeValue } from "@libs/redux/flightFormSlice";
import { fetchOriginAirports } from "@libs/redux/originAirportsSlice";
import { fetchDestinationAirports } from "@libs/redux/destinationAirportsSlice";

export default function LocationInputs() {
    return (
        <Box display="flex" alignItems="center" className="location_inputs" flex={1} mb={2}>
            <OriginInput />
            <SwapButton />
            <DestinationInput />
        </Box>
    )
}

const OriginInput = () => {
    const notifications = useNotifications();
    const dispatch = useAppDispatch();
    const { flightForm: { origin }, originAirports: { data, loading, error } } = useAppSelector(state => state);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [isUserInput, setIsUserInput] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!origin || !isUserInput) return;
        const timeout = setTimeout(() => {
            dispatch(fetchOriginAirports(origin))
        }, 500)

        return () => {
            window.clearTimeout(timeout);
        }
    }, [origin]);

    useEffect(() => {
        if (data.length < 1) return;
        setAnchorEl(inputRef.current);
    }, [data]);

    useEffect(() => {
        if (!error) return;
        notifications.show(error, {
            severity: 'error',
            autoHideDuration: 5000
        })
    }, [error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUserInput(true);
        dispatch(changeValue({ key: e.target.name as 'origin', value: e.target.value }))
    }

    const handleClose = () => {
        setAnchorEl(null);
        setIsClosing(true);
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (data.length > 0 && !isClosing) {
            setAnchorEl(e.target)
        }
        setIsClosing(false)
    }

    const handleSelect = (skyTitle: string, skyId: string, entityId: string) => () => {
        setIsUserInput(false);
        dispatch(changeValue({ key: 'originSkyId', value: skyId }));
        dispatch(changeValue({ key: 'originEntityId', value: entityId }));
        dispatch(changeValue({ key: 'origin', value: skyTitle }));
        handleClose();
    }

    return (
        <>
            <TextField
                label="Departure airport"
                required
                ref={inputRef}
                name="origin"
                placeholder="Where from?"
                fullWidth
                onFocus={handleFocus}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationSearchingIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {loading ? <CircularProgress size={20} /> : null}
                            </InputAdornment>
                        ),
                        sx: { pr: '20px' },

                    },
                }}

                sx={{ mr: '-15px' }}
                value={origin}
                onChange={handleChange}
            />
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
            >
                {data?.map((item: any, index: any) => {
                    const { skyId, entityId, presentation: { title } } = item;
                    return <MenuItem key={index} onClick={handleSelect(title, skyId, entityId)}>{title}</MenuItem>
                })}
            </Menu>
        </>
    )
}

const DestinationInput = () => {
    const notifications = useNotifications();
    const dispatch = useAppDispatch();
    const { flightForm: { destination }, destinationAirports: { data, loading, error } } = useAppSelector(state => state);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [isUserInput, setIsUserInput] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!destination || !isUserInput) return;
        const timeout = setTimeout(async () => {
            dispatch(fetchDestinationAirports(destination));
        }, 500)

        return () => {
            window.clearTimeout(timeout);
        }
    }, [destination]);

    useEffect(() => {
        if (data.length < 1) return;
        setAnchorEl(inputRef.current);
    }, [data])

    useEffect(() => {
        if (!error) return;
        notifications.show(error, {
            severity: 'error',
            autoHideDuration: 5000
        })
    }, [error])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUserInput(true);
        dispatch(changeValue({ key: e.target.name as 'destination', value: e.target.value }))
    }

    const handleClose = () => {
        setAnchorEl(null);
        setIsClosing(true);
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (data.length > 0 && !isClosing) {
            setAnchorEl(e.target)
        }
        setIsClosing(false)
    }

    const handleSelect = (skyTitle: string, skyId: string, entityId: string) => () => {
        setIsUserInput(false);
        dispatch(changeValue({ key: 'destinationSkyId', value: skyId }));
        dispatch(changeValue({ key: 'destinationEntityId', value: entityId }));
        dispatch(changeValue({ key: 'destination', value: skyTitle }));
        handleClose();
    }

    return (
        <>
            <TextField
                label="Arrival airport"
                required
                ref={inputRef}
                name="destination"
                placeholder="Where to?"
                fullWidth
                onFocus={handleFocus}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <RoomIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {loading ? <CircularProgress size={20} /> : null}
                            </InputAdornment>
                        ),
                        sx: { pl: '20px' }
                    },
                    inputLabel: {

                    }
                }}
                sx={{ ml: '-15px' }}
                value={destination}
                onChange={handleChange}
            />
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
            >
                {data?.map((item: any, index: any) => {
                    const { skyId, entityId, presentation: { title } } = item;
                    return <MenuItem key={index} onClick={handleSelect(title, skyId, entityId)}>{title}</MenuItem>
                })}
            </Menu>
        </>
    )
}

const SwapButton = () => {
    const dispatch = useAppDispatch();
    const { origin, destination } = useAppSelector(state => state.flightForm)
    const { mode } = useColorScheme();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const isLightMode = mode === 'light';

    const handleSwap = () => {
        if (buttonRef.current) {
            const currentTransform = buttonRef.current.style.transform;
            buttonRef.current.style.transform = currentTransform !== 'rotate(180deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        const temp = origin;
        dispatch(changeValue({ key: 'origin', value: destination }))
        dispatch(changeValue({ key: 'destination', value: temp }))
    }

    return (
        <IconButton
            ref={buttonRef}
            size="small"
            onClick={handleSwap}
            sx={{
                border: `1px solid ${isLightMode ? grey[400] : grey[700]}`,
                backgroundColor: isLightMode ? 'white' : '#4a4b4e',
                ":hover": { backgroundColor: isLightMode ? 'white' : "#4a4b4e" }
            }}

        >
            <SwapHorizIcon />
        </IconButton>
    )
}

