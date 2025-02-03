import { useColorScheme, Box } from "@mui/material";
import coverLight from "@assets/images/cover_light.svg";
import coverDark from "@assets/images/cover_dark.svg";

export default function Hotels() {
    const { mode } = useColorScheme();

    return (
        <Box textAlign={'center'} >
            <img src={mode === 'light' ? coverLight : coverDark} alt="cover" />
            <h1>Hotels</h1>
        </Box>
    )
}
