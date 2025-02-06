
import { useEffect } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import { useAppSelector } from "@libs/redux/hooks";

export default function FlightsList() {
    const { data, loading } = useAppSelector(state => state.flights);

    useEffect(() => {
        if (!data) return;
        window.scrollTo({ left: 0, top: 300, behavior: 'smooth' })
    }, [data])

    if (loading) return <ListLoader />
    if (!data) return null;
    if (data.itineraries.length < 1) return <Typography variant="h5" textAlign='center' mb={3}>No flights found</Typography>

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} hr ${mins} min`;
    };

    return (
        <Box border="1px solid gray" borderRadius="10px" mb="50px">
            {(data as FlightsData).itineraries.map((itinerary, index) => {
                const leg = itinerary.legs[0];
                const originName = leg.origin.name;
                const destinationName = leg.destination.name;
                const price = itinerary.price.raw;
                const airlineLogo = leg.carriers.marketing[0].logoUrl;
                const airlineNames = leg.carriers.marketing.map(m => m.name).join(', ');
                const totalDuration = formatDuration(leg.durationInMinutes);
                const departureTime = new Date(leg.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const arrivalTime = new Date(leg.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const stopsCount = leg.stopCount;
                const stops = leg.segments.map(segment => segment.destination.name).join(', ');

                return (
                    <Box py={3}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        justifyContent="space-between"
                        borderBottom={index === data.itineraries.length - 1 ? "none" : "1px solid gray"}
                        className="flight_itinerary"
                    >
                        <Box flex={1} textAlign="center">
                            <img src={airlineLogo} alt="Airline Image" className="airline_logo" />
                        </Box>
                        <Box flex={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" className="mobile_hide">
                            <Typography variant='body1' fontWeight={500}>{departureTime} - {arrivalTime} </Typography>
                            <Typography variant='body2' color="textDisabled">{airlineNames}</Typography>
                        </Box>
                        <Box flex={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                            <Typography variant='body1' fontWeight={500} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{totalDuration} <AccessTimeIcon fontSize="small" /></Typography>
                            <Typography variant='body2' color="textDisabled">{originName} - {destinationName}</Typography>
                        </Box>
                        <Box flex={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" className="mobile_hide">
                            <Typography variant='body1' fontWeight={500}>{stopsCount} Stops</Typography>
                            <Typography variant='body2' color="textDisabled">{stops} </Typography>
                        </Box>
                        <Box flex={1} >
                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{price} <PaidIcon fontSize="small" /></Typography>
                        </Box>

                    </Box>)
            })}
        </Box>
    )
}

const ListLoader = () => (
    <Box mb={5}>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
    </Box>
)

type FlightsData = {
    context: {
        status: string;
        totalResults: number;
    };
    itineraries: Itinerary[];
    messages: any[]; // Replace `any` with a specific type if messages have a known structure
    filterStats: {
        duration: {
            min: number;
            max: number;
            multiCityMin: number;
            multiCityMax: number;
        };
        airports: {
            city: string;
            airports: {
                id: string;
                entityId: string;
                name: string;
            }[];
        }[];
        carriers: {
            id: number;
            alternateId: string;
            logoUrl: string;
            name: string;
        }[];
        stopPrices: {
            direct: {
                isPresent: boolean;
            };
            one: {
                isPresent: boolean;
                formattedPrice: string;
            };
            twoOrMore: {
                isPresent: boolean;
                formattedPrice: string;
            };
        };
    };
    flightsSessionId: string;
    destinationImageUrl: string;
};


type Itinerary = {
    id: string;
    price: {
        raw: number;
        formatted: string;
        pricingOptionId: string;
    };
    legs: Leg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: {
        isChangeAllowed: boolean;
        isPartiallyChangeable: boolean;
        isCancellationAllowed: boolean;
        isPartiallyRefundable: boolean;
    };
    fareAttributes: Record<string, unknown>; // Replace with a specific type if known
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
};

type Leg = {
    id: string;
    origin: Location;
    destination: Location;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
        marketing: Carrier[];
        operationType: string;
    };
    segments: Segment[];
};

type Segment = {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Carrier;
    operatingCarrier: Carrier;
};

type Location = {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
};

type FlightPlace = {
    flightPlaceId: string;
    displayCode: string;
    parent: {
        flightPlaceId: string;
        displayCode: string;
        name: string;
        type: string;
    };
    name: string;
    type: string;
    country: string;
};

type Carrier = {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
    displayCode: string;
    logoUrl?: string; // Optional, as it appears in some places but not others
};
