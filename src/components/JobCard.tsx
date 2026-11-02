import { Paper, Text, Badge, Button } from '@mantine/core';
import { Job } from '../types';

interface JobCardProps {
    job: Job;
}

const workFormatLabels = {
    remote: 'Можно удалённо',
    office: 'Офис',
    hybrid: 'Гибрид',
};

const workFormatColors = {
    remote: 'blue',
    office: 'green',
    hybrid: 'orange',
};

export function JobCard({ job }: JobCardProps) {
    return (
        <Paper
            p="md"
            withBorder
            radius="md"
            style={{ marginBottom: '16px' }}
        >
            <Text fw={500} fz="lg" c="#4263EB" mb="xs">
                {job.title}
            </Text>

            <Text c="dimmed" size="sm" mb="xs">
                {job.salary.toLocaleString()} ₽ • {job.experience}
            </Text>

            <Badge
                color={workFormatColors[job.workFormat]}
                size="sm"
                mb="xs"
            >
                {workFormatLabels[job.workFormat]}
            </Badge>

            <Text size="sm" mb="xs">{job.company}</Text>
            <Text c="dimmed" size="sm" mb="md">
                {job.city}
            </Text>

            <Button
                size="compact-sm"
                color="dark"
                variant="filled"
            >
                Смотреть вакансию
            </Button>
        </Paper>
    );
}