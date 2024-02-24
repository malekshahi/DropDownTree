import React, { useState } from 'react';
import { TextInput, Button, CloseButton, Modal, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import GeminiTree from './GeminiTree';
import './index.css';

function DropDownTree(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedValue, setSelectedValue] = useState('');

  const onItemSelected = (item) => {
    setSelectedItem(item);
  };

  const onOk = (e) => {
    setSelectedValue(selectedItem ? selectedItem.Title : '');
    close();
  };

  const resetSelectedItem = () => {
    setSelectedValue('');
    setSelectedItem(null);
}
  return (
    <>
      <TextInput label="حساب معین" value={selectedValue} disabled />
      <Button onClick={open}>...</Button>
      {selectedValue != '' && <CloseButton onClick={resetSelectedItem} />}
      <Modal opened={opened} onClose={close} title="حساب معین" centered>
        <GeminiTree
          levels={props.levels}
          data={props.data}
          getData={props.getData}
          url = {props.url}
          selectedItem={selectedItem}
          onItemSelected={onItemSelected}
        ></GeminiTree>
      <Tooltip label="یک حساب معین را انتخاب کنید">
        <Button onClick={(e) => onOk(e)} disabled={!(selectedItem && selectedItem.Level == 'HesabMoeein') }  >OK</Button>
      </Tooltip>
        
        <Button onClick={close}>Cancel</Button>
      </Modal>
    </>
  );
}

export default DropDownTree;
