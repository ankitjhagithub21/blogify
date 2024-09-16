
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import useFetchUserPosts from '../hooks/useFetchUserPosts';

const Profile = () => {
  const {user} = useSelector(state=>state.auth);
  const posts = useFetchUserPosts(user?._id)


  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row md:space-x-8">
        
        {/* User Profile Section */}
        <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              src={user?.profilePic}
              alt="Profile"
              className="rounded-full w-32 h-32 mx-auto mb-4"
            />
            <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600 mt-4">{user?.bio}  mollitia cupiditate ullam sequi sint sit, laboriosam nemo eos nam architecto! Dolorem, libero quos</p>
          </div>
        </div>
        
        {/* User Posts Section */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold my-4">My Posts</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="bg-white p-4 mb-4 rounded-lg shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                
                <p className="text-gray-500 text-sm mb-2">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                <Link to={`/blogs/${post._id}`} className='text-blue-500 hover:text-blue-600'>Read blog</Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You haven't written any posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
