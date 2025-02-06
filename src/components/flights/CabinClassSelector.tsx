import { useState } from "react";
import { Box, MenuItem, Button, Menu } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch, useAppSelector } from "@libs/redux/hooks";
import { changeValue } from "@libs/redux/flightFormSlice";

export default function CabinClassSelector() {
    const dispatch = useAppDispatch();
    const { cabinClass } = useAppSelector(state => state.flightForm);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = (type: typeof cabinClass) => () => {
        dispatch(changeValue({ key: 'cabinClass', value: type }))
        handleClose();
    }

    const flightClasses: { label: string, value: typeof cabinClass }[] = [
        { label: 'Economy', value: 'economy' },
        { label: 'Business', value: 'business' },
        { label: 'First', value: 'first' },
        { label: 'Premium Economy', value: 'premium_economy' }
    ]

    return (
        <Box className="flight_class">
            <Button
                endIcon={<ArrowDropDownIcon sx={{ transform: !!open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.2s linear' }} />}
                onClick={handleClick}
                sx={{ borderBottom: '2px solid', borderColor: open ? 'primary' : 'transparent' }}
            >
                {flightClasses.find(f => f.value === cabinClass)?.label}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {flightClasses.map(f => (
                    <MenuItem key={f.value} onClick={handleSelect(f.value)} selected={cabinClass === f.value}>
                        {f.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}