import * as d3 from "d3"; //Importa D·.js
import React, { Component } from 'react';

import pasarAMayusPalabra from '../../scripts/pasarAMayus';
import recortar3Letras from '../../scripts/recortar3Letras';

class GraficoBarras extends Component {

    constructor(props) {
        super(props)

        // Datos de prueba

        this.meses = { enero: 5, febrero: 2, marzo: 2, abril: 4, mayo: 1, junio: 1, julio: 3, agosto: 10, septiembre: 3, octubre: 2, noviembre: 3, diciembre: 4 }

        this.anyos = { 2020: 19, 2021: 12, 2022: 10, 2023: 18 }


        // Funciones

        this.actualizarAnyos = this.actualizarAnyos.bind(this);
        this.actualizarMeses = this.actualizarMeses.bind(this);

    }

    componentDidMount() {

        // fetch(this.props.ruta).then(res => res.json())
        //     .then((data) => this.crearGrafica(data))
        //     .catch((err) => console.log('err :>> ', err));

        this.crearGrafica();

    }

    // Crea la gráfica
    crearGrafica() {

        // Crea el id de el div y el diagrama
        const id = this.props.name;

        //obtine datos
        const { height, width, margin } = this.props;

        // Crea el svg
        this.svg = d3.select('#' + id)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin}, ${margin})`);

        // Crea el eje X
        this.x = d3.scaleBand()
            .range([0, width - 2 * margin])
            .padding(0.2);
        this.ejeX = this.svg.append('g')
            .attr('transform', 'translate(0, ' + (height - margin * 2) + ')');

        //Crea el eje Y
        this.y = d3.scaleLinear()
            .range([height - 2 * margin, 0]);

        this.ejeY = this.svg.append('g')
            .attr('className', "ejeY");

        this.actualizarMeses();
    }

    // actualiza la grafica
    actualizarGrafica(data, color) {


        // Actualiza el OX
        this.x.domain(Object.keys(data).map(recortar3Letras).map(pasarAMayusPalabra))
        this.ejeX.call(d3.axisBottom(this.x));

        // Actualiza eje Y

        this.y.domain([0, d3.max(Object.values(data))]);

        this.ejeY.transition()
            .duration(1000)
            .call(d3.axisLeft(this.y));


        // Crea las barras

        var u = this.svg.selectAll('rect')
            .data(Object.entries(data))

        u.join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => this.x(pasarAMayusPalabra(recortar3Letras(d[0]))))
            .attr("y", d => this.y(d[1]))
            .attr("height", d => this.props.height - 2 * this.props.margin - this.y(d[1]))
            .attr('width', this.x.bandwidth())
            .attr('fill', color)


    }

    // Cambia a meses o a años
    actualizarMeses() { this.actualizarGrafica(this.meses, "#69b3a2") }
    actualizarAnyos() { this.actualizarGrafica(this.anyos, "#b3697a") }

    render() {

        return <div>

            <div className="botones-control-grafico">

                <button className="btn btn-primary" onClick={this.actualizarMeses}>Libros por Meses</button>
                <button className="btn btn-primary" onClick={this.actualizarAnyos}>Libros por Años</button>

            </div>

            <div id={this.props.name} />
        </div>
    }
}
GraficoBarras.defaultProps = {


    name: 'id-' + Math.floor((Math.random() * 100)), //Crea un nombre random,

    margin: 20,

    height: 400,
    width: 400

}


export default GraficoBarras;
