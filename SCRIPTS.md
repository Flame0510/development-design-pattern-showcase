# Script Utili

Comandi rapidi per lavorare con il progetto.

## Sviluppo

```bash
# Installa dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev

# Build di produzione
npm run build

# Avvia in produzione
npm start

# Lint del codice
npm run lint
```

## Gestione Esempi

### Verifica integrità JSON

```bash
# Verifica che tutti i JSON siano validi
node -e "
  const fs = require('fs');
  ['creational', 'structural', 'behavioral'].forEach(cat => {
    try {
      const data = JSON.parse(fs.readFileSync(\`data/\${cat}.json\`, 'utf8'));
      console.log(\`✅ \${cat}.json: \${data.length} esempi\`);
    } catch (e) {
      console.error(\`❌ \${cat}.json: ERRORE\`, e.message);
    }
  });
"
```

### Conta esempi per pattern

```bash
node -e "
  const fs = require('fs');
  const files = ['creational', 'structural', 'behavioral'];
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(\`data/\${file}.json\`, 'utf8'));
    const patterns = {};
    
    data.forEach(ex => {
      const pattern = ex.solutionPattern;
      patterns[pattern] = (patterns[pattern] || 0) + 1;
    });
    
    console.log(\`\n📊 \${file.toUpperCase()}:\`);
    Object.entries(patterns)
      .sort(([,a], [,b]) => b - a)
      .forEach(([p, c]) => console.log(\`  \${p}: \${c}\`));
  });
"
```

### Trova ID duplicati

```bash
node -e "
  const fs = require('fs');
  const files = ['creational', 'structural', 'behavioral'];
  const allIds = new Set();
  const duplicates = [];
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(\`data/\${file}.json\`, 'utf8'));
    data.forEach(ex => {
      if (allIds.has(ex.id)) {
        duplicates.push(ex.id);
      }
      allIds.add(ex.id);
    });
  });
  
  if (duplicates.length > 0) {
    console.log('❌ ID duplicati trovati:', duplicates);
  } else {
    console.log('✅ Nessun ID duplicato');
  }
"
```

### Verifica campi obbligatori

```bash
node -e "
  const fs = require('fs');
  const files = ['creational', 'structural', 'behavioral'];
  const required = ['id', 'title', 'category', 'code', 'solutionPattern', 'solutionExplanation'];
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(\`data/\${file}.json\`, 'utf8'));
    data.forEach((ex, idx) => {
      required.forEach(field => {
        if (!ex[field]) {
          console.error(\`❌ \${file}.json[\${idx}]: campo '\${field}' mancante\`);
        }
      });
    });
  });
  
  console.log('✅ Verifica completata');
"
```

## Pulizia

```bash
# Rimuovi node_modules e file di build
rm -rf node_modules .next

# Reinstalla tutto
npm install
```

## Test manuale checklist

Prima di considerare l'app pronta:

- [ ] La pagina di setup mostra correttamente
- [ ] Il nome della squadra viene salvato
- [ ] Tutti e 4 i bottoni categoria sono visibili e cliccabili
- [ ] "Mostra esempio" carica un esempio random
- [ ] Il codice viene visualizzato correttamente
- [ ] "Rivela soluzione" mostra pattern e spiegazione
- [ ] "Round successivo" incrementa il numero del round
- [ ] Non vengono riproposti esempi già visti
- [ ] "Ricomincia da capo" resetta tutto
- [ ] Il localStorage persiste il nome squadra dopo refresh

## Deploy su Vercel

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy in produzione
vercel --prod
```

## Note sviluppo

### Hot reload
Next.js supporta hot reload automatico. Salva un file e vedrai i cambiamenti immediatamente.

### TypeScript
Se modifichi i tipi in `lib/types.ts`, TypeScript verificherà automaticamente la coerenza in tutta l'app.

### Aggiungere un pattern
1. Edita il file JSON appropriato in `data/`
2. Segui lo schema esistente
3. Salva il file
4. Ricarica la pagina (il JSON viene importato staticamente)

---

Per altre informazioni, consulta il [README.md](./README.md)
