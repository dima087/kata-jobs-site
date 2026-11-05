import { useEffect } from 'react';
import { Stack, Pagination, Loader, Group, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, setPage } from '../store/slices/jobsSlice';
import { JobCard } from './JobCard';
import type { RootState, AppDispatch } from '../store/store';

export function JobsList() {
    const dispatch = useDispatch<AppDispatch>();
    const { jobs, total, page, loading, error, search, city, skills } = useSelector(
        (state: RootState) => state.jobs
    );

    const totalPages = Math.max(1, Math.ceil(total / 10));

    useEffect(() => {
        dispatch(
            fetchJobs({
                page,
                limit: 10,
                search: search || undefined,
                city: city === 'Все города' ? undefined : city,
                skills: skills.length > 0 ? skills : undefined,
            })
        );
    }, [dispatch, page, search, city, skills]);

    if (loading) {
        return (
            <Stack align="center" justify="center" style={{ minHeight: 400 }}>
                <Loader size="lg" />
                <Text mt="md" c="dimmed">Загрузка вакансий...</Text>
            </Stack>
        );
    }

    if (error) {
        return (
            <Stack align="center" justify="center" style={{ minHeight: 400 }}>
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Ошибка загрузки"
                    color="red"
                    variant="light"
                >
                    {error}
                </Alert>
                <Text c="dimmed" size="sm" mt="md">Проверьте подключение к интернету</Text>
            </Stack>
        );
    }

    if (jobs.length === 0) {
        return (
            <Stack align="center" justify="center" style={{ minHeight: 400 }}>
                <Text c="dimmed" fz="lg">Вакансии не найдены</Text>
                <Text c="dimmed" size="sm">Попробуйте изменить параметры поиска</Text>
            </Stack>
        );
    }

    return (
        <Stack>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}

            {totalPages > 1 && (
                <Group justify="center" mt="md">
                    <Pagination
                        value={page}
                        onChange={(value) => dispatch(setPage(value))}
                        total={totalPages}
                    />
                </Group>
            )}
        </Stack>
    );
}