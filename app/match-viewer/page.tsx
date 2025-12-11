"use client";

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { hydrate } from '@/lib/store/gameSlice';
import styles from './page.module.css';

export default function MatchViewer() {
  const dispatch = useAppDispatch();
  const {
    teams,
    roundNumber,
    currentExample,
    solutionRevealed,
    answerHistory,
    roundStartTime,
    isPaused,
  } = useAppSelector((state) => state.game);

  const [elapsedTime, setElapsedTime] = useState(0);

  // Sincronizza con localStorage quando la finestra è in focus
  useEffect(() => {
    const syncFromLocalStorage = () => {
      const savedState = localStorage.getItem('gameState');
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          dispatch(hydrate(state));
        } catch (e) {
          console.error('Errore nel parsing dello state:', e);
        }
      }
    };

    // Sincronizza all'avvio
    syncFromLocalStorage();

    // Ascolta i cambiamenti da altre finestre
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gameState') {
        syncFromLocalStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('gameStateChanged', syncFromLocalStorage);

    // Polling fallback per sicurezza (ogni 500ms)
    const pollingInterval = setInterval(syncFromLocalStorage, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('gameStateChanged', syncFromLocalStorage);
      clearInterval(pollingInterval);
    };
  }, [dispatch]);

  // Timer
  useEffect(() => {
    if (!roundStartTime || isPaused) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - roundStartTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [roundStartTime, isPaused]);

  // Reset timer quando cambia esempio
  useEffect(() => {
    if (roundStartTime) {
      setElapsedTime(0);
    }
  }, [roundStartTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className={styles.matchViewer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>🎮 Match Viewer</h1>
        <div className={styles.roundInfo}>
          <div className={styles.roundNumber}>Round {roundNumber}</div>
          {roundStartTime && (
            <div className={`${styles.timer} ${isPaused ? styles.paused : ''}`}>
              {isPaused ? '⏸️' : '⏱️'} {formatTime(elapsedTime)}
            </div>
          )}
        </div>
      </div>

      {currentExample ? (
        <div className={styles.gridLayout}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Codice Esempio */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>📝 Codice Esempio</h2>
              <div className={styles.exampleTitle}>{currentExample.title}</div>
              <span className={`${styles.categoryBadge} ${styles[currentExample.category]}`}>
                {currentExample.category}
              </span>
              <div className={styles.codeBlock}>
                <pre>{currentExample.code}</pre>
              </div>
            </div>

            {/* Soluzione - Sempre visibile nel Match Viewer */}
            <div className={styles.card}>
              <div className={styles.solutionSection}>
                <h3 className={styles.solutionTitle}>💡 Soluzione</h3>
                <div className={styles.patternList}>
                  {currentExample.solutionPatterns.map((pattern, index) => (
                    <span key={index} className={styles.patternTag}>
                      {pattern}
                    </span>
                  ))}
                </div>
                <p className={styles.explanation}>
                  {currentExample.solutionExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Classifica */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>🏆 Classifica</h2>
              <div className={styles.scoreboard}>
                {sortedTeams.map((team, index) => (
                  <div key={team.id} className={styles.teamScore}>
                    <div className={styles.teamRank}>#{index + 1}</div>
                    <div className={styles.teamInfo}>
                      <div
                        className={styles.teamColor}
                        style={{ backgroundColor: team.color }}
                      />
                      <span className={styles.teamName}>{team.name}</span>
                    </div>
                    <div className={styles.teamPoints}>{team.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiche */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>📊 Statistiche</h2>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{answerHistory.length}</div>
                  <div className={styles.statLabel}>Round completati</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>
                    {answerHistory.length > 0
                      ? Math.floor(
                          answerHistory.reduce((sum, h) => sum + h.timeElapsed, 0) /
                            answerHistory.length
                        )
                      : 0}
                    s
                  </div>
                  <div className={styles.statLabel}>Tempo medio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noData}>
          <div className={styles.noDataIcon}>🎯</div>
          <p>In attesa del prossimo esempio...</p>
        </div>
      )}

      {/* Storico */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>📜 Storico Risposte</h2>
        {answerHistory.length > 0 ? (
          <div className={styles.historyList}>
            {[...answerHistory].reverse().map((item, index) => (
              <div
                key={index}
                className={styles.historyItem}
                style={{ borderLeftColor: item.winnerTeam?.color || '#666' }}
              >
                <div className={styles.historyHeader}>
                  <span className={styles.historyRound}>Round {item.roundNumber}</span>
                  <span className={styles.historyTime}>
                    {formatTime(item.timeElapsed)}
                  </span>
                </div>
                <div className={styles.historyTitle}>{item.example.title}</div>
                <div className={styles.patternList}>
                  {item.example.solutionPatterns.map((pattern, i) => (
                    <span key={i} className={styles.patternTag}>
                      {pattern}
                    </span>
                  ))}
                </div>
                {item.winnerTeam && (
                  <div className={styles.historyWinner}>
                    <div
                      className={styles.winnerColor}
                      style={{ backgroundColor: item.winnerTeam.color }}
                    />
                    <span>Vinto da {item.winnerTeam.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
            Nessuna risposta registrata ancora
          </div>
        )}
      </div>
    </div>
  );
}
