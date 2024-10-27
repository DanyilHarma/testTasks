const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/todos', async (req, res) => {
    try {
        const response = await axios.get('https://todo.doczilla.pro/api/todos');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении данных', error: error.message });
    }
});

app.get('/api/todos/date', async (req, res) => {
    try {
        const { from, to, status } = req.query;
        console.log("Received params in /date:", from, to, status);
        const response = await axios.get('https://todo.doczilla.pro/api/todos/date', {
            params: { from, to, status }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении данных по дате', error: error.message });
    }
});

app.get('/api/todos/find', async (req, res) => {
    try {
        const { q } = req.query;
        const response = await axios.get('https://todo.doczilla.pro/api/todos/find', {
            params: { q }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при поиске задач', error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});

