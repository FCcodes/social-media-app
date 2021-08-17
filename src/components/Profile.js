import React from 'react'

//components
import NavBar from './NavBar'
import Modal from './Modal'

//react-router-dom
import { Link} from 'react-router-dom';
import { useParams } from 'react-router';

//react-redux
import { useSelector } from 'react-redux';

//userFeed hook import 
import { useFetchCurrentUserContent } from '../hooks/userFeed';

//material ui imports
import { Grid, Avatar } from "@material-ui/core";

//component import 
import Feed from './Feed';

//material-ui/styles import
import { makeStyles } from "@material-ui/core/styles";

//react-masonry-css imports
import Masonry from 'react-masonry-css'


const useStyles = makeStyles({    
    large: {
        width: 200,
        height: 200,
    },
});

function Profile() {

    const classes = useStyles()
    
    let { id } = useParams();

    let { posts, profile } = useFetchCurrentUserContent(id)

    const [selectedImg, setSelectedImg] = React.useState(null);

    function displayPosts() {
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
        <div className="profilePage">
            <NavBar />
            <section className='userProfile'>
                <Avatar className={classes.large} src='' alt={id} />
                <div className="userData">
                    <div className="userAccount">
                        <div className="userName">{ profile !== {} ? profile.name : <> name </>}</div>
                        <button className="editProfile">Follow</button>
                        <button className="editProfile">Message</button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <div className="userFollowing">
                        <div>
                            <h4>0</h4>
                            <h5 style={{ fontWeight: 'lighter' }}>Post</h5>
                        </div>
                        <div>
                            <h4>0</h4>
                            <h5 style={{ fontWeight: 'lighter' }}>Followers</h5>
                        </div>
                        <div>
                            <h4>0</h4>
                            <h5 style={{ fontWeight: 'lighter' }}>Following</h5>
                        </div>
                    </div>
                </div>
            </section>
            <section className='userFeed'>
                <h1>Posts</h1>
                <div className="userFeedContainer">
                    <Masonry
                        breakpointCols={breakpoints}
                        className= {`my-masonry-grid ${classes.grid} `}
                        
                        columnClassName="my-masonry-grid_column"
                    >
                        {posts.length > 0 ? displayPosts() : <>No posts yet</>}
                    </Masonry>
                    {selectedImg && ( <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> )}
                </div>
            </section>
        </div>
    )
}

export default Profile