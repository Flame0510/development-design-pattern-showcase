"use client";

import { useState, useEffect } from "react";
import type { Category, PatternExample, Team } from "@/lib/types";
import {
  getRandomExampleByPatternCount,
} from "@/lib/examples";
import ExampleViewer from "./ExampleViewer";
import styles from "./RoundController.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setTeams,
  setCurrentExample,
  setSelectedCategory,
  setSelectedPatternCount,
  revealSolution,
  awardPoint,
  nextRound,
} from "@/lib/store/gameSlice";

interface RoundControllerProps {
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
}

export default function RoundController({ teams, onUpdateTeams }: RoundControllerProps) {
  const dispatch = useAppDispatch();
  const {
    roundNumber,
    usedExampleIds,
    currentExample,
    selectedCategory,
    selectedPatternCount,
    solutionRevealed,
  } = useAppSelector((state) => state.game);

  // Sincronizza teams con Redux
  useEffect(() => {
    dispatch(setTeams(teams));
  }, [teams, dispatch]);

  const handleCategorySelect = (category: Category | "all") => {
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedPatternCount(null)); // Reset pattern count quando cambia categoria
  };

  const handlePatternCountSelect = (count: 1 | 2 | 3) => {
    dispatch(setSelectedPatternCount(count));
  };

  const handleShowExample = () => {
    if (!selectedCategory || !selectedPatternCount) return;

    const categoryFilter = selectedCategory === "all" ? null : selectedCategory;
    const usedIdsSet = new Set(usedExampleIds);
    const example = getRandomExampleByPatternCount(
      selectedPatternCount,
      categoryFilter,
      usedIdsSet
    );

    if (example) {
      dispatch(setCurrentExample(example));
    } else {
      alert(
        "Nessun esempio disponibile con questi criteri! Prova un'altra combinazione o ricarica la pagina."
      );
    }
  };

  const handleRevealSolution = () => {
    dispatch(revealSolution());
  };

  const handleAwardPoint = (teamId: string) => {
    dispatch(awardPoint(teamId));
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, score: team.score + 1 } : team
    );
    onUpdateTeams(updatedTeams);
    handleNextRound();
  };

  const handleNextRound = () => {
    dispatch(nextRound());
  };

  return (
    <div className={styles.container}>
      {/* Scoreboard sempre visibile */}
      <div className={styles.scoreboard}>
        <h3 className={styles.scoreboardTitle}>Classifica</h3>
        <div className={styles.teamScores}>
          {[...teams]
            .sort((a, b) => b.score - a.score)
            .map((team, index) => (
              <div key={team.id} className={styles.teamScore}>
                <div className={styles.teamRank}>#{index + 1}</div>
                <div className={styles.teamScoreInfo}>
                  <div
                    className={styles.teamScoreColor}
                    style={{ backgroundColor: team.color }}
                  />
                  <span className={styles.teamScoreName}>{team.name}</span>
                </div>
                <div className={styles.teamScorePoints}>
                  {team.score} {team.score === 1 ? "punto" : "punti"}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={styles.header}>
        <h2 className={styles.roundTitle}>Round {roundNumber}</h2>
        <button
          onClick={() => window.open('/match-viewer', 'MatchViewer', 'width=1400,height=900')}
          className={styles.viewerButton}
          title="Apri Match Viewer in una nuova finestra"
        >
          🖥️ Match Viewer
        </button>
      </div>

      {!currentExample ? (
        <div className={styles.categorySelection}>
          <h3 className={styles.selectionTitle}>
            Scegli la categoria per questo round:
          </h3>

          <div className={styles.categoryButtons}>
            <button
              onClick={() => handleCategorySelect("creational")}
              className={`${styles.categoryButton} ${
                selectedCategory === "creational" ? styles.selected : ""
              }`}
            >
              <span className={styles.categoryIcon}>🏗️</span>
              Creational
            </button>

            <button
              onClick={() => handleCategorySelect("structural")}
              className={`${styles.categoryButton} ${
                selectedCategory === "structural" ? styles.selected : ""
              }`}
            >
              <span className={styles.categoryIcon}>🔧</span>
              Structural
            </button>

            <button
              onClick={() => handleCategorySelect("behavioral")}
              className={`${styles.categoryButton} ${
                selectedCategory === "behavioral" ? styles.selected : ""
              }`}
            >
              <span className={styles.categoryIcon}>⚡</span>
              Behavioral
            </button>

            <button
              onClick={() => handleCategorySelect("all")}
              className={`${styles.categoryButton} ${styles.allButton} ${
                selectedCategory === "all" ? styles.selected : ""
              }`}
            >
              <span className={styles.categoryIcon}>🎲</span>
              Tutte le categorie
            </button>
          </div>

          {selectedCategory && (
            <>
              <h3 className={styles.selectionTitle} style={{ marginTop: '2rem' }}>
                Quanti pattern deve contenere l'esempio?
              </h3>
              <div className={styles.patternCountButtons}>
                <button
                  onClick={() => handlePatternCountSelect(1)}
                  className={`${styles.patternCountButton} ${
                    selectedPatternCount === 1 ? styles.selected : ""
                  }`}
                >
                  <span className={styles.patternCountNumber}>1</span>
                  <span className={styles.patternCountLabel}>Pattern singolo</span>
                </button>

                <button
                  onClick={() => handlePatternCountSelect(2)}
                  className={`${styles.patternCountButton} ${
                    selectedPatternCount === 2 ? styles.selected : ""
                  }`}
                >
                  <span className={styles.patternCountNumber}>2</span>
                  <span className={styles.patternCountLabel}>Pattern combinati</span>
                </button>

                <button
                  onClick={() => handlePatternCountSelect(3)}
                  className={`${styles.patternCountButton} ${
                    selectedPatternCount === 3 ? styles.selected : ""
                  }`}
                >
                  <span className={styles.patternCountNumber}>3</span>
                  <span className={styles.patternCountLabel}>Pattern avanzati</span>
                </button>
              </div>
            </>
          )}

          {selectedCategory && selectedPatternCount && (
            <button
              onClick={handleShowExample}
              className={styles.showExampleButton}
            >
              Mostra esempio
            </button>
          )}
        </div>
      ) : (
        <>
          <ExampleViewer
            example={currentExample}
            solutionRevealed={solutionRevealed}
            onRevealSolution={handleRevealSolution}
          />

          {solutionRevealed && (
            <div className={styles.awardPoints}>
              <h3 className={styles.awardTitle}>
                Assegna il punto alla squadra che ha risposto correttamente:
              </h3>
              <div className={styles.awardButtons}>
                {teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleAwardPoint(team.id)}
                    className={styles.awardButton}
                    style={{ borderColor: team.color }}
                  >
                    <div
                      className={styles.awardButtonColor}
                      style={{ backgroundColor: team.color }}
                    />
                    <span>{team.name}</span>
                    <span className={styles.awardButtonScore}>
                      ({team.score})
                    </span>
                  </button>
                ))}
                <button
                  onClick={handleNextRound}
                  className={styles.skipButton}
                >
                  Nessuna risposta corretta →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className={styles.stats}>
        <p>Esempi usati: {usedExampleIds.size}</p>
      </div>
    </div>
  );
}
