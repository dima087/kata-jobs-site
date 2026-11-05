import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Group, Stack, Loader, Alert } from '@mantine/core';
import axios from 'axios';
import classes from './Vacancy.module.css';

export function Vacancy() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `https://kata-jobs.onrender.com/api/jobs/${id}`;
                const response = await axios.get(url);

                let jobData = response.data;

                if (response.data.job) {
                    jobData = response.data.job;
                } else if (response.data.data) {
                    jobData = response.data.data;
                } else if (Array.isArray(response.data)) {
                    jobData = response.data[0];
                }

                setJob(jobData);
            } catch (err: any) {
                console.error('Ошибка загрузки вакансии:', err);
                setError(err.message || 'Не удалось загрузить вакансию');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchVacancy();
        }
    }, [id]);

    if (loading) {
        return (
            <Container size="lg" py="xl">
                <Stack align="center" justify="center" style={{ minHeight: 400 }}>
                    <Loader size="lg" />
                    <p style={{ color: '#868e96', marginTop: 16 }}>Загрузка вакансии...</p>
                </Stack>
            </Container>
        );
    }

    if (error || !job) {
        return (
            <Container size="lg" py="xl">
                <Alert title="Ошибка загрузки" color="red" variant="light" mb="xl">
                    {error || 'Вакансия не найдена'}
                </Alert>
                <Group>
                    <a
                        className={classes.backButton}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}
                    >
                        ← Назад к списку вакансий
                    </a>
                </Group>
            </Container>
        );
    }

    const salaryNumber = job.salary
        ? (typeof job.salary === 'string' ? parseInt(job.salary, 10) : Number(job.salary))
        : null;

    return (
        <Container size="lg" className={classes.page}>
            <Group mb="xl">
                <a
                    className={classes.backButton}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}
                >
                    ← Назад к списку вакансий
                </a>
            </Group>

            <div className={classes.card}>
                <h1 className={classes.title}>
                    {job.name || job.title || 'Название вакансии не указано'}
                </h1>

                <div className={classes.salaryRow}>
                    {salaryNumber && salaryNumber > 0 ? (
                        <span className={classes.salary}>
                            {salaryNumber.toLocaleString('ru-RU')} ₽
                        </span>
                    ) : (
                        <span className={classes.salaryNotSpecified}>Зарплата не указана</span>
                    )}

                    {job.experience && (
                        <span className={classes.experience}>
                            {job.experience}
                        </span>
                    )}
                </div>

                {job.company_name && (
                    <p className={classes.companyName}>
                        {job.company_name}
                    </p>
                )}

                {job.city && (
                    <p className={classes.city}>
                        {job.city}
                    </p>
                )}
            </div>

            {job.about_company && (
                <div className={classes.card}>
                    <h2 className={classes.sectionTitle}>
                        Компания
                    </h2>
                    <p className={classes.description}>
                        {job.about_company}
                    </p>
                </div>
            )}

            {job.description && (
                <div className={classes.card}>
                    <h2 className={classes.sectionTitle}>
                        О вакансии:
                    </h2>
                    <p className={classes.description}>
                        {job.description}
                    </p>
                </div>
            )}
        </Container>
    );
}