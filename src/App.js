import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid, Container, Input } from 'semantic-ui-react';
import API from './services';
import FormComponent from './components/FormComponent';
import CatatanComponent from './components/CatatanComponent';
import { monthNames } from './helpers/helperFunction';
import Swal from 'sweetalert2';
import Toast from './notifications/Toast';

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
  const [showAlertJudul, setShowAlertJudul] = useState(false);
  const [showAlertIsi, setShowAlertIsi] = useState(false);

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
        Toast.fire({
          icon: 'success',
          title: 'Data berhasil diubah'
        })
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
        Toast.fire({
          icon: 'success',
          title: 'Data berhasil ditambahkan'
        })
    });
  }
  
  const handleRemove = (id) => {
    Swal.fire({
      title: 'Yakin ingin menghapus data?',
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
        API.deleteCatatanData(id).then((res) => {
          getPostAPI();
          Toast.fire({
            icon: 'success',
            title: 'Data berhasil dihapus'
          });
        })
      }
    })
  }
  
  const handleUpdate = (data) => {
    setFormCatatan(data);
    setIsUpdate(true);
  }
  
  const handleFormChange = (event) => {
    if (event.target.name === 'judul') setShowAlertJudul(false);
    if (event.target.name === 'isi') setShowAlertIsi(false);
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
      if(formCatatan.judul === '' && formCatatan.isi === ''){
        setShowAlertJudul(true);
        setShowAlertIsi(true);
      } else if(formCatatan.judul === ''){
        setShowAlertJudul(true);
      } else if(formCatatan.isi === ''){
        setShowAlertIsi(true);
      } else {
        putDataToAPi();
      }
    } else {
      if(formCatatan.judul === '' && formCatatan.isi === ''){
        setShowAlertJudul(true);
        setShowAlertIsi(true);
      } else if(formCatatan.judul === ''){
        setShowAlertJudul(true);
      } else if(formCatatan.isi === ''){
        setShowAlertIsi(true);
      } else {
        postDataToAPI();
      }
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
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment textAlign='center' color='teal'>
                  <h4>Form Input Catatan</h4>                 
                </Segment>
                <Segment>
                  <FormComponent 
                    formCatatan={formCatatan}
                    onChange={handleFormChange}
                    onSubmit={handleSubmit}
                    isShowAlertJudul={showAlertJudul}
                    isShowAlertIsi={showAlertIsi}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
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
