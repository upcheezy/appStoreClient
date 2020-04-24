import React from 'react';
// import moment from 'moment';

export default function Program(props) {
    // console.log(props, 'program props');
    return (
        <div className='program'>
            <h2>
                {props.App}
            </h2>
            <div className='program_rating'>
                {props.Rating}
            </div>
            <div className='genres_section'>
                {props.Genres}
            </div>
            {/* <div className='last_updated'>
                {moment(props.["Last Updated"]).format('DD MMM YYYY')}
            </div> */}
        </div>
    )
}