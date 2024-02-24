import { useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import DropDownTree from "./DropDownTree";
import { HesabMoeein } from './Data';
import '@mantine/core/styles.css';
import axios from 'axios'
import GeminiTree from './GeminiTree';
import 'react-complex-tree/lib/style-modern.css';

export default function App() {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  const [data, setData] = useState(HesabMoeein);
  const getData = (api: any) =>{

    return axios.get(api).then(result => {
      return result.data;
  });
}
  return (
    <MantineProvider theme={theme}>
      <GeminiTree data={data}  levels = {['GoroohHesab', 'HesabKol', 'HesabMoeein']}></GeminiTree>
      {/* <DropDownTree url= {'http://localhost/Mali/Server/Services/Entity/GetTreeData'} getData = {getData} levels = {['GoroohHesab', 'HesabKol', 'HesabMoeein']}></DropDownTree> */}
    </MantineProvider>
  );
}
