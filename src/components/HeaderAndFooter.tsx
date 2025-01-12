import { Link } from "react-router-dom/dist/index";
import { FC, PropsWithChildren } from "react";
import styled from "@emotion/styled";

export const WideWrapper = styled.div`
  max-width:90%;
  margin: 0 auto;
  img {
    max-width:100%;
  }
  p,h1,h2,h3,h4,h5,h6 {
    width: 700px;
    max-width: 90%;
  }
`;
export const Wrapper = styled.div`
  max-width:90%;
  width:700px;
  margin: 0 auto;
  img {
    max-width:100%;
  }
`;


export const HeaderAndFooter: FC<PropsWithChildren> = ({children}) => {
  return (
    <WideWrapper>
      <h1>UNSW Research Centre of Integrated Transport Innovation Walking and Cycling counts</h1>
      {children}
    </WideWrapper>
  );
};



export const HeaderAndFooterSubpage = ({children, pageTitle}: PropsWithChildren<{pageTitle: string}>) => {
  return (
    <WideWrapper>
      <h1><Link to={`/`}>UNSW Research Centre of Integrated Transport Innovation Walking and Cycling counts</Link> / {pageTitle}</h1>
      {children}
    </WideWrapper>
  );
};