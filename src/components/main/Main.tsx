import React, { useCallback, useEffect, useState } from 'react';
import Header from "../header";
import styled from "styled-components";
import Loader from "../../utils/Loader";
import Lists from "../lists/Lists";
import { GenreResponse, MovieResponse } from "../../def/response";

const Wrapper = styled.div`
  overflow: hidden;

  .listings {
    background: #151515;
    padding-top: 140px;
    scroll-behavior: smooth;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = () => {
    const [responseObj, setResponseObj] = useState<{ [year: number]: MovieResponse[] | [] }>({})

    const [filteredObj, setFilteredObj] = useState<{ [genres: string]: { [year: number]: MovieResponse[] } }>({});

    const [genreResponse, setGenreResponse] = useState<GenreResponse>({ genres: [] })
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([])
    const [, setYears] = useState<{ topYear: number, bottomYear: number }>({ topYear: 2012, bottomYear: 2012 });

    const [loader, setLoader] = useState<{ showTopLoader: boolean, showBottomLoader: boolean }>({
        showTopLoader: false,
        showBottomLoader: false
    });

    const sortedYears = Object.keys(responseObj).map(Number).sort((a, b) => a - b);

    const sortBy = 'popularity.desc';
    const vote = '100'
    const apiKey = `${ process.env.REACT_APP_API_KEY }`;

    const makeResponseObj = useCallback((results: MovieResponse[], year: number) => {
        setResponseObj(prevObj => ({
            ...prevObj,
            [year]: results
        }));
    }, [])

    const getGenreKey = (selected: number[]) => {
        const sorted = selected.map(Number).sort((a, b) => a - b);
        return sorted.join(",");
    }

    const makeGenreResponseObj = useCallback((genreKey: string, movieData: MovieResponse[], year: number) => {
        setFilteredObj(prev => ({
            ...prev,
            [genreKey]: {
                ...prev[genreKey],
                [year]: movieData
            }
        }));
    }, [])

    const callGenreApi = useCallback(async (year: number, genreIdKeys: string, page = 1,) => {
        try {
            const api = `https://api.themoviedb.org/3/discover/movie?api_key=${ apiKey }&sort_by=${ sortBy }&primary_release_year=${ year }&page=${ page }&vote_count.gte=${ vote }&with_genres=${ genreIdKeys }`
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            const response = await fetch(api, options);
            const parsed = await response.json();

            await makeGenreResponseObj(genreIdKeys, parsed.results, year)

        } catch (e) {
            console.log(e)
        }
    }, [apiKey])

    const callApi = useCallback(async (year = 2012, page = 1) => {
        try {
            const api = `https://api.themoviedb.org/3/discover/movie?api_key=${ apiKey }&sort_by=${ sortBy }&primary_release_year=${ year }&page=${ page }&vote_count.gte=${ vote }`
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            if (year !== 2012) await new Promise(resolve => setTimeout(resolve, 1200));

            const response = await fetch(api, options);
            const parsed = await response.json();

            await makeResponseObj(parsed.results, year)

        } catch (e) {
            console.warn(e);
            setLoader({ showBottomLoader: false, showTopLoader: false })
        }
    }, [apiKey])

    const fetchGenreResponse = useCallback(() => {
        const genreIdKeys = getGenreKey(selectedGenreIds);

        sortedYears.map(async year => {
            await callGenreApi(year, genreIdKeys)
        })
    }, [selectedGenreIds, sortedYears])

    const fetchResponse = useCallback(async (year = 2012) => {
        if (selectedGenreIds.length >= 1) {
            await fetchGenreResponse()
        } else {
            await callApi(year)
        }

        setLoader({ showTopLoader: false, showBottomLoader: false });
    }, [selectedGenreIds])


    useEffect(() => {
        document.documentElement.scrollTop = 5;
        fetchResponse();
    }, [fetchResponse]);

    const fetchFilters = useCallback(async () => {
        const api = `https://api.themoviedb.org/3/genre/movie/list?api_key=${ apiKey }&language=en`;

        const response = await fetch(api)
        const parsed = await response.json();

        setGenreResponse(parsed)
    }, [apiKey])

    useEffect(() => {
        fetchFilters()
    }, [fetchFilters])


    return (
        <Wrapper>
            <Header genres={ genreResponse.genres } setSelectedGenreIds={ setSelectedGenreIds }/>

            {
                sortedYears.length ? <div className='listings'>
                    <Loader show={ loader.showTopLoader }/>
                    <Container>
                        <Lists moviesByKeys={ responseObj }
                               moviesByGenre={ filteredObj }
                               sortedYears={ sortedYears }
                               selectedGenreIds={ selectedGenreIds }
                               fetchResponse={ fetchResponse }
                               setLoader={ setLoader }
                               setYears={ setYears }
                               getGenreKey={ getGenreKey }
                        />
                    </Container>
                    <Loader show={ loader.showBottomLoader }/>
                </div> : null
            }

        </Wrapper>
    )
}

export default Main;