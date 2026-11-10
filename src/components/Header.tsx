import { Container, Group, Text, } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
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
                        <NavLink
                            to="/vacancies"
                            className={({ isActive }) =>
                                isActive ? classes.activeLink : classes.link
                            }
                            end
                        >
                            Вакансии FE
                        </NavLink>
                        <div className={classes.dot} />
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? classes.activeLink : classes.link
                            }
                        >
                            <Group gap="xs" align="center">
                                <IconUserCircle size={18} />
                                <span>Обо мне</span>
                            </Group>
                        </NavLink>
                    </Group>

                    <div className={classes.spacer} />
                </Group>
            </Container>
        </header>
    );
}