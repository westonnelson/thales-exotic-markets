import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { getNetworkId } from 'redux/modules/wallet';
import UnsupportedNetwork from 'components/UnsupportedNetwork';
import { isNetworkSupported } from 'utils/network';
import { FlexDivColumn } from 'styles/common';

type DappLayoutProps = {
    children: React.ReactNode;
};

const DappLayout: React.FC<DappLayoutProps> = ({ children }) => {
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    return (
        <>
            {isAppReady ? (
                networkId && !isNetworkSupported(networkId) ? (
                    <UnsupportedNetwork />
                ) : (
                    <Background>
                        <Wrapper>{children}</Wrapper>
                    </Background>
                )
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

const Background = styled.section`
    min-height: 100vh;
    background: ${(props) => props.theme.background};
`;

const Wrapper = styled(FlexDivColumn)`
    align-items: center;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 20px 40px 110px;
    @media (max-width: 1024px) {
        padding: 40px 20px;
    }
    max-width: 1440px;
    min-height: 100vh;
`;

export default DappLayout;
