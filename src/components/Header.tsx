import { Container, Group, Text, Anchor } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

export function Header() {
    return (
        <header style={{
            backgroundColor: 'white',
            borderBottom: '1px solid #e9ecef',
            padding: '12px 0',
        }}>
            <Container size="lg">
                <Group justify="space-between">
                    <Group gap="xs">
                        <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#ff4d4f',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: 13,
                        }}>
                            hh
                        </div>
                        <Text fw={700} fz="lg">
                            .FrontEnd
                        </Text>
                    </Group>

                    <Group gap="lg">
                        <Group gap="xs">
                            <Anchor href="#" c="dark" fw={500}>
                                Вакансии FE
                            </Anchor>
                            <div style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: '#4263EB',
                            }} />
                        </Group>
                        <Anchor href="#" c="gray.6" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <IconUserCircle size={18} />
                            Обо мне
                        </Anchor>
                    </Group>

                    <div style={{ width: 100 }} />
                </Group>
            </Container>
        </header>
    );
}