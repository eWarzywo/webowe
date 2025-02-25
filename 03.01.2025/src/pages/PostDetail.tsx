import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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

const fetchPost = async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.json() as Promise<Post>;
};

const fetchUser = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.json() as Promise<User>;
};

const PostDetail: React.FC = () => {
    const { id } = useParams();
    const { data: post, isLoading: postIsLoading } = useQuery({ queryKey: ['post', id], queryFn: () => fetchPost(id!) });
    const { data: user, isLoading: userIsLoading } = useQuery({ queryKey: ['user', post?.userId], queryFn: () => fetchUser(post!.userId) });

    if (postIsLoading || userIsLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <h2>Author</h2>
            <p>{user?.name} ({user?.email})</p>
        </div>
    );
};


export default PostDetail;