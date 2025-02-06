import { configureStore } from '@reduxjs/toolkit'
import flightFormReducer from './flightFormSlice';
import originAirportsReducer from "./originAirportsSlice";
import destinationAirportsReducer from "./destinationAirportsSlice";
import flightsReducer from "./flightsSlice";

export const store = configureStore({
    reducer: {
        flightForm: flightFormReducer,
        originAirports: originAirportsReducer,
        destinationAirports: destinationAirportsReducer,
        flights: flightsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch