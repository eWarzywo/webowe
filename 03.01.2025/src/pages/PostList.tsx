import React from 'react';
import { Link } from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json() as Promise<Post[]>;
};
const PostList: React.FC = () => {
    const { data, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>

                {data!.map((post: Post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default PostList;