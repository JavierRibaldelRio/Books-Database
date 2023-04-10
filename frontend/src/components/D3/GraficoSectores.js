import * as d3 from "d3"; //Importa D·.js
import React, { Component } from 'react';

import pasarAMayusPalabra from '../../scripts/pasarAMayus';

class GraficoSectores extends Component {

    componentDidMount() {

        fetch(this.props.ruta).then(res => res.json())
            .then((data) => this.crearGrafica(data))
            .catch((err) => console.log('err :>> ', err));

    }

    crearGrafica(data) {

        // Crea el id de el div y el diagrama
        const id = this.props.name;

        //obtine datos
        const { height, width, margin } = this.props;

        // Calcula el diagrama del gráfico de tarta que esi igual a la mitad del menor valor entre la altura y el grosor menos el margen, 
        const radio = (Math.min(height, width) / 2) - margin

        // Prepara la función para obtener los porcentajes
        const sumaTotal = Object.values(data).reduce((s, x) => s + x, 0);
        const obtenerPorcentaje = (valor) => Math.round(valor * 100 / sumaTotal) + '%';

        //Función que crea el tooltip

        const crearTooltip = (d) => `${pasarAMayusPalabra(d.data[0])}: ${d.data[1]} (${obtenerPorcentaje(d.data[1])})`

        // Crea el svg
        var svg = d3.select('#' + id)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Crea la escala de color

        var color = d3.scaleOrdinal()
            .range(d3.schemeSet2);

        // Crea el grafico sectorialy obtine las posición de cada uno en el gráfico

        var sec = d3.pie()
            .value((d) => d[1]);

        //Calcula cuantos grados ocupa cada cosa
        var dataPreparada = sec(Object.entries(data));

        // Genera el arco

        var generadorDeArcos = d3.arc()
            .innerRadius(0)
            .outerRadius(radio);


        // Crea el gráfico sectorial

        svg.selectAll('partes')
            .data(dataPreparada)
            .enter()
            .append('path')
            .attr('d', generadorDeArcos)
            .attr('fill', (d) => color(d.data[0]))
            .attr("stroke", "black")
            .style('stroke-width', "2px")
            .style('opacity', 0.7)
            .append("svg:title")
            .text(crearTooltip);


        // Crea el texto de dentro

        svg.selectAll('partes')
            .data(dataPreparada)
            .join('text')
            .text((d) => pasarAMayusPalabra(d.data[0]))
            .attr('transform', (d) => `translate(${generadorDeArcos.centroid(d)})`)
            .style('text-anchor', 'middle')
            .style('font-size', 17);
    }

    render() {

        return <div id={this.props.name} />
    }
}
GraficoSectores.defaultProps = {



    name: 'id-' + Math.floor((Math.random() * 100)), //Crea un nombre random,

    margin: 20,

    height: 200,
    width: 200

}


export default GraficoSectores;
