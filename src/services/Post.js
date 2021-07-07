import axios from 'axios';
import {OnlineRoot, OfflineRoot} from './Config';

const Post = (path, root, data) => {
    const promise = new Promise((resolve, reject) => {
        let checkRoot = (root == false) ? OfflineRoot : OnlineRoot;
        axios.post(checkRoot + '/' + path, data)
        .then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        })
    })
    return promise;
}

export default Post;