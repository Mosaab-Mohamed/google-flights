import { useEffect } from 'react';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useAppSelector, useAppDispatch } from "@libs/redux/hooks";
import { fetchFlights, FlightsParams } from '@libs/redux/flightsSlice';

export default function SubmitButton() {
    const dispatch = useAppDispatch();
    const notifications = useNotifications();
    const { flightForm, flights: { loading, error } } = useAppSelector(state => state);

    useEffect(() => {
        if (!error) return;
        notifications.show(error, {
            severity: 'error',
            autoHideDuration: 5000
        })
    }, [error]);

    const handleSubmit = () => {
        const _form: FlightsParams & { origin?: string; destination?: string; } = { ...flightForm };
        delete _form.origin;
        delete _form.destination;

        if (!_form.originSkyId || !_form.destinationSkyId || !_form.date || (_form.tripType === 'roundtrip' && !_form.returnDate)) {
            notifications.show('Please enter the required info', {
                severity: 'error',
                autoHideDuration: 4000,
            })
            return;
        }
        dispatch(fetchFlights(_form));
    }


    return (
        <Button
            variant="contained"
            startIcon={<SearchIcon />}
            size="large"
            className="explore_button"
            loading={loading}
            loadingPosition="start"
            onClick={handleSubmit}
            sx={{
                ":disabled": {
                    backgroundColor: 'inherit',
                    boxShadow: '0px 1px 10px 1px #39393947'
                }
            }}
        >
            Explore
        </Button>

    )
}
