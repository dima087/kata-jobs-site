import { Container, Title, Text, Button, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './NotFound.module.css';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <Container size="md" py="xl">
            <div className={classes.root}>
                <Title order={1} mb="lg" className={classes.title}>
                    Упс! Такой страницы<br />не существует
                </Title>

                <Text c="gray.6" fz="lg" mb="xl">
                    Давайте перейдём к началу.
                </Text>

                <Button
                    onClick={() => navigate('/')}
                    color="#4263EB"
                    size="md"
                >
                    На главную
                </Button>

                <div className={classes.imageWrapper}>
                    <Image
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop"
                        alt="Cat"
                        radius="md"
                        className={classes.image}
                    />
                </div>


            </div>
        </Container>
    );
}