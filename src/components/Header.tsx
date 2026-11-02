import { Container, Group, Text, Anchor } from '@mantine/core';

export function Header() {
    return (
        <header style={{
            backgroundColor: '#4263EB',
            padding: '16px 0',
            marginBottom: '32px'
        }}>
            <Container size="lg">
                <Group justify="space-between">
                    <Text fw={700} c="white" fz="xl">
                        .FrontEnd
                    </Text>
                    <Anchor c="white" href="#" fw={500}>
                        Вакансии FE
                    </Anchor>
                </Group>
            </Container>
        </header>
    );
}