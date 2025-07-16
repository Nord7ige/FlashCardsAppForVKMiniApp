import React, { useState } from 'react';
import { Card, Div, Button, Title } from '@vkontakte/vkui';

const FlashCard = ({ word, onKnow, onDontKnow }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card 
      mode="shadow"
      style={{
        margin: '10px 0',
        padding: '20px',
        minHeight: '200px',
        cursor: 'pointer',
        perspective: '1000px',
      }}
      onClick={() => setIsFlipped(prev => !prev)}
    >
      <Div style={{
        backfaceVisibility: 'hidden',
        transform: isFlipped ? 'rotateY(180deg)' : 'none',
        transition: 'transform 0.6s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Title level="2" style={{ textAlign: 'center', marginBottom: isFlipped ? '20px' : 0 }}>
          {isFlipped ? word.translation : word.original}
        </Title>
        
        {isFlipped && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button size="m" mode="secondary"
              onClick={(e) => { e.stopPropagation(); onDontKnow(); setIsFlipped(false); }}
            >
              Не знаю
            </Button>
            <Button size="m" mode="primary"
              onClick={(e) => { e.stopPropagation(); onKnow(); setIsFlipped(false); }}
            >
              Знаю
            </Button>
          </div>
        )}
      </Div>
    </Card>
  );
};

export default FlashCard;
