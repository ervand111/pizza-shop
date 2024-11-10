import React from 'react';
import Faq from "../../components/Faq/faq";
import App from "../../components/Layouts/app";

const Index = () => {
    return (
        <>
            <Faq/>
        </>
    );
};

Index.getLayout = function getLayout(page) {
    return (
        <App>
            {page}
        </App>
    )
}

export default Index;

