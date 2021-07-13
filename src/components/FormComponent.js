import 'semantic-ui-css/semantic.min.css';
import { Input, TextArea, Form, Button } from 'semantic-ui-react';

const FormComponent = ({formCatatan, onChange, onSubmit, isShowAlertJudul, isShowAlertIsi}) => {
    return (
        <Form>
            <Form.Field>
                <Input onChange={onChange} value={formCatatan.judul} name="judul" icon='book' type='text' iconPosition='left' placeholder='Judul Catatan' />
                {isShowAlertJudul ? <p style={{color: 'red'}}>Isian judul catatan wajib diisi!</p> : null}
            </Form.Field>
            <Form.Field>
                <TextArea onChange={onChange} value={formCatatan.isi} name="isi" placeholder='Isikan catatan anda' style={{ minHeight: 100 }} />
                {isShowAlertIsi ? <p style={{color: 'red'}}>Isian catatan wajib diisi!</p> : null}
            </Form.Field>
            <Button onClick={onSubmit} color='teal' fluid>Input</Button>
        </Form>   
    );
}

export default FormComponent;