import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { pasarAMayusFrase } from '../../scripts/pasarAMayus'

//Crea un campo de texto que contiene lista
function TextField(props) {

    //Coge el contenido de las props
    const name = props.name;
    const label = props.label
    const list = props.list;
    const value = props.value;

    //Handel cambio

    const required = (undefined === props.required) ? false : true;


    //Almacena las opciones de la lista

    var opciones;

    //Gener las opciones de la lista
    if (list !== undefined) {

        opciones = list.map((x) => <option key={x}>{pasarAMayusFrase(x)}</option>)

    }

    return <>
        <Form.Group as={Col} md={props.md} controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                onChange={props.onChange}
                name={name}
                required={required}
                defaultValue={value}
                type="text"
                autoComplete="off"
                list={name + 'list'}
            />

            <datalist id={name + 'list'}>
                {opciones}
            </datalist>
        </Form.Group>

    </>
}

TextField.defaultProps = {
    onChange() { },
    md: 4
}

export default TextField