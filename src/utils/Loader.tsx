import React from 'react';
import styled from "styled-components";

const Load = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
    return (
        <Load/>
    )
}

export default Loader;