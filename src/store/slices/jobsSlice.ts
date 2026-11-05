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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, maxRetries = 3, retryDelay = 2000) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            console.log(`🔄 Попытка ${attempt + 1} из ${maxRetries}`);
            const response = await axios.get(url, {
                timeout: 30000,
                headers: { 'Accept': 'application/json' }
            });
            return response.data;
        } catch (error: any) {
            console.warn(`⚠️ Попытка ${attempt + 1} не удалась:`, error.message);
            if (attempt === maxRetries - 1) {
                throw error;
            }
            await delay(retryDelay);
        }
    }
};

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (params: FetchJobsParams, { rejectWithValue }) => {
        try {
            const searchParams = new URLSearchParams({
                page: params.page.toString(),
                limit: params.limit.toString(),
            });

            if (params.search) {
                searchParams.append('search', params.search);
            }

            if (params.city && params.city !== 'Все города') {
                searchParams.append('city', params.city);
            }

            if (params.skills && params.skills.length > 0) {
                searchParams.append('skills', params.skills.join(','));
            }

            const url = `${API_URL}?${searchParams.toString()}`;
            console.log('🔗 Запрос к API:', url);

            const data = await fetchWithRetry(url);
            console.log('✅ Ответ API:', data);

            return data;
        } catch (error: any) {
            console.error(' Ошибка API после всех попыток:', error);

            if (error.code === 'ECONNABORTED') {
                return rejectWithValue('Сервер не отвечает. Попробуйте обновить страницу через минуту.');
            }

            return rejectWithValue(error.message || 'Ошибка загрузки данных');
        }
    }
);

const initialState: JobsState = {
    jobs: [],
    total: 0,
    page: 1,
    loading: false,
    error: null,
    search: '',
    city: 'Все города',
    skills: ['JavaScript', 'React', 'Redux', 'ReduxToolkit', 'Nextjs'],
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
                const data = action.payload;

                console.log('📦 Структура ответа:', data);

                // API возвращает { jobs: [], pagination: {...}, success: true }
                if (data && data.jobs && Array.isArray(data.jobs)) {
                    state.jobs = data.jobs;
                    state.total = data.pagination?.totalItems || data.jobs.length;
                } else if (Array.isArray(data)) {
                    state.jobs = data;
                    state.total = data.length;
                } else {
                    console.warn('⚠️ Неизвестный формат ответа:', data);
                    state.jobs = [];
                    state.total = 0;
                }
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Ошибка загрузки';
                console.error('❌ Ошибка в reducer:', action.payload);
            });
    },
});

export const { setSearch, setCity, addSkill, removeSkill, setPage } = jobsSlice.actions;
export default jobsSlice.reducer;