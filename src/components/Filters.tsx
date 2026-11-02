import { useState } from 'react';
import {
    TextInput,
    Select,
    Pill,
    Input,
    ActionIcon,
    Group,
    Box,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCity, addSkill, removeSkill } from '../store/slices/jobsSlice';
import type { RootState } from '../store/store';

export function Filters() {
    const dispatch = useDispatch();
    const { search, city, skills } = useSelector((state: RootState) => state.jobs);
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
        <Box mb="xl">
            <Group mb="md">
                <TextInput
                    placeholder="Поиск по вакансии или компании"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    style={{ flex: 1 }}
                />

                <Select
                    value={city}
                    onChange={(value) => value && dispatch(setCity(value))}
                    data={['Все', 'Москва', 'Санкт-Петербург']}
                    style={{ width: 200 }}
                />
            </Group>

            <Input
                component="div"
                multiline
                label="Ключевые навыки"
                rightSection={
                    <ActionIcon onClick={handleAddSkill} variant="filled">
                        <IconPlus />
                    </ActionIcon>
                }
                rightSectionWidth={42}
            >
                <Pill.Group>
                    {skills.map((skill) => (
                        <Pill
                            key={skill}
                            withRemoveButton
                            onRemove={() => dispatch(removeSkill(skill))}
                        >
                            {skill}
                        </Pill>
                    ))}
                    <Pill.Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder=""
                    />
                </Pill.Group>
            </Input>
        </Box>
    );
}