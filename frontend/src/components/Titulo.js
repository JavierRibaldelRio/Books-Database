import React from 'react';


function Titulo(props) {

    let { text, mayusculas } = props;

    if (mayusculas === true) {

        text = text.toUpperCase();
    }

    return <><h2 className="titulo elipse">{text}</h2> <hr /> <br /></>
}

Titulo.defaultProps = {

    text: "",

    mayusculas: true
}

export default Titulo;