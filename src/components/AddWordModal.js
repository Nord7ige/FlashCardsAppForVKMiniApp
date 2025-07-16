import React, { useState } from 'react';
import { ModalCard, FormItem, Input, Button } from '@vkontakte/vkui';

const AddWordModal = ({ visible = false, onClose = () => {}, onAddWord = () => {} }) => {
  const [original, setOriginal] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!original.trim() || !translation.trim()) || isLoading) return;

    setIsLoading(true);
    try {
      await onAddWord(original.trim(), translation.trim());
      setOriginal('');
      setTranslation('');
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error('Error adding word:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <ModalCard
      id="add-word-modal"
      onClose={onClose}
      header="Добавить новое слово"
      actions={
        <Button 
          size="l" 
          mode="primary" 
          type="submit"
          onClick={handleSubmit}
          disabled={!original.trim() || !translation.trim() || isLoading}
          loading={isLoading}
        >
          Добавить
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormItem top="Слово" htmlFor="original-word">
          <Input 
            id="original-word"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="На иностранном языке"
            autoFocus
            maxLength={50}
          />
        </FormItem>
        <FormItem top="Перевод" htmlFor="translation">
          <Input 
            id="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="На русском"
            maxLength={50}
          />
        </FormItem>
      </form>
    </ModalCard>
  );
};

export default AddWordModal;
