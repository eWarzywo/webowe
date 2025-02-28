import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Comment {
    postId: number;
    id: number;
    content: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    comments: Comment[];
}

const fetchPost = async (id: string): Promise<Post> => {
    const { data } = await axios.get(`http://localhost:5000/posts/${id}`);
    return data;
};

const Post = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id!)
    });
    const [comment, setComment] = useState('');

    const mutation = useMutation({
        mutationFn: (newComment: { content: string }) => axios.post(`http://localhost:5000/posts/${id}/comments`, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading post</div>;

    return (
        <div>
            <h2>{data?.title}</h2>
            <p>{data?.content}</p>
            <h3>Comments</h3>
            <ul>
                {data?.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate({ content: comment });
                    setComment('');
                }}
            >
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Post;