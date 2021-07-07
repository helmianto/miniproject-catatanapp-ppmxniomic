import Delete from './Delete';
import Get from './Get';
import Post from './Post';
import Put from './Put';

//POST
const postCatatanData = (data) => Post('data-catatan', false, data);

//PUT
const updateCatatanData = (data, id) => Put('data-catatan/'+ id, false, data);

// GET
const getCatatanData = () => Get('data-catatan?_sort=id&_order=desc', false);

// DELETE
const deleteCatatanData = (id) => Delete('data-catatan/'+ id, false);

const API = {
    postCatatanData,
    updateCatatanData,
    getCatatanData,
    deleteCatatanData
}

export default API;

