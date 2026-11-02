import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { JobsState } from '../../types';

const API_URL = 'https://kata-jobs.onrender.com/api/jobs';

interface FetchJobsParams {
    page: number;
    limit: number;
    search?: string;
    city?: string;
    skills?: string[];
}

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (params: FetchJobsParams) => {
        const searchParams = new URLSearchParams({
            page: params.page.toString(),
            limit: params.limit.toString(),
        });

        if (params.search) {
            searchParams.append('search', params.search);
        }

        if (params.city && params.city !== 'Все') {
            searchParams.append('city', params.city);
        }

        if (params.skills && params.skills.length > 0) {
            searchParams.append('skills', params.skills.join(','));
        }

        const response = await axios.get(`${API_URL}?${searchParams}`);
        return response.data;
    }
);

const initialState: JobsState = {
    jobs: [],
    total: 0,
    page: 1,
    loading: false,
    error: null,
    search: '',
    city: 'Все',
    skills: ['JavaScript', 'React', 'Redux', 'Python'],
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.page = 1;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
            state.page = 1;
        },
        addSkill: (state, action: PayloadAction<string>) => {
            if (!state.skills.includes(action.payload)) {
                state.skills.push(action.payload);
                state.page = 1;
            }
        },
        removeSkill: (state, action: PayloadAction<string>) => {
            state.skills = state.skills.filter(skill => skill !== action.payload);
            state.page = 1;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload.jobs || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки';
            });
    },
});

export const { setSearch, setCity, addSkill, removeSkill, setPage } = jobsSlice.actions;
export default jobsSlice.reducer;