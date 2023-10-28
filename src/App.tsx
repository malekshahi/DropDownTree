import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import DropDownTree from "./DropDownTree";
import { HesabMoeein } from './Data';
import '@mantine/core/styles.css';

export default function App() {
  const [data, setData] = useState(HesabMoeein);
  return (
    <MantineProvider theme={theme}>
      <DropDownTree data={data}  levels = {['GoroohHesab', 'HesabKol', 'HesabMoeein']}></DropDownTree>
      <Router />
    </MantineProvider>
  );
}
