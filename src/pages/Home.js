import React from "react"

//Components imports
import Logo from "../components/Logo"
import NavBar from "../components/NavBar"
import Story from "../components/Story"
import Feed from "../components/Feed"
import AddImage from "../components/AddImage"
import Modal from '../components/Modal'

//logout import
import { logout } from "../hooks/logout"

//react-redux import
import { useDispatch, useSelector } from "react-redux"

//logout reducers
import { signOut } from "../reducers/authReducer"

import { useHistory } from "react-router-dom"

import { usePostListener } from "../hooks/postListener"

//material ui
import { Grid } from "@material-ui/core"
import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/";

//react-router-dom
import { Link } from "react-router-dom"
import { Switch, Route } from "react-router-dom"

//react-masonry-css imports
import Masonry from 'react-masonry-css'

const useStyles = makeStyles({
    grid: {
        width: '60vw',
        margin: 'auto'
    }
})

const Home = () => {

    const classes = useStyles()

    let { posts } = usePostListener()
    let userName = useSelector((state) => state.auth.userName)

    const [selectedImg, setSelectedImg] = React.useState(null);

    const dispatch = useDispatch()
    const history = useHistory()

    const [addImage, setAddImage] = React.useState(false)

    function handleClick() {
        logout()
        dispatch(signOut())
        history.push("/signup")
    }

    function displayPost() {
        let arr = []
        arr = posts.map((post) => {
            return (
                <Feed key={post.url + Math.random()} docID={post.docID && post.docID} image={post.url} caption={post.caption} postBy={post.postedBy} setSelectedImg={setSelectedImg} />
            )
        })
        return arr
    }

    const breakpoints = {
        default: 2,
        1100: 2,
        700: 2,
        500: 1
    };

    return (
        <>
            <div className="instaClone">
                <NavBar setAddImage={setAddImage} />

                <div className="stories">
                    <Typography
                        variant='h4'
                        component='h1'
                        gutterBottom
                    >Stories</Typography>
                    <div className="storiesFeed">
                        <Story />
                    </div>
                </div>
                <div className="feed ">
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                    >Feed</Typography>
                    <Masonry
                        breakpointCols={breakpoints}
                        className= {`my-masonry-grid ${classes.grid} `}
                        
                        columnClassName="my-masonry-grid_column"
                    >
                        {posts.length > 0 ? displayPost() : <>No posts yet</>}
                    </Masonry>
                    {selectedImg && ( <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> )}
                </div>                

            </div>
        </>
    )
}

export default Home
