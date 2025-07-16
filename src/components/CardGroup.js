import React, { useState } from 'react';
import { Card, Div, Button, Textarea, Title } from '@vkontakte/vkui';

const CardGroup = ({ group, onAddWord, onMarkWord, onDeleteGroup, onDeleteWord }) => {
  const [foreign, setForeign] = useState('');
  const [native, setNative] = useState('');

  const handleAddWord = () => {
    if (!foreign.trim() || !native.trim()) return;
    onAddWord(group.id, { 
      id: Date.now(), 
      foreign, 
      native, 
      known: false, 
      lastShown: undefined 
    });
    setForeign('');
    setNative('');
  };

  return (
    <Div style={{ marginBottom: 24, border: '2px solid #ccc', borderRadius: 12, padding: 16 }}>
      <Title level="2" style={{ marginBottom: 8 }}>{group.name}</Title>

      {group.words.map(word => (
        <Card key={word.id} mode="shadow" style={{ padding: 12, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div><strong>{word.foreign}</strong> — {word.native}</div>
              <div style={{ fontSize: 12, color: '#888' }}>
                {word.known ? 'Изучено' : 'Не изучено'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="s" mode="secondary" onClick={() => onMarkWord(group.id, word.id)}>
                {word.known ? '↺' : '✓'}
              </Button>
              <Button size="s" mode="destructive" onClick={() => onDeleteWord(group.id, word.id)}>✕</Button>
            </div>
          </div>
        </Card>
      ))}

      <Textarea 
        placeholder="Слово на иностранном языке" 
        value={foreign} 
        onChange={e => setForeign(e.target.value)} 
        style={{ marginBottom: 8 }} 
      />
      <Textarea 
        placeholder="Перевод на русском" 
        value={native} 
        onChange={e => setNative(e.target.value)} 
        style={{ marginBottom: 8 }} 
      />
      <Button size="m" mode="primary" onClick={handleAddWord}>Добавить слово</Button>

      <Div style={{ marginTop: 12 }}>
        <Button size="s" mode="destructive" onClick={() => onDeleteGroup(group.id)}>
          Удалить группу
        </Button>
      </Div>
    </Div>
  );
};

export default CardGroup;