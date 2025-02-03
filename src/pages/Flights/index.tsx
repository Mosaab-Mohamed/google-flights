import { useColorScheme, Box } from "@mui/material";
import coverLight from "@assets/images/cover_light.svg";
import coverDark from "@assets/images/cover_dark.svg";

export default function Home() {
    const { mode } = useColorScheme();

    return (
        <Box textAlign={'center'} >
            <img src={mode === 'light' ? coverLight : coverDark} alt="cover" />
            <h1>Flights</h1>
        </Box>
    )
}
