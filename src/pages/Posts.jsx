import React, {useEffect, useRef, useState} from "react";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../UI/pagination/Pagination";
import Loader from "../UI/Loader/Loader";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import PostForm from "../components/PostForm";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../UI/select/MySelect";

function Posts() {
    const [posts,setPosts]=useState([])



    const [filter,setFilter]=useState({sort:'',query:''});
    const [modal,setModal]=useState(false);
    const [totalPages,setTotalPages]=useState(0);
    const [limit,setLimit]=useState(10);
    const [page,setPage]=useState(1);
    const sortedAndSearchedPosts=usePosts(posts,filter.sort,filter.query);
    const lastElement=useRef();





    const  [fetchPosts,isPostsLoading,postError]=useFetching(async (limit,page)=>{
        const response=await PostService.getAll(limit,page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount,limit))
    })


    useObserver(lastElement,page<totalPages,isPostsLoading,()=>{
        setPage(page+1);
    })

    useEffect(()=>{
        fetchPosts(limit,page);
    },[page,limit])

    const createPost=(newPost)=>{
        setPosts([...posts,newPost])
        setModal(false)
    }

    const removePost=(post)=>{
        setPosts(posts.filter(p=>p.id !==post.id))
    }

    const changePage=(page)=>{
        setPage(page);


    }


    return (
        <div className="App">

            <MyButton style={{marginTop:'15px'}} onClick={()=>setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin:'15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value=>setLimit(value)}
                defaultValue='Кол-во элементов'
                options={[
                    {value:5,name:'5'},
                    {value:10,name:'10'},
                    {value:25,name:'25'},
                    {value:-1,name:'Все'},
                ]}
            />

            {
                postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost}  posts={sortedAndSearchedPosts} title={"Список постов"}/>
            <div ref={lastElement} style={{height:'20px',backgroundColor:'red'}}></div>

            {isPostsLoading &&
                 <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}><Loader/></div>
            }



            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>







        </div>
    );
}

export default Posts;
