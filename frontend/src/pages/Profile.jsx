import { useSelector } from 'react-redux';
import useFetchUserPosts from '../hooks/useFetchUserPosts';
import UserBlogs from "../components/UserBlogs";
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  useFetchUserPosts(user?._id)

  const {posts} = useSelector(state=>state.posts)


  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row md:space-x-8">

        {/* User Profile Section */}
        <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg custom-shadow">
          <div className="text-center">
            <img
              src={user?.profilePic}
              alt="Profile"
              className="rounded-full w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600 my-4">{user?.bio}</p>
            <Link to={"/edit-profile"} className='text-indigo-500 hover:underline'>Edit Profile</Link>
          </div>
        </div>

        {/* User Posts Section */}
        <UserBlogs posts={posts} />
       
      </div>
    </div>
  );
};

export default Profile;
