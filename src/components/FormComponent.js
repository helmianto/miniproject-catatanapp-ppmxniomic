import 'semantic-ui-css/semantic.min.css';
import { Input, TextArea, Form, Button } from 'semantic-ui-react';

const FormComponent = ({formCatatan, onChange, onSubmit}) => {
    return (
        <Form>
            <Form.Field>
                <Input onChange={onChange} value={formCatatan.judul} name="judul" icon='book' type='text' iconPosition='left' placeholder='Judul Catatan' />
            </Form.Field>
            <Form.Field>
                <TextArea onChange={onChange} value={formCatatan.isi} name="isi" placeholder='Isikan catatan anda' style={{ minHeight: 100 }} />
            </Form.Field>
            <Button onClick={onSubmit} color='teal' fluid>Input</Button>
        </Form>   
    );
}

export default FormComponent;