import FlightIcon from '@mui/icons-material/Flight';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HotelIcon from '@mui/icons-material/Hotel';
import HouseIcon from '@mui/icons-material/House';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LanguageIcon from '@mui/icons-material/Language';
import PaidIcon from '@mui/icons-material/Paid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import urls from '@utils/urls';

export const list1 = [{
    text: 'Explore',
    icon: TravelExploreIcon,
    to: urls.explore
}, {
    text: 'Flights',
    icon: FlightIcon,
    to: urls.flights
}, {
    text: 'Hotels',
    icon: HotelIcon,
    to: urls.hotels
}, {
    text: 'Vacation rentals',
    icon: HouseIcon,
    to: urls.rentals
}]

export const list2 = [{
    text: 'Tracked flight prices',
    icon: ShowChartIcon,
    to: urls.flight_prices

}, {
    text: 'Change language',
    icon: LanguageIcon,
    to: urls.language
}, {
    text: 'Change currency',
    icon: PaidIcon,
    to: urls.currency
}, {
    text: 'Change Location',
    icon: LocationOnIcon,
    to: urls.location
}];