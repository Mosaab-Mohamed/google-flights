import { useState } from "react";
import { Box, MenuItem, Button, Menu } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useAppDispatch, useAppSelector } from "@libs/redux/hooks";
import { changeValue } from "@libs/redux/flightFormSlice";

export default function TripTypeSelector() {
    const dispatch = useAppDispatch();
    const { tripType } = useAppSelector(state => state.flightForm);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = (type: typeof tripType) => () => {
        dispatch(changeValue({ key: 'tripType', value: type }))
        handleClose();
    }

    return (
        <Box className="trip_type">
            <Button
                startIcon={tripType === 'roundtrip' ? <CompareArrowsIcon /> : <ArrowRightAltIcon />}
                endIcon={<ArrowDropDownIcon sx={{ transform: !!open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.2s linear' }} />}
                onClick={handleClick}
                sx={{ borderBottom: '2px solid', borderColor: open ? 'primary' : 'transparent' }}
            >
                {tripType === 'roundtrip' ? 'Round trip' : 'One way'}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ sx: { width: '150px' } }}
            >
                <MenuItem onClick={handleSelect('roundtrip')} selected={tripType === 'roundtrip'}>Round trip</MenuItem>
                <MenuItem onClick={handleSelect('oneway')} selected={tripType === 'oneway'}>One way</MenuItem>
            </Menu>
        </Box>
    );
}