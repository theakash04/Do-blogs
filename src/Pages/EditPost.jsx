import React, { useEffect, useState } from 'react'
import PostForm from '../Components/PostForm'
import postServices from '../Appwrite/Posts';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() =>{
    if(slug){
      postServices.getPost(slug)
      .then((post)=>{
        if(post){
          setPost(post)
        }
      })
    }else{
      navigate('/')
    }
  }, [slug, navigate])

  return post ? (
      <div>
        <PostForm post={post}/>y
      </div>
  ) : null
}

export default EditPost
