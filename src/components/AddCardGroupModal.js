import React, { useState } from 'react';
import { ModalRoot, ModalCard, Input, Button } from '@vkontakte/vkui';

const AddCardGroupModal = ({ visible, onClose, onAddGroup }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onAddGroup(name.trim());
      setName('');
    }
  };

  return (
    <ModalRoot activeModal={visible ? 'addGroup' : null}>
      <ModalCard
        id="addGroup"
        onClose={onClose}
        header="Создание группы"
        actions={[
          <Button key="add" mode="primary" onClick={handleSubmit}>
            Добавить
          </Button>
        ]}
      >
        <Input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Название группы" 
        />
      </ModalCard>
    </ModalRoot>
  );
};

export default AddCardGroupModal;