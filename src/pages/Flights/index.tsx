import { useColorScheme, Box, Paper, Container } from "@mui/material";
import coverLight from "@assets/images/cover_light.svg";
import coverDark from "@assets/images/cover_dark.svg";
import classes from './style.module.scss';
import PassengersCounter from "@components/flights/PassengersCounter";
import TripTypeSelector from "@components/flights/TripTypeSelectore";
import CabinClassSelector from "@components/flights/CabinClassSelector";
import LocationInputs from "@components/flights/LocationsInput";
import DateInputs from "@components/flights/DatesInput";
import SubmitButton from "@components/flights/SubmitButton";
import FlightsList from "@components/flights/FlightsList";

export default function Home() {
    const { mode } = useColorScheme();


    return (
        <Box className={classes.flights}>
            <Box sx={{ backgroundImage: `url(${mode === 'light' ? coverLight : coverDark})` }} className="cover">
                <h1>Flights</h1>
            </Box>
            <Container maxWidth="lg">
                <Paper elevation={5} sx={{ mb: '100px' }}>
                    <Box display="flex" gap={2} mb={3}>
                        <TripTypeSelector />
                        <PassengersCounter />
                        <CabinClassSelector />
                    </Box>
                    <Box display="flex" justifyContent="space-around" gap={5} className="inputs_group">
                        <LocationInputs />
                        <DateInputs />
                    </Box>
                    <SubmitButton />
                </Paper>

                <FlightsList />
            </Container>
        </Box>
    )
}

















