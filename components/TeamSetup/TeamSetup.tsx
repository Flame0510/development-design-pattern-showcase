/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Configure teams before starting the game
 * - Add/remove teams with auto-assigned colors
 * - Validate team setup and start game
 *
 * PATTERNS USED:
 * - Container/Presentational Split - Manages team state and setup logic
 * - Controlled Components - Form inputs controlled by React state
 * - Strategy Pattern - Auto-assigns colors from predefined palette
 * - BEM Convention - Clean CSS naming without modules
 *
 * NOTES FOR CONTRIBUTORS:
 * - Teams are auto-assigned colors from TEAM_COLORS array
 * - Maximum 8 teams supported (limited by color palette)
 * - Team IDs generated with timestamp for uniqueness
 * - Form submission creates new team and resets input
 * - All styles in TeamSetup.scss with BEM naming
 */

"use client";

import { useState } from "react";
import type { Team } from "@/lib/types";
import { Card, Form, Input, Button, Space, Typography, Badge } from "antd";
import { PlusOutlined, DeleteOutlined, RocketOutlined } from "@ant-design/icons";
import './TeamSetup.scss';

const { Title, Paragraph, Text } = Typography;

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
  const [form] = Form.useForm();

  // PATTERN: Controlled Component - Form values managed by state
  const handleAddTeam = () => {
    if (newTeamName.trim() && teams.length < TEAM_COLORS.length) {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: newTeamName.trim(),
        score: 0,
        color: TEAM_COLORS[teams.length],
      };
      setTeams([...teams, newTeam]);
      setNewTeamName("");
      form.resetFields();
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
    <div className="team-setup">
      <div className="team-setup__header">
        <h1 className="team-setup__header-title">Design Pattern Showcase</h1>
        <p className="team-setup__header-subtitle">
          Interactive learning platform for software design patterns
        </p>
      </div>

      <Card 
        title={
          <div className="team-setup__card-title">
            <Badge count={teams.length} showZero />
            <span>Squadre Partecipanti</span>
          </div>
        }
        className="team-setup__card"
      >
        <Space orientation="vertical" size="large" className="w-full">
          {/* Teams List */}
          {teams.length > 0 && (
            <div className="team-setup__list">
              {teams.map((team) => (
                <div key={team.id} className="team-setup__list-item">
                  <div className="team-setup__list-item-content">
                    <div
                      className="team-setup__team-avatar"
                      style={{ backgroundColor: team.color }}
                    />
                    <div className="team-setup__list-item-info">
                      <Text strong className="team-setup__team-name">{team.name}</Text>
                      <span className="team-setup__team-color">Colore: {team.color}</span>
                    </div>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveTeam(team.id)}
                  >
                    Rimuovi
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add Team Form */}
          <Form
            form={form}
            layout="inline"
            onFinish={handleAddTeam}
            className="team-setup__form"
          >
            <Form.Item
              name="teamName"
              className="team-setup__form-input"
              rules={[
                { required: true, message: 'Inserisci un nome per la squadra' },
                { min: 2, message: 'Il nome deve essere almeno 2 caratteri' }
              ]}
            >
              <Input
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Nome nuova squadra..."
                size="large"
                disabled={teams.length >= TEAM_COLORS.length}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                size="large"
                disabled={teams.length >= TEAM_COLORS.length}
              >
                Aggiungi
              </Button>
            </Form.Item>
          </Form>

          {teams.length >= TEAM_COLORS.length && (
            <Text type="warning" className="team-setup__warning">
              Numero massimo di squadre raggiunto ({TEAM_COLORS.length})
            </Text>
          )}
        </Space>
      </Card>

      {/* Start Button */}
      {teams.length > 0 ? (
        <Button
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          onClick={handleStart}
          block
          className="team-setup__start-button"
        >
          Inizia Esercizio ({teams.length} squadra{teams.length > 1 ? "e" : ""})
        </Button>
      ) : (
        <Card className="team-setup__empty-state">
          <Paragraph type="secondary">
            Aggiungi almeno una squadra per iniziare
          </Paragraph>
        </Card>
      )}
    </div>
  );
}
