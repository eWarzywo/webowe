import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setPost(data);
                    return data.userId;
                })
                .then((userId) => {
                    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                        .then((response) => response.json())
                        .then((data) => setUser(data));
                });
        }
    }, [id]);

    if (!post || !user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h2>Author</h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    );
};

export default PostDetail;