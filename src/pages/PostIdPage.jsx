import React, {useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {
    const params=useParams();
    const [post,setPost]=useState({});
    const [comments,setComments]=useState([]);
    const [fetchPostsById,isLoading,error]=useFetching(async (id)=>{
        const response=await PostService.getByID(id);
        setPost(response.data);
    });
    const [fetchComments,isComLoading,comError]=useFetching(async (id)=>{
        const response=await PostService.getCommentsByPostId(id);
        setComments(response.data);

    });
    useEffect(()=>{
        fetchPostsById(params.id);
        fetchComments(params.id)

    },[])
    return (
        <div>
            <h1>Пожилая страница поста с ID: {params.id}</h1>
            {isLoading
            ?<Loader/>
            :<div>{post.title}</div>

            }
            <h1>
                Комментарии:
            </h1>

            {isComLoading
            ?<Loader/>
            :<div>{comments.map(comm=>
                <div key={comm.id} style={{marginTop:'20px'}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>)}</div>
            }
            
        </div>
    );
};

export default PostIdPage;