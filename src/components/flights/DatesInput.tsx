import { Box } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@libs/redux/hooks";
import { changeValue } from "@libs/redux/flightFormSlice";

export default function DateInputs() {
    const dispatch = useAppDispatch();
    const { tripType, date, returnDate } = useAppSelector(state => state.flightForm);

    const handleDateChange = (key: 'date' | 'returnDate') => (date: Dayjs | null) => {
        dispatch(changeValue({ key, value: date?.format('YYYY-MM-DD') || null }))
    };

    return (
        <Box display="flex" gap="5px" flex={1}>
            <DatePicker
                label="Departure"
                disablePast
                format="MMMM D, YYYY"
                slotProps={{ textField: { fullWidth: true, required: true } }}
                value={date ? dayjs(date) : null}
                onChange={handleDateChange('date')}
            />
            {tripType === 'roundtrip' && <DatePicker
                label="Return"
                disablePast
                format="MMMM D, YYYY"
                slotProps={{ textField: { fullWidth: true, required: true } }}
                value={returnDate ? dayjs(returnDate) : null}
                onChange={handleDateChange('returnDate')}

            />}
        </Box>
    )
}