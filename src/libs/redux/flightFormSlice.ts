import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type FlightFormState = {
    tripType: 'roundtrip' | 'oneway';
    adults: number;
    children: number;
    infants: number;
    cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
    origin: string;
    destination: string;
    date: string | null;
    returnDate: string | null;
    originSkyId: string;
    originEntityId: string;
    destinationSkyId: string;
    destinationEntityId: string;
}

const initialState: FlightFormState = {
    tripType: 'roundtrip',
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'economy',
    origin: '',
    destination: '',
    date: null,
    returnDate: null,
    originSkyId: '',
    originEntityId: '',
    destinationSkyId: '',
    destinationEntityId: ''
}


export const flightFormSlice = createSlice({
    name: 'flightForm',
    initialState,
    reducers: {
        changeValue: <T extends keyof FlightFormState>(state: FlightFormState, action: PayloadAction<{ key: T, value: FlightFormState[T] }>) => {
            state[action.payload.key] = action.payload.value
        }
    }
});

export const { changeValue } = flightFormSlice.actions
export default flightFormSlice.reducer

