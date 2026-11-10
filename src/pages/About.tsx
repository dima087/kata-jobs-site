import { Container, Title, Text, Paper } from '@mantine/core';
import classes from './About.module.css';

export function About() {
    return (
        <Container size="md" py="xl">
            <Title order={1} mb="xl" className={classes.title}>
                Обо мне
            </Title>

            <Paper p="xl" withBorder radius="md">
                <Text fz="lg" lh={1.6} mb="md">
                    Привет, я Порываев Дмитрий Владимирович! Я frontend-разработчик с опытом работы в создании современных
                    веб-приложений. Специализируюсь на React, TypeScript и экосистеме JavaScript.
                </Text>

                <Text fz="lg" lh={1.6} mb="md">
                    В своей работе я использую такие технологии как React, Redux, Mantine UI,
                    React Router и другие современные инструменты. Стремлюсь писать чистый,
                    поддерживаемый код и создавать удобные пользовательские интерфейсы.
                </Text>

                <Text fz="lg" lh={1.6} mb="md">
                    Постоянно учусь и слежу за новыми тенденциями в мире frontend-разработки.
                    Интересуюсь производительностью веб-приложений, доступностью и лучшими
                    практиками разработки.
                </Text>

                <Text fz="lg" lh={1.6}>
                    В свободное время увлекаюсь изучением новых технологий, чтением технической
                    литературы.
                </Text>
            </Paper>
        </Container>
    );
}