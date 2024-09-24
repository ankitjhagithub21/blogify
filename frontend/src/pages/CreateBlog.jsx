import { useState, useRef, useMemo } from 'react';
import toast from 'react-hot-toast';
import {useSelector} from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import JoditEditor from 'jodit-react';

const CreateBlog = () => {
  const {user} = useSelector(state=>state.auth)
  const [loading, setLoading] = useState(false);
  const editor = useRef(null); // Reference for Jodit Editor
  const ref = useRef(null); // Reference for LoadingBar
  const [content, setContent] = useState(''); // State for editor content

  // JoditEditor configuration
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user) return toast.error("You are not logged in.")

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    formValues.description = content; 

    setLoading(true);
    ref.current.continuousStart(); // Start LoadingBar

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify(formValues)
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        e.target.reset(); // Reset form
        setContent(''); // Clear editor content
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    } finally {
      setLoading(false);
      ref.current.complete(); // Complete LoadingBar
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-xl shadow-xl p-5 my-24">
      <LoadingBar color="#f11946" ref={ref} />
      <h2 className="text-2xl font-bold text-center mb-5">Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="text" className='input input-bordered bg-transparent ' name='thumbnail' placeholder='Paste image url' required/>
        
      <input type="text" className='input input-bordered bg-transparent' name='title' placeholder='Enter title' required/>
        {/* JoditEditor for rich text editing */}
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={newContent => setContent(newContent)} // Update content when blurred

        />

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
