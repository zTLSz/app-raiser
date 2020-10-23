import React, { useState } from 'react';
import styled from 'styled-components';
import { Spin, Space } from 'antd';


interface MainPageTypes {

}

const LoaderWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: white;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    .ant-spin-dot-item {
        background-color: #086623;
    } 
`

const Loader: React.FC<MainPageTypes> = () => {


    return (
        <LoaderWrapper>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </LoaderWrapper>
    )
}


export default Loader