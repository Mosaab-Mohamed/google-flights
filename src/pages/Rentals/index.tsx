import { useColorScheme, Box } from "@mui/material";
import coverLight from "@assets/images/cover_light.svg";
import coverDark from "@assets/images/cover_dark.svg";

export default function Rentals() {
    const { mode } = useColorScheme();

    return (
        <Box textAlign={'center'} >
            <img src={mode === 'light' ? coverLight : coverDark} alt="cover" />
            <h1>Vacation Rentals</h1>
        </Box>
    )
}
