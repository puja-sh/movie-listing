import React, { ReactNode } from 'react';
import styled from "styled-components";

const Wrap = styled.div`
  padding: 0 200px;
  overflow: hidden;
`;

const Layout = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
    return (
        <Wrap className={ className }> { children } </Wrap>
    )
}

export default Layout