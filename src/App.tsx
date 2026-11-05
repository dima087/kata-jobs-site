import { Container, Title, Text, TextInput, Button, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { AppRoutes } from "./routes/routes.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from './store/slices/jobsSlice';
import type { RootState, AppDispatch } from './store/store';

function App() {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useSelector((state: RootState) => state.jobs);
    const [searchInput, setSearchInput] = useState(search);

    const handleSearch = () => {
        dispatch(setSearch(searchInput));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header />

            {isHomePage && (
                <div style={{ backgroundColor: '#f8f9fa', padding: '32px 0', borderBottom: '1px solid #e9ecef' }}>
                    <Container size="lg">
                        <Group justify="space-between" align="flex-start">
                            <div>
                                <Title order={2} fw={700} mb={4}>
                                    Список вакансий
                                </Title>
                                <Text c="gray.6" fz="lg">
                                    по профессии Frontend-разработчик
                                </Text>
                            </div>
                            <Group>
                                <TextInput
                                    placeholder="Должность или название компании"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    leftSection={<IconSearch size={16} />}
                                    style={{ width: 320 }}
                                />
                                <Button
                                    onClick={handleSearch}
                                    color="#4263EB"
                                    size="md"
                                >
                                    Найти
                                </Button>
                            </Group>
                        </Group>
                    </Container>
                </div>
            )}

            <AppRoutes />
        </>
    );
}

export default App;