
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

//Crea un campo de fecha para el fórmulario

function DateField(props) {

    //Coge las propiedades de props
    const name = props.name;
    const label = props.label;
    const value = props.value;

    return <>
        <Form.Group as={Col} md="3" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="date" name={name} defaultValue={value} onChange={props.onChange} />
            <Form.Control.Feedback type="invalid">
                {label}
            </Form.Control.Feedback>
        </Form.Group>
    </>
}

export default DateField;