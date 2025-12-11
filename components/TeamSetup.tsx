"use client";

import { useState } from "react";
import type { Team } from "@/lib/types";
import styles from "./TeamSetup.module.css";

interface TeamSetupProps {
  onStart: (teams: Team[]) => void;
}

const TEAM_COLORS = [
  "#4a90e2", // Blu
  "#e74c3c", // Rosso
  "#2ecc71", // Verde
  "#f39c12", // Arancione
  "#9b59b6", // Viola
  "#1abc9c", // Turchese
  "#34495e", // Grigio scuro
  "#e91e63", // Rosa
];

export default function TeamSetup({ onStart }: TeamSetupProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState("");

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim() && teams.length < TEAM_COLORS.length) {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: newTeamName.trim(),
        score: 0,
        color: TEAM_COLORS[teams.length],
      };
      setTeams([...teams, newTeam]);
      setNewTeamName("");
    }
  };

  const handleRemoveTeam = (teamId: string) => {
    setTeams(teams.filter((t) => t.id !== teamId));
  };

  const handleStart = () => {
    if (teams.length > 0) {
      onStart(teams);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Design Pattern Trainer</h1>
      <p className={styles.subtitle}>
        Esercitazioni sui pattern GoF per squadre
      </p>

      <div className={styles.teamsSection}>
        <h2 className={styles.sectionTitle}>Squadre partecipanti</h2>

        {teams.length > 0 && (
          <div className={styles.teamsList}>
            {teams.map((team) => (
              <div
                key={team.id}
                className={styles.teamCard}
                style={{ borderLeftColor: team.color }}
              >
                <div className={styles.teamInfo}>
                  <div
                    className={styles.teamColor}
                    style={{ backgroundColor: team.color }}
                  />
                  <span className={styles.teamName}>{team.name}</span>
                </div>
                <button
                  onClick={() => handleRemoveTeam(team.id)}
                  className={styles.removeBtn}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleAddTeam} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Nome nuova squadra..."
              className={styles.input}
              disabled={teams.length >= TEAM_COLORS.length}
            />
            <button
              type="submit"
              disabled={!newTeamName.trim() || teams.length >= TEAM_COLORS.length}
              className={styles.addBtn}
            >
              + Aggiungi squadra
            </button>
          </div>
          {teams.length >= TEAM_COLORS.length && (
            <p className={styles.maxTeamsWarning}>
              Numero massimo di squadre raggiunto ({TEAM_COLORS.length})
            </p>
          )}
        </form>
      </div>

      {teams.length > 0 && (
        <button onClick={handleStart} className={styles.startBtn}>
          Inizia esercizio ({teams.length} squadra{teams.length > 1 ? "e" : ""})
        </button>
      )}

      {teams.length === 0 && (
        <p className={styles.emptyState}>
          Aggiungi almeno una squadra per iniziare
        </p>
      )}
    </div>
  );
}
