import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    content: string;
}

const fetchPosts = async (): Promise<Post[]> => {
    const { data } = await axios.get('http://localhost:5000/posts');
    return data;
};

const Home = () => {
    const { data, isLoading, error } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts</div>;

    return (
        <div className="home">
            <h2>Welcome to My Blog</h2>
            <p>Discover amazing content and explore various topics.</p>
            <ul>
                {data?.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;