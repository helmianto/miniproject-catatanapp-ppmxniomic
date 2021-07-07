import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid, Container, Input, Card } from 'semantic-ui-react';
import API from './services';
import FormComponent from './components/FormComponent';
import CatatanComponent from './components/CatatanComponent';
import { monthNames } from './helpers/helperFunction';

const App = () => {
  const [catatan, setCatatan] = useState([]);
  const [formCatatan, setFormCatatan] = useState({
    id: 1,
    judul: '',
    isi: '',
    tanggal: '',
    waktu: ''
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getPostAPI();
  }, [])

  const getPostAPI = () => {
    API.getCatatanData().then(result => {
        // console.log(result, 'Catatan Data');
        setCatatan(result);
    })
  }
  
  const putDataToAPi = () => {
    API.updateCatatanData(formCatatan, formCatatan.id)
    .then((res) => {
        getPostAPI();
        setIsUpdate(false);
        setFormCatatan({
          id: 1,
          judul: '',
          isi: '',
          tanggal: '',
          waktu: ''
        });
    })
  }
  
  const postDataToAPI = () => {
    API.postCatatanData(formCatatan).then((res) => {
        getPostAPI();
        setFormCatatan({
          id: 1,
          judul: '',
          isi: '',
          tanggal: '',
          waktu: ''
        });
    });
  }
  
  const handleRemove = (id) => {
    API.deleteCatatanData(id).then((res) => {
      getPostAPI();
    })
  }
  
  const handleUpdate = (data) => {
    setFormCatatan(data);
    setIsUpdate(true);
  }
  
  const handleFormChange = (event) => {
    let formCatatanNew = {...formCatatan};
    const date = new Date();
    let timestamp = date.getTime();
    if(!isUpdate) formCatatanNew['id'] = timestamp;
    formCatatanNew[event.target.name] = event.target.value;
    formCatatanNew['tanggal'] = date.getDate() +' '+ monthNames[date.getMonth()] +' '+ date.getFullYear();
    formCatatanNew['waktu'] = date.getHours() +':'+ date.getMinutes();
    setFormCatatan(formCatatanNew);
  }
  
  const handleSubmit = () => {
    if(isUpdate) {
      putDataToAPi();
    } else {
      postDataToAPI();
    }
  }

  const handleSearch = (event) => {
    let catatanNew = [];
    let search = event.target.value;
    if (search !== ""){
      catatan.forEach((item, index) => {
        if (item.judul.toLowerCase().includes(search.toLowerCase())){
          catatanNew.push(item);
        }
      });
      setCatatan(catatanNew);
    } else {
      getPostAPI();
    }
  }

  return (
      <div>
        <br />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment textAlign='center' color='teal'>
                  <h4>Form Input Catatan</h4>                 
                </Segment>
                <Segment>
                  <FormComponent 
                    formCatatan={formCatatan}
                    onChange={handleFormChange}
                    onSubmit={handleSubmit}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment textAlign='center' color='teal'>
                  <h4>Data Catatan</h4>                 
                </Segment>
                <Segment>
                  <Input onChange={handleSearch} icon='search' placeholder='Cari Catatan' />
                  <br />
                  <br />                  
                  { catatan.length > 0 ? 
                    catatan.map(data => {
                      return (
                        <CatatanComponent 
                          data={data}
                          onUpdate={handleUpdate}
                          onRemove={handleRemove}
                        />
                      );
                    })
                  : 
                    (
                      <Segment textAlign='center' color='red'>
                        <p>Data Catatan Tidak Ditemukan</p>
                      </Segment>
                    )
                  }          
                </Segment>                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <br />
        <br />
        <br />
      </div>
    );
}

export default App;
