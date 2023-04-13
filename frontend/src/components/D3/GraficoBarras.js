import * as d3 from "d3"; //Importa D·.js
import React, { Component } from 'react';

import pasarAMayusPalabra from '../../scripts/pasarAMayus';
import recortar3Letras from '../../scripts/recortar3Letras';

import { withTranslation } from "react-i18next";

// Almacena el nombre de todos los meses


class GraficoBarras extends Component {

    constructor(props) {
        super(props)

        // Color de la franja de anyos
        this.colorAnyos = "#b3697a";

        this.state = {}
        // Funciones

        this.actualizarAnyos = this.actualizarAnyos.bind(this);
        this.actualizarMeses = this.actualizarMeses.bind(this);

    }

    componentDidMount() {

        fetch(this.props.ruta).then(res => res.json())
            .then((data) => {

                // Transforma los meses
                const meses = {}

                // Suma el total de libros
                let nLibros = 0

                for (let i = 0; i < 12; i++) {

                    const { t } = this.props;

                    meses[t("NOMBRES-MESES", { returnObjects: true })[i]] = data.meses[i];

                    nLibros = nLibros + data.meses[i];
                }

                /**
                 * Como para que haya un mes también tiene que haber un año,
                 * la suma de todos los libros repartidos entre todos los meses ha
                 * de ser igual al número total de libros.
                 */

                this.libros = nLibros;

                this.setState({ anyos: data.anyos, meses: meses });

                // Crea la gráfica    
                this.crearGrafica(data.anyos)
            })
            .catch((err) => console.log('err :>> ', err));


    }

    // Crea la gráfica y la actualiza para mostrar los anyos
    crearGrafica(anyos) {

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

        this.actualizarGrafica(anyos, this.colorAnyos);
    }

    // actualiza la grafica
    actualizarGrafica(data, color) {



        // Actualiza el OX
        this.x.domain(Object.keys(data).map(recortar3Letras).map(pasarAMayusPalabra))
        this.ejeX.call(d3.axisBottom(this.x));

        // Actualiza eje Y

        this.y.domain([0, d3.max(Object.values(data))]);

        // Elimina los ticks decimales
        const ticks = this.y.ticks()
            .filter(tick => Number.isInteger(tick));

        this.ejeY
            .transition()
            .duration(1000)
            .call(d3.axisLeft(this.y)
                .tickValues(ticks)
                .tickFormat(d3.format('d')))




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


        this.svg.selectAll("rect").append('svg:title')
            .text((data) => `${pasarAMayusPalabra(data[0])}: ${data[1]} (${Math.round(100 / this.libros * data[1])}%)`)



    }

    // Cambia a meses o a años
    actualizarMeses() { this.actualizarGrafica(this.state.meses, "#69b3a2") }
    actualizarAnyos() { this.actualizarGrafica(this.state.anyos, this.colorAnyos) }

    // Traducción


    render() {
        const { t } = this.props;

        return <div id="grafico-barras">

            <div id="botones-mostrar" className="botones-control-grafico">

                <button className="btn btn-primary" onClick={this.actualizarMeses}>{t("libros-meses")}</button>
                <button className="btn btn-primary" onClick={this.actualizarAnyos}> {t("libros-anyos")}</button>

            </div>

            <div id={this.props.name} />
        </div>;
    }
}
GraficoBarras.defaultProps = {


    name: 'id-' + Math.floor((Math.random() * 100)), //Crea un nombre random,

    margin: 20,

    height: 400,
    width: 400

};


export default withTranslation()(GraficoBarras);
