/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Second-screen viewer for live game monitoring
 * - Sync with main game window via localStorage and events
 * - Display live scoreboard, timer, and current example
 *
 * PATTERNS USED:
 * - Observer Pattern - localStorage + storage events for cross-window sync
 * - Polling Fallback - 500ms interval ensures sync reliability
 * - Real-time Updates - Timer and state updates every second
 *
 * NOTES FOR CONTRIBUTORS:
 * - Opens in popup window from RoundController
 * - Uses storage events (primary) and polling (fallback)
 * - Dispatches hydrate action to sync Redux state
 * - Timer resets when new example is shown
 */

"use client";

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { hydrate } from '@/lib/store/gameSlice';
import './page.scss';

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
    <div className="match-viewer">
      {/* Header */}
      <div className="match-viewer__header">
        <h1 className="match-viewer__title">🎮 Match Viewer</h1>
        <div className="match-viewer__round-info">
          <div className="match-viewer__round-number">Round {roundNumber}</div>
          {roundStartTime && (
            <div className={isPaused ? 'match-viewer__timer match-viewer__timer--paused' : 'match-viewer__timer'}>
              {isPaused ? '⏸️' : '⏱️'} {formatTime(elapsedTime)}
            </div>
          )}
        </div>
      </div>

      {currentExample ? (
        <div className="match-viewer__grid-layout">
          {/* Main Content */}
          <div className="match-viewer__main-content">
            {/* Codice Esempio */}
            <div className="match-viewer__card">
              <h2 className="match-viewer__card-title">📝 Codice Esempio</h2>
              <div className="match-viewer__example-title">{currentExample.title}</div>
              <span className={`match-viewer__category-badge match-viewer__category-badge--${currentExample.category}`}>
                {currentExample.category}
              </span>
              <div className="match-viewer__code-block">
                <pre>{currentExample.code}</pre>
              </div>
            </div>

            {/* Soluzione - Sempre visibile nel Match Viewer */}
            <div className="match-viewer__card">
              <div className="match-viewer__solution-section">
                <h3 className="match-viewer__solution-title">💡 Soluzione</h3>
                <div className="match-viewer__pattern-list">
                  {currentExample.solutionPatterns.map((pattern, index) => (
                    <span key={index} className="match-viewer__pattern-tag">
                      {pattern}
                    </span>
                  ))}
                </div>
                <p className="match-viewer__explanation">
                  {currentExample.solutionExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="match-viewer__sidebar">
            {/* Classifica */}
            <div className="match-viewer__card">
              <h2 className="match-viewer__card-title">🏆 Classifica</h2>
              <div className="match-viewer__scoreboard">
                {sortedTeams.map((team, index) => (
                  <div key={team.id} className="match-viewer__team-score">
                    <div className="match-viewer__team-rank">#{index + 1}</div>
                    <div className="match-viewer__team-info">
                      <div
                        className="match-viewer__team-color"
                        style={{ backgroundColor: team.color }}
                      />
                      <span className="match-viewer__team-name">{team.name}</span>
                    </div>
                    <div className="match-viewer__team-points">{team.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiche */}
            <div className="match-viewer__card">
              <h2 className="match-viewer__card-title">📊 Statistiche</h2>
              <div className="match-viewer__stats">
                <div className="match-viewer__stat-item">
                  <div className="match-viewer__stat-value">{answerHistory.length}</div>
                  <div className="match-viewer__stat-label">Round completati</div>
                </div>
                <div className="match-viewer__stat-item">
                  <div className="match-viewer__stat-value">
                    {answerHistory.length > 0
                      ? Math.floor(
                          answerHistory.reduce((sum, h) => sum + h.timeElapsed, 0) /
                            answerHistory.length
                        )
                      : 0}
                    s
                  </div>
                  <div className="match-viewer__stat-label">Tempo medio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="match-viewer__no-data">
          <div className="match-viewer__no-data-icon">🎯</div>
          <p>In attesa del prossimo esempio...</p>
        </div>
      )}

      {/* Storico */}
      <div className="match-viewer__card">
        <h2 className="match-viewer__card-title">📜 Storico Risposte</h2>
        {answerHistory.length > 0 ? (
          <div className="match-viewer__history-list">
            {[...answerHistory].reverse().map((item, index) => (
              <div
                key={index}
                className="match-viewer__history-item"
                style={{ borderLeftColor: item.winnerTeam?.color || '#666' }}
              >
                <div className="match-viewer__history-header">
                  <span className="match-viewer__history-round">Round {item.roundNumber}</span>
                  <span className="match-viewer__history-time">
                    {formatTime(item.timeElapsed)}
                  </span>
                </div>
                <div className="match-viewer__history-title">{item.example.title}</div>
                <div className="match-viewer__pattern-list">
                  {item.example.solutionPatterns.map((pattern, i) => (
                    <span key={i} className="match-viewer__pattern-tag">
                      {pattern}
                    </span>
                  ))}
                </div>
                {item.winnerTeam && (
                  <div className="match-viewer__history-winner">
                    <div
                      className="match-viewer__winner-color"
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
