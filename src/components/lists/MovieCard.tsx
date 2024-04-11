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
    color: sienna;
    background: white;
    bottom: -20px;
    max-height: 0;
    height: 0;
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
  }

  &:hover {
    .movie-content {
      max-height: 150px;
      height: 80px;
    }
  }
`;

const MovieCard = ({ details }: IProps) => {
    const { original_title, poster_path, vote_average } = details;

    return (
        <Wrapper>
            <ImageWrapper>
                <div className='movie-content'>
                    { original_title }
                    <p className='ratings'> Ratings: { Math.ceil(vote_average) } </p>
                </div>

                <img src={ `https://image.tmdb.org/t/p/original/${ poster_path }` } className='poster' loading='lazy'/>
            </ImageWrapper>
        </Wrapper>
    )
}

export default MovieCard;