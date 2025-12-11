# TODO: Completamento Esempi

Questo file documenta cosa serve per portare gli esempi a 50 per categoria.

## Stato attuale

✅ **Creational**: 15/50 esempi completati
✅ **Structural**: 15/50 esempi completati  
✅ **Behavioral**: 15/50 esempi completati

## Esempi da aggiungere

### Creational (35 esempi mancanti)

Pattern da approfondire con più varianti:
- **Singleton**: 2 esempi attuali → aggiungere cache Redis, pool di connessioni, gestore eventi
- **Factory Method**: 3 esempi attuali → aggiungere factory per UI widgets, parsers, serializers
- **Abstract Factory**: 2 esempi attuali → aggiungere factory per database drivers, API clients
- **Builder**: 5 esempi attuali → aggiungere query builders, form builders, HTML builders
- **Prototype**: 3 esempi attuali → aggiungere clone di grafici, configurazioni complesse

Nuovi contesti da esplorare:
- Social network (post, profili, feed)
- Gaming (personaggi, armi, livelli)
- IoT (sensori, dispositivi)
- Healthcare (cartelle cliniche, appuntamenti)
- Financial (transazioni, portafogli)

### Structural (35 esempi mancanti)

Pattern da approfondire:
- **Adapter**: 3 esempi attuali → aggiungere adapter per API REST/SOAP, formati dati
- **Composite**: 4 esempi attuali → aggiungere UI component tree, espressioni matematiche
- **Facade**: 3 esempi attuali → aggiungere facade per librerie complesse, subsystem
- **Proxy**: 4 esempi attuali → aggiungere virtual proxy, protection proxy, logging proxy
- **Decorator**: 4 esempi attuali → aggiungere stream decorators, UI enhancements
- **Bridge**: 1 esempio attuale → aggiungere separazione device/remote, shape/color
- **Flyweight**: 1 esempio attuale → aggiungere caratteri tipografici, particelle in giochi

Nuovi contesti:
- Rendering engines
- Plugin systems
- Middleware chains
- Multi-platform apps

### Behavioral (35 esempi mancanti)

Pattern da approfondire:
- **Observer**: 3 esempi attuali → aggiungere event bus, pub/sub systems
- **Strategy**: 3 esempi attuali → aggiungere sorting algorithms, validation strategies
- **Command**: 3 esempi attuali → aggiungere macro commands, transaction systems
- **State**: 3 esempi attuali → aggiungere workflow states, game states
- **Template Method**: 2 esempi attuali → aggiungere data processing pipelines
- **Iterator**: 2 esempi attuali → aggiungere tree traversal, filtered iterators
- **Mediator**: 2 esempi attuali → aggiungere air traffic control, UI coordinators
- **Chain of Responsibility**: 1 esempio attuale → aggiungere logging chain, validation chain

Nuovi contesti:
- Workflow automation
- Game AI
- Authentication/Authorization
- Data pipelines
- Event handling systems

## Guidelines per nuovi esempi

Quando aggiungi esempi, assicurati di:

1. **Variare i contesti**: Non ripetere troppo gli stessi domini
2. **Mantenere la brevità**: Max 20-30 righe di codice
3. **NO pattern names**: Non usare nomi espliciti nel codice
4. **Esempi realistici**: Preferisci casi d'uso pratici
5. **Spiegazioni chiare**: 2-4 frasi che collegano codice a definizione del pattern

## Template per nuovo esempio

```json
{
  "id": "categoria-##",
  "title": "Contesto - Problema specifico",
  "category": "creational|structural|behavioral",
  "code": "// Codice JavaScript ES6+\n// NO nomi pattern espliciti\n// Preferire const/let, arrow functions, classes",
  "solutionPattern": "Nome Pattern (in italiano)",
  "solutionExplanation": "Spiega PERCHÉ questo codice implementa il pattern. Riferimenti: (1) Tipo di problema risolto, (2) Meccanismo chiave, (3) Beneficio principale."
}
```

## Priorità

1. ⭐ Completare almeno 30 esempi per Creational (i più richiesti)
2. ⭐ Completare almeno 35 esempi per Behavioral (più varietà di pattern)
3. ⭐ Completare almeno 30 esempi per Structural

## Come contribuire

1. Copia il template sopra
2. Scegli un pattern e un contesto non ancora usato
3. Scrivi codice che usa il pattern SENZA nominarlo
4. Aggiungi al file JSON appropriato in `data/`
5. Testa l'esempio nell'app
6. Aggiorna questo file con il nuovo count

---

**Ultimo aggiornamento**: 15 esempi per categoria (45 totali)
