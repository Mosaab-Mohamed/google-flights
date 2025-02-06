import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInst } from "@libs/axios";
import { AxiosError } from 'axios';

type State = {
    data: any,
    loading: boolean;
    error: string | null
}

export type FlightsParams = {
    originSkyId: string;
    originEntityId: string;
    destinationSkyId: string;
    destinationEntityId: string;
    tripType: 'roundtrip' | 'oneway';
    adults: number;
    children: number;
    infants: number;
    cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
    date: string | null;
    returnDate: string | null;
}

// Define the async thunk
export const fetchFlights = createAsyncThunk(
    'flights',
    async (params: FlightsParams, { rejectWithValue }) => {
        try {
            const response = await axiosInst.get('/searchFlights', { params });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError)
                return rejectWithValue(error.response?.data.message)
        }
    }
);

const flightsSlice = createSlice({
    name: 'flights',
    initialState: {
        data: null,
        loading: false,
        error: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlights.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.data;
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
});

export default flightsSlice.reducer;

