import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInst } from "@libs/axios";
import { AxiosError } from 'axios';

type State = {
    data: any[],
    loading: boolean;
    error: string | null
}

// Define the async thunk
export const fetchDestinationAirports = createAsyncThunk(
    'airports/destination',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await axiosInst.get(`/searchAirport?query=${query}`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError)
                return rejectWithValue(error.response?.data.message)
        }
    }
);

const destinationAiroportsSlice = createSlice({
    name: 'destinationAirports',
    initialState: {
        data: [],
        loading: false,
        error: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinationAirports.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchDestinationAirports.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.data;
            })
            .addCase(fetchDestinationAirports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
});

export default destinationAiroportsSlice.reducer;