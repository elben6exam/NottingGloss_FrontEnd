//import logo from './logo.svg';
import './App.css';
import { Button, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'

import {Popover } from 'antd';

class App extends React.Component {

  render() {
    var result = [];
    if(this.state){
      const data = this.state.data['data'];
      for (var i = 0; i < data.length; i++) {
        if(data[i].is_display === false){
          result.push(<div>{data[i]['word']}</div>);
        }
        else{
          result.push(   
          
            <Popover content={data[i]['definition']} title="Title" trigger="hover">
             {data[i].word}
            </Popover>
          ) ;
        }

      }
    }
    

    return (
      <div>
        <Upload
        accept=".txt"
        showUploadList={false}
        beforeUpload={file => {
        const reader = new FileReader();

        reader.onload = e => {
          var content = e.target.result;
          console.log(content);
          var myParams = {
            data: content
          } 
          axios.post('http://127.0.0.1:5000/upload_text', myParams)
            .then((response) =>{
              const res =response.data
              console.log(res)
              this.setState({
                data: res
              });
            })
            .catch(error => console.log(error));
            
        };
        reader.readAsText(file);

        // Prevent upload
        return false;}}>
         <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {result}  
      </div>
      
    )}
}

export default App;
