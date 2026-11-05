import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import vacancyReducer from './slices/vacancySlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        vacancy: vacancyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;