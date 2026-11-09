import { Container, Title, Text, TextInput, Button, Group, Tabs } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { AppRoutes } from "./routes/routes.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCity } from './store/slices/jobsSlice';
import type { RootState, AppDispatch } from './store/store';
import classes from './App.module.css';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
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
    const isMoscowPage = location.pathname === '/vacancies/moscow';
    const isPetersburgPage = location.pathname === '/vacancies/petersburg';
    const isVacanciesPage = isHomePage || isMoscowPage || isPetersburgPage;

    const activeTab = isPetersburgPage ? 'petersburg' : isMoscowPage ? 'moscow' : null;

    const handleTabChange = (value: string | null) => {
        if (value === 'moscow') {
            dispatch(setCity('Москва'));
            navigate('/vacancies/moscow');
        } else if (value === 'petersburg') {
            dispatch(setCity('Санкт-Петербург'));
            navigate('/vacancies/petersburg');
        }
    };

    return (
        <>
            <Header />

            {isVacanciesPage && (
                <div className={classes.heroSection}>
                    <Container size="lg">
                        <Group justify="space-between" align="flex-start" mb="xl">
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
                                    className={classes.searchInput}
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

                        <div className={classes.tabsWrapper}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                            >
                                <Tabs.List>
                                    <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                                    <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
                                </Tabs.List>
                            </Tabs>
                        </div>
                    </Container>
                </div>
            )}

            <AppRoutes />
        </>
    );
}

export default App;