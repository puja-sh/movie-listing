import React, { forwardRef, MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import Layout from "../../utils/Layout";
import Loader from "../../utils/Loader";
import { MovieResponse } from "../../def/response";
import MovieCard from "./MovieCard";

type IProps = {
    moviesByKeys: { [year: number]: MovieResponse[] }
    movies: MovieResponse[];
    hasMore: boolean;
    setCurrentPage: (prevPage: (prevPage: number) => number) => void;
    sortedYears: number[];
    selectedGenreIds: number[]
}

const Wrapper = styled.div`
  background: #151515;
  width: 100%;
  height: 100%;
`;

const ScrollContainer = styled.div`
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 80px;
`;

const YearHead = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Lists = ({ moviesByKeys, movies, hasMore, setCurrentPage, sortedYears, selectedGenreIds }: IProps) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // console.log(scrollPosition)
    // console.log("movies", movies)

    return (
        <Wrapper>
            <Layout>
                <ScrollContainer className="infinite-scroll-container">
                    {
                        sortedYears.map(year => {
                            const movies = moviesByKeys[year] || [];

                            return (
                                <div className='year-movie-wrapper'>
                                    <YearHead> { year } </YearHead>

                                    <Cards>
                                        { movies.map(movie => {
                                            const { genre_ids } = movie;

                                            if (selectedGenreIds.length > 0) {
                                                const filterFlag = selectedGenreIds.every(el => genre_ids.includes(el))

                                                if (filterFlag) {
                                                    return (
                                                        <MovieCard key={ movie.id + movie['original_title'] }
                                                                   details={ movie }/>
                                                    )
                                                }
                                            } else {
                                                return (
                                                    <MovieCard key={ movie.id + movie['original_title'] }
                                                               details={ movie }/>
                                                )
                                            }

                                        })
                                        }
                                    </Cards>
                                </div>
                            )
                        })
                    }

                    { hasMore && <Loader/> }
                </ScrollContainer>
            </Layout>
        </Wrapper>
    )
}

export default Lists;