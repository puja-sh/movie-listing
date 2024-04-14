import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import styled from "styled-components";
import Layout from "../../utils/Layout";
import { MovieResponse } from "../../def/response";
import MovieCard from "./MovieCard";

type IProps = {
    moviesByKeys: { [year: number]: MovieResponse[] }
    sortedYears: number[];
    selectedGenreIds: number[]
    fetchResponse: (currentYear: number) => void;
    setYears: Dispatch<SetStateAction<{ topYear: number, bottomYear: number }>>;
    getGenreKey: (selected: number[]) => any;
    setLoader: Dispatch<SetStateAction<{ showTopLoader: boolean, showBottomLoader: boolean }>>;
    moviesByGenre: { [genres: string]: { [year: number]: MovieResponse[] } };
}

const Wrapper = styled.div`
  background: #151515;
  width: 100%;
  height: 100%;
`;

const ScrollContainer = styled.div`
  overflow: scroll;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 70px;
`;

const YearHead = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const NoMovie =  styled.div`
  height: 300px;
  color: #fff;
`;


const Lists = ({
                   moviesByKeys,
                   fetchResponse,
                   sortedYears,
                   selectedGenreIds,
                   setYears,
                   setLoader,
                   moviesByGenre,
                   getGenreKey
               }: IProps) => {

    const [genreKey, setGenreKey] = useState<string>("");

    const handleScrollUp = useCallback(() => {
        setLoader(prev => ({ ...prev, showTopLoader: true }));

        setYears(prev => {
            const newTopYear = prev.topYear - 1;
            fetchResponse(newTopYear);
            return { ...prev, topYear: newTopYear };
        });

        setTimeout(() => {
            window.scrollBy({ top: 5, behavior: "smooth" })
        }, 1000)
    }, [fetchResponse, setYears, setLoader])

    const handleScrollDown = useCallback(() => {
        setLoader(prev => ({ ...prev, showBottomLoader: true }));

        setYears(prev => {
            const newBottomYear = prev.bottomYear + 1;
            fetchResponse(newBottomYear);
            return { ...prev, bottomYear: newBottomYear };
        });
    }, [fetchResponse, setYears, setLoader])

    const handleScroll = useCallback(() => {
        if (selectedGenreIds.length) return;

        const { scrollTop, clientHeight, scrollHeight } = document.documentElement

        if (scrollTop === 0) {
            handleScrollUp();

        } else if (Math.trunc(scrollTop + clientHeight) === scrollHeight) {
            handleScrollDown()
        }

    }, [handleScrollDown, handleScrollUp])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll])

    useEffect(() => {
        const updatedKey = getGenreKey(selectedGenreIds);
        setGenreKey(updatedKey)
    }, [selectedGenreIds])

    return (
        <Wrapper>
            <Layout>
                <ScrollContainer className="infinite-scroll-container">
                    {
                        sortedYears.map(year => {
                            let movies: MovieResponse[];

                            if (selectedGenreIds.length >= 1) {
                                movies = moviesByGenre[genreKey]?.[year] ?? [];
                            } else {
                                movies = moviesByKeys[year] || [];
                            }


                            return (
                                <div className='year-movie-wrapper' key={ year }>
                                    <YearHead> { year } </YearHead>


                                    {
                                        movies.length ? <Cards>
                                            { movies?.map(movie => {
                                                return (
                                                    <MovieCard key={ movie.id + movie['original_title'] }
                                                               details={ movie }/>
                                                )
                                            })
                                            }
                                        </Cards> : <NoMovie>No movie sorry!</NoMovie>

                                    }

                                </div>
                            )
                        })
                    }
                </ScrollContainer>
            </Layout>
        </Wrapper>
    )
}

export default Lists;