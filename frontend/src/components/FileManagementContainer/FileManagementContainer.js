import React, { Component } from 'react';
import axios from 'axios';

import InnerNav from '../InnerNav/InnerNav';
import FileDisplay from '../FileDisplay/FileDisplay';

class FileManagementContainer extends Component {

    state = {
        filesSelected: []
    }

    stageFiles = (files) => {
        this.setState({filesSelected: files});
    }

    downloadFiles = () => {
        let stagedFiles = this.state.filesSelected;
        if(stagedFiles.length > 0){
            stagedFiles.forEach(fileHash =>{
                window.socket.emit('request_download',
                    window.crypter.encrypt({ Hash: fileHash}),
                    (encryptedDownloadToken) => {
        
                        // Get the project tree.
                        var downloadToken = window.crypter.decrypt(encryptedDownloadToken);
                        console.log(downloadToken);
                        // axios.get(`https://zach.black:3001/download/?token=${downloadToken}`)
                        //     .then((response) =>{
                        //         console.log("Downloaded File!");
                        //     })
                        //     .catch((err) =>{
                        //         console.log("Could not download file");
                        //         console.log(err);
                        //     });
                        // DOWNLOAD URL: https://zach.black:3001/download/?token=<TOKEN HERE>
                    });
            })
        }
    }

    render(){
        
        return(
            <React.Fragment>
                <InnerNav 
                    uploading={this.props.uploading}
                    download={this.downloadFiles.bind(this)}/>
                <FileDisplay 
                    height={this.props.height} 
                    currentStagedFiles={this.state.filesSelected} 
                    stageFiles={this.stageFiles.bind(this)}/>
            </React.Fragment>
        );
    }
}

export default FileManagementContainer;