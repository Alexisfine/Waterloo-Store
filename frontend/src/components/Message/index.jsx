import React from 'react';
import {Alert} from "react-bootstrap";

const Index  = ({variant, children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

Index.defaultProps = {
    variant: 'info'
}
export default Index;