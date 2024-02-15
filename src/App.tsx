import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import DropDownTree from "./DropDownTree";
import { HesabMoeein } from './Data';
import '@mantine/core/styles.css';
import axios from 'axios'

export default function App() {
  const [data, setData] = useState(HesabMoeein);
  const getData = (api) =>{

    axios.get(api).then(result => {
      return result.data;
  });
}
  return (
    <MantineProvider theme={theme}>
      {/* <DropDownTree data={data}  levels = {['GoroohHesab', 'HesabKol', 'HesabMoeein']}></DropDownTree> */}
      <DropDownTree url= {'http://localhost/Mali/Server/Services/Entity/GetTreeData'} getData = {getData} levels = {['GoroohHesab', 'HesabKol', 'HesabMoeein']}></DropDownTree>
      <Router />
    </MantineProvider>
  );
}
