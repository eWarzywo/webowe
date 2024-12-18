import { useParams } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();

    return (
        <div className="post">
            <h2>Post Title {id}</h2>
            <p>This is the content of the post.</p>
        </div>
    );
};

export default Post;
