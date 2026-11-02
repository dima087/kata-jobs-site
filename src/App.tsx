import { Container } from '@mantine/core';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { JobsList } from './components/JobsList';

function App() {
    return (
        <>
            <Header />
            <Container size="lg" pb="xl">
                <Filters />
                <JobsList />
            </Container>
        </>
    );
}

export default App;