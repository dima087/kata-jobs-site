import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Job } from '../../types';

const API_URL = 'https://kata-jobs.onrender.com/api/jobs';

interface VacancyState {
    vacancy: Job | null;
    loading: boolean;
    error: string | null;
}

export const fetchVacancy = createAsyncThunk(
    'vacancy/fetchVacancy',
    async (id: string, { rejectWithValue }) => {
        try {
            console.log(`🔗 Запрос к API: ${API_URL}/${id}`);
            const response = await axios.get(`${API_URL}/${id}`, {
                timeout: 30000,
            });
            console.log('✅ Ответ API (вакансия):', response.data);
            return response.data;
        } catch (error: any) {
            console.error('❌ Ошибка при загрузке вакансии:', error);
            return rejectWithValue(error.message || 'Ошибка загрузки вакансии');
        }
    }
);

const initialState: VacancyState = {
    vacancy: null,
    loading: false,
    error: null,
};

const vacancySlice = createSlice({
    name: 'vacancy',
    initialState,
    reducers: {
        clearVacancy: (state) => {
            state.vacancy = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacancy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancy = action.payload;
            })
            .addCase(fetchVacancy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Ошибка загрузки';
            });
    },
});

export const { clearVacancy } = vacancySlice.actions;
export default vacancySlice.reducer;