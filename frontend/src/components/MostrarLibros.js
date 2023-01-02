import React, { Component } from 'react';

class MostrarLibros extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {

        if (query === null) {

            fetch('/api/fetch_books').then((res) => res.json())
                .then((data) => this.setState({ data: data }))
                .catch((err) => console.log('err :>> ', err));

        }
        else {
            //Por hacer

        }
    }

    render() {
        return (  );
    }
}


MostrarLibros.defaultProps = {

    query: null
}

export default MostrarLibros;