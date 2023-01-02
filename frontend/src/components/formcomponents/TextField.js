import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

//Crea un campo de texto que contiene lista
function TextField(props) {

    //Coge el contenido de las props
    const name = props.name;
    const label = props.label
    const list = props.list;
    const value = props.value;

    const required = (undefined === props.required) ? false : true;


    //Almacena las opciones de la lista

    var opciones;

    //Gener las opciones de la lista
    if (list !== undefined) {

        opciones = list.map((x) => <option class={name} key={x}>{x}</option>)

    }

    return <>
        <Form.Group as={Col} md="4" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
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

export default TextField