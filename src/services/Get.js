import axios from 'axios';
import {OnlineRoot, OfflineRoot} from './Config';

const Get = (path, root) => {
    let checkRoot = (root == false) ? OfflineRoot : OnlineRoot;
    const promise = new Promise((resolve, reject) => {
        axios.get(checkRoot + '/' + path)
        .then((result) => {
            resolve(result.data);
        }, (err) => {
            reject(err);
        })
    })
    return promise;
}

export default Get;