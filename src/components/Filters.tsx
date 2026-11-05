import { useState } from 'react';
import {
    Pill,
    Box,
    Text,
    Button,
    Paper,
    Select,
    Group,
    TextInput,
} from '@mantine/core';
import { IconPlus, IconMapPin } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, addSkill, removeSkill } from '../store/slices/jobsSlice';
import type { RootState, AppDispatch } from '../store/store';

export function Filters() {
    const dispatch = useDispatch<AppDispatch>();
    const { city, skills } = useSelector((state: RootState) => state.jobs);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            dispatch(addSkill(newSkill.trim()));
            setNewSkill('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    return (
        <Box>
            <Paper p="xl" withBorder radius="md" mb="md">
                <Text fw={600} fz={24} mb="lg">Ключевые навыки</Text>

                <Group mb="lg" gap="sm" align="flex-start">
                    <TextInput
                        placeholder="Навык"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ flex: 1 }}
                        size="lg"
                    />
                    <Button
                        onClick={handleAddSkill}
                        variant="filled"
                        color="#A5D8FF"
                        size="lg"
                        style={{
                            borderRadius: 12,
                            width: 56,
                            height: 46,
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <IconPlus size={24} color="white" />
                    </Button>
                </Group>

                <Group gap="sm" wrap="wrap">
                    {skills.map((skill) => (
                        <Pill
                            key={skill}
                            size="xl"
                            withRemoveButton
                            onRemove={() => dispatch(removeSkill(skill))}
                        >
                            {skill}
                        </Pill>
                    ))}
                </Group>
            </Paper>

            <Paper p="md" withBorder radius="md">
                <Select
                    value={city}
                    onChange={(value) => value && dispatch(setCity(value))}
                    data={['Все города', 'Москва', 'Санкт-Петербург']}
                    placeholder="Все города"
                    leftSection={<IconMapPin size={18} color="#868e96" />}
                    size="md"
                />
            </Paper>
        </Box>
    );
}