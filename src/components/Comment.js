import React from 'react'

const Comment = ({comment, postedBy}) => {
    return (
        <div className='comment' style={{margin: '1%', backgroundColor: 'whitesmoke'}} >
            <h5>{postedBy}</h5>
            <p>{comment}</p>  
            
        </div>
    )
}

export default Comment
