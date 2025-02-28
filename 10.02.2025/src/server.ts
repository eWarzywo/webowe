import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const posts = [
    { id: 1, title: 'First Post', content: 'This is the first post' },
    { id: 2, title: 'Second Post', content: 'This is the second post' }
];

const comments = [
    { postId: 1, id: 1, content: 'First comment on first post' },
    { postId: 1, id: 2, content: 'Second comment on first post' },
    { postId: 2, id: 3, content: 'First comment on second post' }
];

app.get('/posts', (_req, res) => {
    res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        const postComments = comments.filter(c => c.postId === post.id);
        res.json({ ...post, comments: postComments });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const newComment = { postId, id: comments.length + 1, content: req.body.content };
    comments.push(newComment);
    res.status(201).json(newComment);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});