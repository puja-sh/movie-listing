import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div<{ show: boolean }>`
  width: 100%;
  height: 5px;
  background: #151515;
  position: relative;
  visibility: ${ ({ show }) => show ? 'visible' : 'hidden' };
  margin-bottom: 10px;
`;

const Load = styled.div`
  display: inline-block;
  width: 100%;
  height: 5px;
  background: linear-gradient(135deg, #d0d0d0 0%, #000000 100%);
  position: absolute;
  animation: spin 1s linear infinite;
  border-radius: 10px;

  @keyframes spin {
    from {
      transform: translateX(-80%);
    }
    to {
      transform: translateX(100%);
    }
  }

`;

const Loader = ({ show }: { show: boolean }) => {

    return (
        <Wrapper show={ show }>
            <Load/>
        </Wrapper>
    )
}

export default Loader;