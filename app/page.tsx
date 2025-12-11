/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Main entry point for the game application
 * - Manage team setup and game mode toggle
 * - Persist teams to localStorage for cross-session continuity
 *
 * PATTERNS USED:
 * - Container Component - Manages state and delegates to TeamSetup/RoundController
 * - State Persistence - localStorage for team data
 *
 * NOTES FOR CONTRIBUTORS:
 * - Shows TeamSetup when no teams configured
 * - Shows RoundController when teams are ready
 * - Reset button clears all state and reloads page
 */

"use client";

import { useState, useEffect } from "react";
import TeamSetup from "@/components/TeamSetup/TeamSetup";
import RoundController from "@/components/RoundController/RoundController";
import type { Team } from "@/lib/types";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import './page.scss';

export default function Home() {
  const [teams, setTeams] = useState<Team[] | null>(null);

  // Carica le squadre da localStorage al mount
  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) {
      try {
        setTeams(JSON.parse(savedTeams));
      } catch (error) {
        console.error("Errore nel caricamento delle squadre:", error);
        localStorage.removeItem("teams");
      }
    }
  }, []);

  const handleStart = (newTeams: Team[]) => {
    setTeams(newTeams);
    // Salva in localStorage per persistenza
    localStorage.setItem("teams", JSON.stringify(newTeams));
  };

  const handleUpdateTeams = (updatedTeams: Team[]) => {
    setTeams(updatedTeams);
    // Aggiorna localStorage
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const handleReset = () => {
    Modal.confirm({
      title: "Ricomincia da capo",
      icon: <ExclamationCircleOutlined />,
      content: "Sei sicuro di voler ricominciare da capo? Tutti i progressi andranno persi.",
      okText: "Sì, ricomincia",
      cancelText: "Annulla",
      okType: "danger",
      onOk() {
        setTeams(null);
        localStorage.removeItem("teams");
        localStorage.removeItem("gameState");
        // Ricarica la pagina per resettare tutto
        window.location.reload();
      },
    });
  };

  return (
    <main className="home__main">
      {!teams ? (
        <TeamSetup onStart={handleStart} />
      ) : (
        <>
          <RoundController teams={teams} onUpdateTeams={handleUpdateTeams} />
          <button onClick={handleReset} className="home__reset-button">
            Ricomincia da capo
          </button>
        </>
      )}
    </main>
  );
}
