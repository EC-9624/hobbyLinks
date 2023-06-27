import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateGroupPage() {
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  //get user from localstorage
  const [user, setUser] = useState(
    localStorage.hasOwnProperty("currentUser") === true
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  const [group_name, setGroup_name] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(0);
  const [peopleLimit, setPeopleLimit] = useState(0);
  const [prefecture, setPrefecture] = useState("");
  const [file, setFile] = useState(undefined);
  const created_By = user.data.user_id;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("group_name", group_name);
      formData.append("created_by", created_By);
      formData.append("image", file);
      formData.append("desc", desc);
      formData.append("prefecture", prefecture);
      formData.append("category_id", category);
      formData.append("people_limit", peopleLimit);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const submit = await http.post("http://localhost:8000/api/groups", formData);
      console.log("Group Created", submit);
      navigate(`/`);
    } catch (error) {
      console.error("Create Group failed:", error);
    }
  };
  return (
    <div className='py-6 px-6 lg:px-8 text-left md:w-[600px] w-[90%] mx-auto flex flex-col'>
      <h3 className='text-gray-800 font-bold text-2xl mb-1'>Create Group</h3>
      <br></br>
      <form className='spacy-y-6' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='group_name' className='block mb-2 text-sm font-medium text-grey-900'>
            Group Name
          </label>
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
            <svg
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            <input
              type='text'
              name='group_name'
              id='group_name'
              value={group_name}
              onChange={(e) => setGroup_name(e.target.value)}
              className='boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
              placeholder='HobbyLinks'
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor='category_id' className='block mb-2 text-sm font-medium text-grey-900'>
            Category
          </label>
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
            <svg
              className='h-5 w-5 text-gray-500'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' />
              <rect x='4' y='4' width='6' height='6' rx='1' />
              <rect x='14' y='4' width='6' height='6' rx='1' />
              <rect x='4' y='14' width='6' height='6' rx='1' />
              <rect x='14' y='14' width='6' height='6' rx='1' />
            </svg>
            <select
              id='category_id'
              name='category_id'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
            >
              <option value='0'>-- Select --</option>
              <option value='1'>Games</option>
              <option value='2'>Sports</option>
              <option value='3'>Music</option>
              <option value='4'>Pets/Animals</option>
              <option value='5'>Social Activites</option>
              <option value='6'>Travel & Outdoor</option>
              <option value='7'>Techology</option>
              <option value='8'>Art & Culture</option>
              <option value='9'>Career & Business</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='people_limit' className='block mb-2 text-sm font-medium text-grey-900'>
            People Limit
          </label>
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
            <svg
              className='h-5 w-5 text-gray-500'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' />
              <circle cx='9' cy='7' r='4' />
              <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
              <path d='M16 11h6m-3 -3v6' />
            </svg>
            <input
              type='number'
              name='people_limit'
              id='people_limit'
              value={peopleLimit}
              onChange={(e) => setPeopleLimit(e.target.value)}
              className='boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
              placeholder='1000'
              min='1'
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor='group_name' className='block mb-2 text-sm font-medium text-grey-900'>
            Prefecture
          </label>
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
            <svg
              className='h-5 w-5 text-gray-500'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='18' y2='6.01' />
              <path d='M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5' />
              <polyline points='10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15' />
              <line x1='9' y1='4' x2='9' y2='17' />
              <line x1='15' y1='15' x2='15' y2='20' />
            </svg>
            <input
              type='text'
              name='prefecture'
              id='prefecture'
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              className='boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
              placeholder='Osaka,Japan'
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor='header_path' className='block mb-2 text-sm font-medium text-grey-900 '>
            Photo
          </label>
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4 '>
            <svg
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <input
              type='file'
              name='header_path'
              id='header_path'
              onChange={handleFileChange}
              className='boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor='desc' className='block mb-2 text-sm font-medium text-grey-900'>
            Description
          </label>
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
            <svg
              className='h-5 w-5 text-gray-500'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='17' y1='10' x2='3' y2='10' />
              <line x1='21' y1='6' x2='3' y2='6' />
              <line x1='21' y1='14' x2='3' y2='14' />
              <line x1='17' y1='18' x2='3' y2='18' />
            </svg>
            <textarea
              type='text'
              name='desc'
              id='desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows='5'
              placeholder='Welcome to our group'
              className=' boder border-gray-300 text-sm rounded-lg focus:outline-none block w-full p-2.5'
              required
            ></textarea>
          </div>
        </div>
        <br></br>
        <button
          type='submit'
          className='w-full text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

export default CreateGroupPage;
