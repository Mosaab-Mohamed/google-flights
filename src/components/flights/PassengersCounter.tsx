
import { useState } from "react";
import { useColorScheme, Box, Button, Menu, IconButton } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch, useAppSelector } from "@libs/redux/hooks";
import { changeValue } from "@libs/redux/flightFormSlice";

type CounterProps = {
    label: string;
    value: number;
    handleChange: (value: number) => void;
    min?: number;
}

export default function PassengersCounter() {
    const dispatch = useAppDispatch();
    const { adults, children, infants } = useAppSelector(state => state.flightForm);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (key: 'adults' | 'children' | 'infants') => (value: number) => {
        dispatch(changeValue({ key, value }))
    }

    return (
        <Box className="passengers_counter">
            <Button
                startIcon={<PersonOutlineIcon />}
                endIcon={<ArrowDropDownIcon sx={{ transform: !!open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.2s linear' }} />}
                onClick={handleClick}
                sx={{ borderBottom: '2px solid', borderColor: open ? 'primary' : 'transparent' }}>
                {adults + children + infants}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ sx: { padding: '15px 15px 5px', width: '220px' } }}
            >
                <Counter label="Adults" value={adults} handleChange={handleChange('adults')} min={1} />
                <Counter label="Children" value={children} handleChange={handleChange('children')} />
                <Counter label="Infants" value={infants} handleChange={handleChange('infants')} />

            </Menu>
        </Box>
    );
}

const Counter = ({ label, value, handleChange, min = 0 }: CounterProps) => {
    const { mode } = useColorScheme();
    const add = () => handleChange(value + 1);
    const substract = () => handleChange(value - 1);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <span>{label}</span>
            <Box display="flex" alignItems="center" gap={2}>
                <IconButton size="small" onClick={substract} disabled={value === min}
                    sx={{ borderRadius: '5px', backgroundColor: value === min ? 'transparent' : (mode === 'light' ? blue[50] : blueGrey[900]) }}>
                    <RemoveIcon fontSize="small" />
                </IconButton>
                <span>{value}</span>
                <IconButton size="small" onClick={add} sx={{ borderRadius: '5px', backgroundColor: mode === 'light' ? blue[50] : blueGrey[900] }}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    )
}