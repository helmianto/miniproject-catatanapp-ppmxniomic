import axios from 'axios';
import {OnlineRoot, OfflineRoot} from './Config';

const Delete = (path, root) => {
    let checkRoot = (root == false) ? OfflineRoot : OnlineRoot;
    const promise = new Promise((resolve, reject) => {
        axios.delete(checkRoot + '/' + path)
        .then((result) => {
            resolve(result.data);
        }, (err) => {
            reject(err);
        })
    })
    return promise;
}

export default Delete;