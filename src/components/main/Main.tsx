import React, { useEffect, useState } from 'react';
import Header from "../header";
import styled from "styled-components";
import Loader from "../../utils/Loader";
import Lists from "../lists/Lists";
import { GenreResponse, MovieResponse, Response } from "../../def/response";

const Wrapper = styled.div`

`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = () => {
    const [data, setData] = useState<Response>({ page: 0, results: [], total_pages: 0, total_results: 0 });
    const [movies, setMovies] = useState<MovieResponse[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [responseObj, setResponseObj] = useState<{ [year: number]: MovieResponse[] }>({})

    const [genreResponse, setGenreResponse] = useState<GenreResponse>({ genres: [] })
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([])

    const sortedYears = Object.keys(responseObj).map(Number).sort((a, b) => a - b);

    const [startYear, setStartYear] = useState(2012);
    const [endYear, setEndYear] = useState(2012);

    const sortBy = 'popularity.desc';
    const primaryReleaseData = '2012';
    const vote = '100'
    const apiKey = `2dca580c2a14b55200e784d157207b4d`

    const fetchResponse = async () => {
        setIsLoading(true);

        try {
            const api = `https://api.themoviedb.org/3/discover/movie?api_key=${ apiKey }&sort_by=${ sortBy }&primary_release_year=${ primaryReleaseData }&page=${ currentPage }&vote_count.gte=${ vote }`
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            const response = await fetch(api, options);
            const parsed = await response.json();

            setData(parsed);
            setMovies(parsed.results);

            const obj = responseObj
            obj[startYear] = parsed.results

            obj[2013] = parsed.results

            setResponseObj(obj)
            setHasMore(data.total_pages > currentPage);
        } catch (e) {
            console.warn(e);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (hasMore) {
            fetchResponse();
        }
    }, [currentPage, hasMore])

    const fetchFilters = async () => {
        const api = `https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d&language=en`;

        const response = await fetch(api)
        const parsed = await response.json();

        setGenreResponse(parsed)
    }

    useEffect(() => {
        fetchFilters()
    }, [])

    // console.log("data", data)

    return (
        <Wrapper>
            <Header genres={ genreResponse.genres } setSelectedGenreIds={ setSelectedGenreIds }/>
            <Container>
                { isLoading ?
                    <Loader/> :
                    <Lists moviesByKeys={ responseObj } movies={ movies } setCurrentPage={ setCurrentPage }
                           hasMore={ hasMore } sortedYears={ sortedYears } selectedGenreIds={ selectedGenreIds }
                    /> }
            </Container>

        </Wrapper>
    )
}

export default Main;