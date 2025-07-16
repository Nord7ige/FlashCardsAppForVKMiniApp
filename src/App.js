
//Работает (15.07.2025 12:45)

import React, { useState } from 'react';
import {
  AppRoot,
  View,
  Panel,
  PanelHeader,
  Button,
  Group,
  Header,
  Div,
  Spinner,
  SplitLayout,
  SplitCol,
  Title
} from '@vkontakte/vkui';

import { useCardGroups } from './hooks/useCardGroups';
import CardGroup from './components/CardGroup';
import AddCardGroupModal from './components/AddCardGroupModal';
import ProgressBar from './components/ProgressBar';

const App = () => {
  const {
    cardGroups,
    achievements,
    userStats,
    isLoading,
    addCardGroup,
    deleteCardGroup,
    addWordToGroup,
    markWord,
    deleteWord
  } = useCardGroups();

  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const handleAddGroup = (name) => {
    addCardGroup(name);
    setShowAddGroupModal(false);
  };

  return (
    <AppRoot>
      <SplitLayout modal={
        <AddCardGroupModal
          visible={showAddGroupModal}
          onClose={() => setShowAddGroupModal(false)}
          onAddGroup={handleAddGroup}
        />
      }>
        <SplitCol width="100%" maxWidth="720px" stretchedOnMobile autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>
                <Div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <Title level="1" style={{ margin: 0, fontSize: '18px' }}>
                    FlashCards - Учите слова легко
                  </Title>
                  <Button
                    mode="tertiary"
                    size="s"
                    disabled
                    style={{ pointerEvents: 'none', fontWeight: 'bold' }}
                  >
                    🏆 {achievements.length}/6
                  </Button>
                </Div>
              </PanelHeader>

              {/* Блок прогресса и стрика */}
              <Group>
                <ProgressBar
                  progress={{
                    level: Math.floor(userStats.totalXp / 100),
                    xp: userStats.totalXp % 100,
                    xpToNextLevel: 100
                  }}
                  stats={userStats}
                />
              </Group>

              {/* Блок достижений */}
              <Group header={<Header mode="primary">Список достижений</Header>}>
                <Div style={{
                  backgroundColor: 'var(--vkui--color_background_secondary)',
                  borderRadius: 12,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}>
                  <div>
                    <span style={{ fontSize: 18 }}>🎯</span>{' '}
                    <b>Первая группа</b><br />
                    <span style={{ color: '#aaa' }}>Создайте свою первую группу карточек</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 18 }}>📚</span>{' '}
                    <b>Словарный запас</b><br />
                    <span style={{ color: '#aaa' }}>Добавьте 5 слов в любую группу</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 18 }}>🏆</span>{' '}
                    <b>Коллекционер</b><br />
                    <span style={{ color: '#aaa' }}>Создайте 3 группы карточек</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 18 }}>🌟</span>{' '}
                    <b>Мастер слов</b><br />
                    <span style={{ color: '#aaa' }}>Выучите 10 слов (отметили как "знаю")</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 18 }}>🔥</span>{' '}
                    <b>Последователь</b><br />
                    <span style={{ color: '#aaa' }}>Занимайтесь 3 дня подряд</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 18 }}>🚀</span>{' '}
                    <b>Преданный ученик</b><br />
                    <span style={{ color: '#aaa' }}>Занимайтесь 7 дней подряд</span>
                  </div>
                </Div>
              </Group>

              {/* Блок с группами карточек */}
              <Group header={<Header mode="primary">Группы карточек</Header>}>
                <Div>
                  <Button
                    mode="primary"
                    size="l"
                    stretched
                    onClick={() => setShowAddGroupModal(true)}
                  >
                    Добавить группу
                  </Button>
                </Div>

                {isLoading ? (
                  <Div style={{ textAlign: 'center' }}><Spinner /></Div>
                ) : cardGroups.length === 0 ? (
                  <Div style={{ textAlign: 'center', paddingTop: 32 }}>
                    <Title level="3">Нет групп карточек</Title>
                    <div style={{ color: '#888', marginTop: 8 }}>
                      Создайте первую группу, чтобы начать учить слова!
                    </div>
                  </Div>
                ) : (
                  cardGroups.map(group => (
                    <CardGroup
                      key={group.id}
                      group={group}
                      onAddWord={addWordToGroup}
                      onMarkWord={markWord}
                      onDeleteGroup={deleteCardGroup}
                      onDeleteWord={deleteWord}
                    />
                  ))
                )}
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
