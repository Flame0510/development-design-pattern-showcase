/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Control game rounds and category selection
 * - Display live scoreboard and round statistics
 * - Manage example display and solution reveal
 * - Award points to teams and advance to next round
 *
 * PATTERNS USED:
 * - Container/Presentational Split - Manages state and logic, delegates UI to ExampleViewer
 * - Redux Toolkit Slice Pattern - Dispatches actions to centralized game state
 * - Observer Pattern - Syncs teams with Redux on prop changes
 *
 * NOTES FOR CONTRIBUTORS:
 * - All game state is managed via Redux (roundNumber, currentExample, etc.)
 * - Teams prop synced to Redux for cross-window communication
 * - Category and pattern count selection determines example filtering
 * - Match Viewer opens in popup window for second-screen experience
 */

"use client";

import { useState, useEffect } from "react";
import type { Category, PatternExample, Team } from "@/lib/types";
import { getRandomExampleByPatternCount } from "@/lib/examples";
import ExampleViewer from "../ExampleViewer/ExampleViewer";
import { Card, Button } from "antd";
import {
    TrophyOutlined,
    EyeOutlined,
    ToolOutlined,
    BlockOutlined,
    ThunderboltOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";
import "./RoundController.scss";
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

    // PATTERN: Observer Pattern - Sync teams with Redux when props change
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
        <div className="round-controller">
            {/* Scoreboard Card */}
            <Card className="round-controller__scoreboard">
                <div className="round-controller__scoreboard-header">
                    <TrophyOutlined className="round-controller__scoreboard-icon" />
                    <h2 className="round-controller__scoreboard-title">Classifica</h2>
                </div>
                <div className="round-controller__team-scores">
                    {[...teams]
                        .sort((a, b) => b.score - a.score)
                        .map((team, index) => (
                            <div key={team.id} className="round-controller__team-score">
                                <div className="round-controller__team-score-info">
                                    <span className="round-controller__team-rank">
                                        #{index + 1}
                                    </span>
                                    <div
                                        className="round-controller__team-color"
                                        style={{ backgroundColor: team.color }}
                                    />
                                    <span className="round-controller__team-name">
                                        {team.name}
                                    </span>
                                </div>
                                <span className="round-controller__team-points">
                                    {team.score} {team.score === 1 ? "punto" : "punti"}
                                </span>
                            </div>
                        ))}
                </div>
            </Card>

            {/* Header with Round Number and Match Viewer */}
            <div className="round-controller__header">
                <h2 className="round-controller__round-title">Round {roundNumber}</h2>
                <Button
                    className="round-controller__viewer-button"
                    icon={<EyeOutlined />}
                    onClick={() =>
                        window.open(
                            "/match-viewer",
                            "MatchViewer",
                            "width=1400,height=900"
                        )
                    }
                >
                    Match Viewer
                </Button>
            </div>

            {!currentExample ? (
                <Card className="round-controller__category-selection">
                    <div className="round-controller__selection-content">
                        {/* Category Selection */}
                        <div>
                            <h3 className="round-controller__selection-title">
                                Scegli la categoria:
                            </h3>
                            <div className="round-controller__category-buttons">
                                <button
                                    onClick={() => handleCategorySelect("creational")}
                                    className={`round-controller__category-button ${
                                        selectedCategory === "creational"
                                            ? "round-controller__category-button--selected"
                                            : ""
                                    }`}
                                >
                                    <ToolOutlined className="round-controller__category-icon" />
                                    <span>Creazionali</span>
                                </button>
                                <button
                                    onClick={() => handleCategorySelect("structural")}
                                    className={`round-controller__category-button ${
                                        selectedCategory === "structural"
                                            ? "round-controller__category-button--selected"
                                            : ""
                                    }`}
                                >
                                    <BlockOutlined className="round-controller__category-icon" />
                                    <span>Strutturali</span>
                                </button>
                                <button
                                    onClick={() => handleCategorySelect("behavioral")}
                                    className={`round-controller__category-button ${
                                        selectedCategory === "behavioral"
                                            ? "round-controller__category-button--selected"
                                            : ""
                                    }`}
                                >
                                    <ThunderboltOutlined className="round-controller__category-icon" />
                                    <span>Comportamentali</span>
                                </button>
                                <button
                                    onClick={() => handleCategorySelect("all")}
                                    className={`round-controller__category-button round-controller__category-button--all ${
                                        selectedCategory === "all"
                                            ? "round-controller__category-button--selected"
                                            : ""
                                    }`}
                                >
                                    <AppstoreOutlined className="round-controller__category-icon" />
                                    <span>Tutte le categorie</span>
                                </button>
                            </div>
                        </div>

                        {/* Pattern Count Selection */}
                        {selectedCategory && (
                            <div>
                                <h3 className="round-controller__selection-title">
                                    Quanti pattern deve contenere l'esempio?
                                </h3>
                                <div className="round-controller__pattern-count-buttons">
                                    <button
                                        onClick={() => handlePatternCountSelect(1)}
                                        className={`round-controller__pattern-count-button ${
                                            selectedPatternCount === 1
                                                ? "round-controller__pattern-count-button--selected"
                                                : ""
                                        }`}
                                    >
                                        <div className="round-controller__pattern-count-number">
                                            1
                                        </div>
                                        <div className="round-controller__pattern-count-label">
                                            Pattern singolo
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handlePatternCountSelect(2)}
                                        className={`round-controller__pattern-count-button ${
                                            selectedPatternCount === 2
                                                ? "round-controller__pattern-count-button--selected"
                                                : ""
                                        }`}
                                    >
                                        <div className="round-controller__pattern-count-number">
                                            2
                                        </div>
                                        <div className="round-controller__pattern-count-label">
                                            Pattern combinati
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handlePatternCountSelect(3)}
                                        className={`round-controller__pattern-count-button ${
                                            selectedPatternCount === 3
                                                ? "round-controller__pattern-count-button--selected"
                                                : ""
                                        }`}
                                    >
                                        <div className="round-controller__pattern-count-number">
                                            3
                                        </div>
                                        <div className="round-controller__pattern-count-label">
                                            Pattern avanzati
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Show Example Button */}
                        {selectedCategory && selectedPatternCount && (
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleShowExample}
                                block
                                className="round-controller__show-example-button"
                            >
                                Mostra esempio
                            </Button>
                        )}
                    </div>
                </Card>
            ) : (
                <>
                    <ExampleViewer
                        example={currentExample}
                        solutionRevealed={solutionRevealed}
                        onRevealSolution={handleRevealSolution}
                    />

                    {solutionRevealed && (
                        <Card className="round-controller__award-points">
                            <h3 className="round-controller__award-title">
                                Assegna Punto
                            </h3>
                            <p
                                style={{
                                    textAlign: "center",
                                    marginBottom: "24px",
                                    color: "#475569",
                                }}
                            >
                                Quale squadra ha risposto correttamente?
                            </p>
                            <div className="round-controller__award-buttons">
                                {teams.map((team) => (
                                    <button
                                        key={team.id}
                                        onClick={() => handleAwardPoint(team.id)}
                                        className="round-controller__award-button"
                                        style={{ borderColor: team.color }}
                                    >
                                        <div
                                            className="round-controller__award-button-color"
                                            style={{ backgroundColor: team.color }}
                                        />
                                        <span>{team.name}</span>
                                        <span className="round-controller__award-button-score">
                                            ({team.score})
                                        </span>
                                    </button>
                                ))}
                                <Button
                                    size="large"
                                    onClick={handleNextRound}
                                    className="round-controller__skip-button"
                                >
                                    Nessuna risposta corretta →
                                </Button>
                            </div>
                        </Card>
                    )}
                </>
            )}

            {/* Stats Footer */}
            <div className="round-controller__stats">
                <p>Esempi usati: {usedExampleIds.length}</p>
            </div>
        </div>
    );
}
