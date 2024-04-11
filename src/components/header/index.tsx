import React, { Dispatch, SetStateAction } from 'react';
import styled from "styled-components";
import logo from '../../assets/images/logo.png';
import Layout from "../../utils/Layout";
import Filters from "../filters/Filters";
import { Genre, GenreResponse } from "../../def/response";

const Wrapper = styled.div`
  background: #242424;
  padding: 10px 0 20px 0;

  .layout-wrapper {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 150px;
  }

  div {
    overflow-y: scroll;
    scroll-behavior: smooth;
    display: flex;
    margin-top: 10px;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }
`;


const Header = ({
                    genres,
                    setSelectedGenreIds
                }: { genres: Genre[], setSelectedGenreIds: Dispatch<SetStateAction<number[]>> }) => {
    return (
        <Wrapper>
            <Layout className='layout-wrapper'>
                <img src={ logo } alt='movie fix-logo'/>
                <div>
                    <Filters genres={ genres } setSelectedGenreIds={ setSelectedGenreIds }/>
                </div>
            </Layout>
        </Wrapper>
    )
}


export default Header;