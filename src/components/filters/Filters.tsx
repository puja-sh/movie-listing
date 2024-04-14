import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from "styled-components";
import { Genre } from "../../def/response";

const Wrapper = styled.div`
  //overflow: hidden;
`;

const Label = styled.label`
  gap: 10px;
  margin: 0 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;

  &:first-child {
    margin-left: 0;
  }

  input + p {
    padding: 7px 12px;
    background: #484848;
    border-radius: 6px;
    color: #F3F4F6;
    font-weight: 600;
    white-space: nowrap;
  }

  input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  input[type="checkbox"]:checked + p {
    padding: 6px 12px;
    background: #F0283C;
  }
`;

const Filters = ({
                     genres,
                     setSelectedGenreIds
                 }: { genres: Genre[], setSelectedGenreIds: Dispatch<SetStateAction<number[]>> }) => {

    const [all, setAll] = useState(false);
    const [checked, setChecked] = useState<number[]>([]);

    const checkHandler = (id: number) => {
        setChecked(prev => {
            if (prev.includes(id)) return prev.filter(item => item !== id);
            else return [...prev, id];
        });
    }

    useEffect(() => {
        if (all) setSelectedGenreIds([]);
        else setSelectedGenreIds(checked);
    }, [all, checked, setSelectedGenreIds]);

    return (
        <Wrapper>
            <Label onChange={ () => setAll(!all) }>
                <input type='checkbox'/>
                <p>All</p>
            </Label>

            {
                genres.map(item => (
                    <Label key={item.id}>
                        <input type='checkbox' onChange={ () => checkHandler(item.id) }/>
                        <p>{ item.name }</p>
                    </Label>
                ))
            }
        </Wrapper>
    )
}

export default Filters;