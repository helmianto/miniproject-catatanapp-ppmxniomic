import 'semantic-ui-css/semantic.min.css';
import { Button, Card } from 'semantic-ui-react';

const CatatanComponent = ({ data, onUpdate, onRemove}) => {
    return (
        <Card.Group>
            <Card fluid>
                <Card.Content>
                    <Card.Header>{ data.judul }</Card.Header>
                    <Card.Meta>{ data.tanggal} - { data.waktu }</Card.Meta>
                    <Card.Description>
                    { data.isi }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='blue' onClick={() => onUpdate(data)}>
                        Ubah
                    </Button>
                    <Button basic color='red' onClick={() => onRemove(data.id)}>
                        Hapus
                    </Button>
                    </div>
                </Card.Content>
            </Card>
        </Card.Group>
    );
}

export default CatatanComponent;