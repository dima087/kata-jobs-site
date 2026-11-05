import { Paper, Text, Badge, Button } from '@mantine/core';
import {useNavigate} from 'react-router-dom';

import { Job } from '../types';

interface JobCardProps {
    job: Job;
}

const workFormatLabels: Record<string, string> = {
    remote: 'можно удалённо',
    office: 'офис',
    hybrid: 'гибрид',
};

export function JobCard({ job }: JobCardProps) {
    const workFormat = job.workFormat || job.work_format || 'office';
    const isRemote = workFormat === 'remote';
    const navigate = useNavigate();

    const salaryNumber = typeof job.salary === 'string'
        ? parseInt(job.salary, 10)
        : job.salary;

    return (
      <>
        <Paper
            p="xl"
            radius="md"
            mb="md"
            style={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
            }}
        >
            <Text
                fw={700}
                fz={22}
                c="#4263EB"
                mb="xs"
            >
                {job.name}
            </Text>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <Text fz={18} fw={600} c="#212529">
                    {salaryNumber.toLocaleString('ru-RU')} ₽
                </Text>
                {job.experience && (
                    <Text fz={16} c="#868e96">
                        {job.experience}
                    </Text>
                )}
            </div>

            {job.company_name && (
                <Text c="#868e96" size="md" mb="sm">
                    {job.company_name}
                </Text>
            )}

            {workFormat && workFormat !== 'undefined' && (
                <Badge
                    size="sm"
                    mb="sm"
                    variant="filled"
                    style={{
                        backgroundColor: isRemote ? '#4263EB' : '#e9ecef',
                        color: isRemote ? 'white' : '#495057',
                        textTransform: 'lowercase',
                        fontWeight: 600,
                        padding: '4px 10px',
                    }}
                >
                    {workFormatLabels[workFormat] || workFormat}
                </Badge>
            )}

            <Text fz={16} c="#212529" mb="xl">
                {job.city}
            </Text>

            <Button
                size="sm"
                color="dark"
                variant="filled"
                onClick={() => navigate(`/vacancy/${job.id}`)}
            >
                Смотреть вакансию
            </Button>
        </Paper>
      </>
    );
}