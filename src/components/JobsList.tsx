import { useEffect } from 'react';
import { Stack, Pagination, Text, Loader, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, setPage } from '../store/slices/jobsSlice';
import { JobCard } from './JobCard';
import type { RootState, AppDispatch } from '../store/store';

export function JobsList() {
    const dispatch = useDispatch<AppDispatch>();
    const { jobs, total, page, loading, error, search, city, skills } = useSelector(
        (state: RootState) => state.jobs
    );

    const totalPages = Math.ceil(total / 10);

    useEffect(() => {
        dispatch(
            fetchJobs({
                page,
                limit: 10,
                search,
                city,
                skills,
            })
        );
    }, [dispatch, page, search, city, skills]);

    if (loading) {
        return (
            <Stack align="center" justify="center" style={{ minHeight: 400 }}>
                <Loader />
            </Stack>
        );
    }

    if (error) {
        return <Text c="red">Ошибка: {error}</Text>;
    }

    return (
        <Stack>
            <Text fz="xl" fw={600} mb="md">
                Список вакансий по профессии Frontend-разработчик
            </Text>

            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}

            <Group justify="center" mt="md">
                <Pagination
                    value={page}
                    onChange={(value) => dispatch(setPage(value))}
                    total={totalPages}
                />
            </Group>
        </Stack>
    );
}