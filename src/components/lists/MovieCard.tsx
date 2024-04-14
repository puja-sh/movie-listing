import React from 'react';
import styled from "styled-components";
import { MovieResponse } from "../../def/response";

type IProps = {
    details: MovieResponse
}

const Wrapper = styled.div`
  flex-grow: 1;
  margin: 15px 20px;
  cursor: pointer;
  min-width: 200px;
  max-width: 230px;
  max-height: 300px;

  &:nth-child(4n) {
    margin-right: 0;
  }

  &:nth-child(4n+1) {
    margin-left: 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  img.poster {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }

  .movie-content {
    position: absolute;
    color: #dc906d;
    background: #000000;
    bottom: -20px;
    max-height: 0;
    height: 0px;
    width: 100%;
    text-align: center;
    transition: all 0.7s ease-in-out;
    overflow: hidden;
    font-weight: bold;
    padding: 10px 0;

    .ratings {
      font-size: 14px;
      margin-top: 7px;
    }


    .movie-detail-wrapper {
      text-align: left;
      overflow: hidden;
      padding: 0 5px;

      .content {
        font-size: 12px;
        color: #eaeaea;
        margin-top: 5px;

        &.scroll {
          height: 100px;
          overflow-y: scroll;

          //display: inline-block;
        }
      }
    }


  }

  &:hover {
    .movie-content {
      max-height: 180px;
      height: 180px;
    }
  }
`;

const MovieCard = ({ details }: IProps) => {
    const { original_title, poster_path, vote_average, overview } = details;
    const relativeUrl = process.env.REACT_APP_IMAGE_URL;
    return (
        <Wrapper>
            <ImageWrapper>
                <div className='movie-content'>
                    { original_title }

                    <div className='movie-detail-wrapper'>
                        <p className='content'> Ratings: { Math.ceil(vote_average) } ✰ </p>
                        <p className='content scroll'>  { overview } </p>
                    </div>

                </div>

                <img src={ `${ relativeUrl }/${ poster_path }` } className='poster'
                     alt={ original_title } loading='lazy'/>
            </ImageWrapper>
        </Wrapper>
    )
}

export default MovieCard;