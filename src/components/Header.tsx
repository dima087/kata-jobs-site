import { Container, Group, Text, Anchor } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import classes from './Header.module.css';

export function Header() {
    return (
        <header className={classes.header}>
            <Container size="lg">
                <Group justify="space-between">
                    <Group gap="xs">
                        <div className={classes.logo}>
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
                            <div className={classes.dot} />
                        </Group>
                        <Anchor href="#" c="gray.6" className={classes.anchorWithIcon}>
                            <IconUserCircle size={18} />
                            Обо мне
                        </Anchor>
                    </Group>

                    <div className={classes.spacer} />
                </Group>
            </Container>
        </header>
    );
}