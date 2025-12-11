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
import {
  getRandomExampleByPatternCount,
} from "@/lib/examples";
import ExampleViewer from "../ExampleViewer/ExampleViewer";
import { Card, Radio, Button, Space, Statistic, Badge, Divider } from "antd";
import { TrophyOutlined, RocketOutlined, EyeOutlined } from "@ant-design/icons";
import './RoundController.scss';
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
      <Card className="mb-6" title={<><TrophyOutlined className="mr-2" />Classifica</>}>
        <Space vertical size="middle" className="w-full">
          {[...teams]
            .sort((a, b) => b.score - a.score)
            .map((team, index) => (
              <div key={team.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Space>
                  <Badge
                    count={`#${index + 1}`}
                    style={{ backgroundColor: index === 0 ? '#faad14' : '#d9d9d9' }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="font-semibold">{team.name}</span>
                </Space>
                <Statistic
                  value={team.score}
                  suffix={team.score === 1 ? "punto" : "punti"}
                  valueStyle={{ fontSize: '18px' }}
                />
              </div>
            ))}
        </Space>
      </Card>

      {/* Header with Round Number and Match Viewer */}
      <div className="flex items-center justify-between mb-6">
        <Statistic
          title="Round Corrente"
          value={roundNumber}
          prefix={<RocketOutlined />}
          valueStyle={{ color: '#3b82f6' }}
        />
        <Button
          type="dashed"
          icon={<EyeOutlined />}
          onClick={() => window.open('/match-viewer', 'MatchViewer', 'width=1400,height=900')}
        >
          Match Viewer
        </Button>
      </div>

      {!currentExample ? (
        <Card title="Configurazione Round">
          <Space vertical size="large" className="w-full">
            {/* Category Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Scegli la categoria:</h3>
              <Radio.Group
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                buttonStyle="solid"
                size="large"
                className="w-full"
              >
                <Space vertical className="w-full">
                  <Radio.Button value="creational" className="w-full text-center">
                    🏗️ Creational
                  </Radio.Button>
                  <Radio.Button value="structural" className="w-full text-center">
                    🔧 Structural
                  </Radio.Button>
                  <Radio.Button value="behavioral" className="w-full text-center">
                    ⚡ Behavioral
                  </Radio.Button>
                  <Radio.Button value="all" className="w-full text-center">
                    🎲 Tutte le categorie
                  </Radio.Button>
                </Space>
              </Radio.Group>
            </div>

            {/* Pattern Count Selection */}
            {selectedCategory && (
              <>
                <Divider />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Quanti pattern deve contenere l'esempio?</h3>
                  <Radio.Group
                    value={selectedPatternCount}
                    onChange={(e) => handlePatternCountSelect(e.target.value)}
                    buttonStyle="solid"
                    size="large"
                    className="w-full"
                  >
                    <Space vertical className="w-full">
                      <Radio.Button value={1} className="w-full text-center">
                        <div className="py-2">
                          <div className="text-2xl font-bold">1</div>
                          <div className="text-sm">Pattern singolo</div>
                        </div>
                      </Radio.Button>
                      <Radio.Button value={2} className="w-full text-center">
                        <div className="py-2">
                          <div className="text-2xl font-bold">2</div>
                          <div className="text-sm">Pattern combinati</div>
                        </div>
                      </Radio.Button>
                      <Radio.Button value={3} className="w-full text-center">
                        <div className="py-2">
                          <div className="text-2xl font-bold">3</div>
                          <div className="text-sm">Pattern avanzati</div>
                        </div>
                      </Radio.Button>
                    </Space>
                  </Radio.Group>
                </div>
              </>
            )}

            {/* Show Example Button */}
            {selectedCategory && selectedPatternCount && (
              <>
                <Divider />
                <Button
                  type="primary"
                  size="large"
                  onClick={handleShowExample}
                  block
                >
                  Mostra esempio
                </Button>
              </>
            )}
          </Space>
        </Card>
      ) : (
        <>
          <ExampleViewer
            example={currentExample}
            solutionRevealed={solutionRevealed}
            onRevealSolution={handleRevealSolution}
          />

          {solutionRevealed && (
            <Card title="Assegna Punto" className="mt-6">
              <Space vertical size="middle" className="w-full">
                <p className="text-base">Quale squadra ha risposto correttamente?</p>
                <Space vertical className="w-full">
                  {teams.map((team) => (
                    <Button
                      key={team.id}
                      size="large"
                      onClick={() => handleAwardPoint(team.id)}
                      className="w-full"
                      style={{ borderColor: team.color }}
                    >
                      <Space>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                        <span>{team.name}</span>
                        <span className="text-gray-500">({team.score})</span>
                      </Space>
                    </Button>
                  ))}
                  <Button
                    size="large"
                    onClick={handleNextRound}
                    block
                    type="dashed"
                  >
                    Nessuna risposta corretta →
                  </Button>
                </Space>
              </Space>
            </Card>
          )}
        </>
      )}

      {/* Stats Footer */}
      <div className="mt-6 text-center text-gray-500">
        <p>Esempi usati: {usedExampleIds.size}</p>
      </div>
    </div>
  );
}

