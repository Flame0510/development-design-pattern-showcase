"use client";

import { useState, useEffect } from "react";
import TeamSetup from "@/components/TeamSetup";
import RoundController from "@/components/RoundController";
import type { Team } from "@/lib/types";
import styles from "./page.module.css";

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
    if (confirm("Sei sicuro di voler ricominciare da capo?")) {
      setTeams(null);
      localStorage.removeItem("teams");
      // Ricarica la pagina per resettare tutto
      window.location.reload();
    }
  };

  return (
    <main className={styles.main}>
      {!teams ? (
        <TeamSetup onStart={handleStart} />
      ) : (
        <>
          <RoundController teams={teams} onUpdateTeams={handleUpdateTeams} />
          <button onClick={handleReset} className={styles.resetButton}>
            Ricomincia da capo
          </button>
        </>
      )}
    </main>
  );
}
