# Match Viewer - Guida

## 🎮 Panoramica

Ho creato una pagina dedicata **Match Viewer** che ti permette di visualizzare la partita in corso su un secondo schermo, con tutte le informazioni in tempo reale.

## ✨ Funzionalità

### Visualizzazione Principale
- **Codice del pattern corrente**: mostra l'esempio di codice completo
- **Categoria e titolo**: badge colorato per categoria (creational/structural/behavioral)
- **Timer in tempo reale**: conta i secondi dall'inizio del round
- **Numero round**: mostra il round attuale

### Soluzione Pattern
Quando riveli la soluzione sulla schermata principale, appare automaticamente anche sul Match Viewer con:
- **Pattern identificati**: badge gialli con i nomi dei pattern
- **Spiegazione dettagliata**: descrizione completa del pattern

### Classifica Live
- **Punteggi aggiornati**: visualizzazione in tempo reale dei punti di ogni squadra
- **Ranking**: le squadre sono ordinate per punteggio
- **Colori personalizzati**: ogni squadra ha il suo colore distintivo

### Storico Risposte
- **Cronologia completa**: tutti i round giocati
- **Tempo di risposta**: quanto tempo ha impiegato ogni squadra
- **Vincitore**: chi ha vinto ogni round
- **Pattern utilizzati**: quali pattern sono stati mostrati

### Statistiche
- **Round completati**: totale round giocati
- **Tempo medio**: media del tempo di risposta per round

## 🚀 Come Usarlo

### 1. Installa le dipendenze Redux
```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Avvia l'applicazione
```bash
npm run dev
```

### 3. Apri il Match Viewer
Nell'interfaccia principale, clicca il pulsante **"🖥️ Match Viewer"** nella barra superiore.

Questo aprirà una nuova finestra popup ottimizzata per un secondo schermo.

### 4. Posiziona la finestra
- Trascina la finestra del Match Viewer sul tuo secondo monitor
- Ingrandisci a schermo intero per una migliore visualizzazione
- La finestra rimane sincronizzata con la partita principale

## 🔄 Sincronizzazione Redux

Tutto è gestito tramite **Redux Toolkit**:

### State Management
- `lib/store/gameSlice.ts`: contiene lo stato del gioco
  - Teams e punteggi
  - Esempio corrente
  - Stato soluzione
  - Storico risposte
  - Timer

### Sincronizzazione Automatica
Ogni azione sulla schermata principale (mostrare esempio, rivelare soluzione, assegnare punti) viene automaticamente riflessa sul Match Viewer in tempo reale.

## 📁 Struttura File Creati

```
lib/store/
├── index.ts          # Configurazione store Redux
├── gameSlice.ts      # Slice con stato e actions del gioco
└── hooks.ts          # Hooks tipizzati per Redux

app/
├── ReduxProvider.tsx      # Provider Redux per l'app
├── layout.tsx             # Layout aggiornato con Redux
└── match-viewer/
    ├── page.tsx           # Componente Match Viewer
    └── page.module.css    # Stili Match Viewer

components/
└── RoundController.tsx    # Aggiornato con Redux
```

## 🎨 Design

Il Match Viewer ha un design moderno con:
- Sfondo gradiente scuro
- Effetti glass morphism
- Colori vivaci per le categorie
- Animazioni fluide
- Layout responsive a griglia

## 💡 Suggerimenti d'Uso

1. **Secondo Monitor**: ideale per proiettori o schermi grandi durante presentazioni
2. **Referee View**: perfetto per l'arbitro che deve controllare le soluzioni
3. **Audience Display**: ottimo per mostrare al pubblico il codice e le statistiche
4. **Backup View**: utile come schermo di backup se quello principale ha problemi

## 🔧 Personalizzazioni Possibili

Puoi facilmente modificare:
- **Colori e stili**: modifica `app/match-viewer/page.module.css`
- **Layout**: riorganizza le sezioni in `app/match-viewer/page.tsx`
- **Dati visualizzati**: aggiungi nuove statistiche nello slice Redux
- **Animazioni**: aggiungi transizioni CSS personalizzate

## ⚡ Performance

- **Leggero**: solo aggiornamenti necessari tramite Redux selectors
- **Ottimizzato**: nessun polling, solo aggiornamenti event-driven
- **Responsive**: si adatta automaticamente alle dimensioni dello schermo
