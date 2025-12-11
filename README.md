# Design Pattern Trainer

Un'applicazione web interattiva per esercitazioni sui **Design Pattern GoF** (Gang of Four) durante workshop dal vivo.

## 🎯 Scopo dell'applicazione

L'app permette ai team di esercitarsi sui design pattern durante sessioni di training. Il docente può:
- Registrare il nome della squadra
- Scegliere la categoria di pattern (Creational, Structural, Behavioral o Tutte)
- Visualizzare esempi di codice JavaScript
- Rivelare la soluzione con il nome del pattern e la spiegazione

## 📋 Categorie di Pattern

### Creational (Creazionali)
- Singleton
- Factory Method
- Abstract Factory
- Builder
- Prototype

### Structural (Strutturali)
- Adapter
- Composite
- Facade
- Proxy
- Decorator
- Bridge
- Flyweight

### Behavioral (Comportamentali)
- Observer
- Strategy
- Command
- State
- Template Method
- Iterator
- Mediator
- Chain of Responsibility

## 🚀 Installazione e avvio

### Prerequisiti
- Node.js 18 o superiore
- npm o yarn

### Passaggi

1. **Installa le dipendenze**
   ```bash
   npm install
   ```

2. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

3. **Apri l'applicazione**
   
   Vai su [http://localhost:3000](http://localhost:3000)

## 📁 Struttura del progetto

```
├── app/
│   ├── layout.tsx          # Layout principale
│   ├── page.tsx            # Pagina principale con logica del flusso
│   ├── globals.css         # Stili globali
│   └── page.module.css     # Stili della pagina
├── components/
│   ├── TeamSetup.tsx       # Componente per inserire il nome del team
│   ├── RoundController.tsx # Gestisce round e selezione categoria
│   └── ExampleViewer.tsx   # Visualizza esempi e soluzioni
├── data/
│   ├── creational.json     # 15 esempi di pattern creazionali
│   ├── structural.json     # 15 esempi di pattern strutturali
│   └── behavioral.json     # 15 esempi di pattern comportamentali
├── lib/
│   ├── types.ts            # Definizioni TypeScript
│   └── examples.ts         # Helper per caricare e selezionare esempi
└── package.json
```

## 🎮 Come usare l'app

### 1. Setup iniziale
- Inserisci il nome della squadra
- Clicca "Inizia esercizio"

### 2. Durante un round
- Scegli una categoria (Creational, Structural, Behavioral o Tutte)
- Clicca "Mostra esempio"
- Analizza il codice JavaScript
- Clicca "Rivela soluzione" per vedere il pattern e la spiegazione
- Clicca "Round successivo" per continuare

### 3. Persistenza
- Il nome della squadra è salvato in `localStorage`
- Gli esempi già usati non vengono riproposti nella stessa sessione
- Per ricominciare da capo, clicca "Ricomincia da capo" in basso a destra

## 📝 Caratteristiche tecniche

### Stack tecnologico
- **Framework**: Next.js 15 (App Router)
- **Linguaggio**: TypeScript
- **Styling**: CSS Modules
- **Dati**: File JSON statici

### Pattern implementati nell'app stessa
Questa applicazione dimostra alcuni pattern GoF:
- **Strategy**: Selezione dinamica degli esempi in base alla categoria
- **Template Method**: Flusso di setup → round → visualizzazione
- **Iterator**: Navigazione attraverso gli esempi senza ripetizioni

## 🔧 Estendere l'applicazione

### Aggiungere nuovi esempi

Modifica i file JSON in `data/`:

```json
{
  "id": "creational-16",
  "title": "Titolo esempio",
  "category": "creational",
  "code": "// Codice JavaScript qui",
  "solutionPattern": "Nome del Pattern",
  "solutionExplanation": "Spiegazione del perché questo codice implementa il pattern"
}
```

**Regole importanti:**
- Non menzionare il pattern nel codice (nomi di classi, funzioni, commenti)
- Usa contesti concreti (pizzeria, hotel, giochi, e-commerce)
- Codice breve ma completo
- Spiegazione in italiano (2-4 frasi)

### Modificare i componenti

I componenti sono modulari e indipendenti:
- `TeamSetup`: Modifica il form di ingresso
- `RoundController`: Cambia la logica dei round
- `ExampleViewer`: Personalizza la visualizzazione del codice

## 📊 Esempi inclusi

Attualmente l'app include:
- ✅ **15 esempi Creational** (completamente implementati)
- ✅ **15 esempi Structural** (completamente implementati)
- ✅ **15 esempi Behavioral** (completamente implementati)
- 📝 **TODO**: Espandere a 50 esempi per categoria

### Temi degli esempi
- 🍕 Pizzeria e ristoranti
- 🏨 Hotel e servizi
- 🎮 Videogames
- 🛒 E-commerce
- 📱 Sistemi di notifiche
- 🏠 Smart home
- 💻 Sviluppo software
- 🌐 Networking

## 🏗️ Build per produzione

```bash
npm run build
npm start
```

L'app sarà disponibile su `http://localhost:3000`.

## 📚 Risorse utili

- [Design Patterns (GoF Book)](https://en.wikipedia.org/wiki/Design_Patterns)
- [Refactoring.Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [Next.js Documentation](https://nextjs.org/docs)

## 📄 Licenza

Questo progetto è stato creato per scopi educativi.

---

**Buon allenamento con i Design Pattern! 🚀**
