import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth); 
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Populate fields with current user data on component mount
  useEffect(() => {
    if (user) {
      setName(user.fullName || ''); // Pre-fill name from user object
      setBio(user.bio || ''); // Pre-fill bio from user object
      setProfileImageUrl(user.profilePic || ''); // Pre-fill profile image URL
    }
  }, [user]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Updating your profile.")
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, bio, profileImageUrl }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.user)); // Update Redux store with new user data
        navigate('/profile');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      toast.dismiss(toastId)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-5">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg custom-shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Profile Image URL Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Image URL</span>
            </label>
            <input
              type="text"
              placeholder="Paste profile image URL"
              value={profileImageUrl}
              onChange={(e) => setProfileImageUrl(e.target.value)}
              className="input input-primary bg-transparent input-bordered w-full"
              required
            />
          </div>

          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-primary bg-transparent input-bordered w-full"
              required
            />
          </div>

          {/* Bio Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              placeholder="Tell something about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="textarea textarea-primary bg-transparent  textarea-bordered w-full resize-none"
              rows="4"
              
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
