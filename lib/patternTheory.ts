/**
 * COMPONENT TYPE: Type Definition
 * SECTION: Data
 *
 * ROLE:
 * - Define all 23 GoF Design Patterns with complete theory
 * - Provide structured data for pattern theory pages
 * - Include intent, problem, solution, examples, and usage guidelines
 *
 * PATTERNS USED:
 * - Data Repository Pattern - Centralized pattern knowledge base
 * - Type Safety - Strong typing for all pattern properties
 *
 * NOTES FOR CONTRIBUTORS:
 * - Each pattern includes: intent, problem, solution, code examples, when to use, real-world cases
 * - Examples are in JavaScript/TypeScript for consistency
 * - Keep examples concise but realistic
 */

import React from 'react';
import { BuildOutlined, ToolOutlined, ThunderboltOutlined } from '@ant-design/icons';

export interface PatternTheory {
  id: string;
  name: string;
  category: 'creational' | 'structural' | 'behavioral';
  intent: string;
  problem: string;
  solution: string;
  structure: string; // Descrizione della struttura
  participants: string[]; // Classi/componenti coinvolti
  codeExamples: CodeExample[];
  realWorldExamples: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  relatedPatterns: string[];
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'javascript' | 'typescript';
}

export const PATTERN_CATEGORIES = {
  creational: {
    name: 'Creational Patterns',
    description: 'Patterns che si occupano della creazione di oggetti, rendendo il sistema indipendente da come gli oggetti vengono creati, composti e rappresentati.',
    icon: React.createElement(BuildOutlined),
    patterns: ['singleton', 'factory-method', 'abstract-factory', 'builder', 'prototype']
  },
  structural: {
    name: 'Structural Patterns',
    description: 'Patterns che si occupano della composizione di classi e oggetti per formare strutture più grandi.',
    icon: React.createElement(ToolOutlined),
    patterns: ['adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy']
  },
  behavioral: {
    name: 'Behavioral Patterns',
    description: 'Patterns che si occupano degli algoritmi e dell\'assegnazione delle responsabilità tra oggetti.',
    icon: React.createElement(ThunderboltOutlined),
    patterns: ['chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator', 'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor']
  }
};

export const patterns: Record<string, PatternTheory> = {
  // ==================== CREATIONAL PATTERNS ====================
  
  'singleton': {
    id: 'singleton',
    name: 'Singleton',
    category: 'creational',
    intent: 'Garantire che una classe abbia una sola istanza e fornire un punto di accesso globale ad essa.',
    problem: 'A volte è necessario che una classe abbia esattamente una sola istanza. Ad esempio, ci dovrebbe essere un solo oggetto per gestire la connessione al database, un solo logger di sistema, o un solo gestore di configurazione.',
    solution: 'Rendere la classe responsabile di tenere traccia della sua unica istanza. La classe impedisce la creazione di altre istanze intercettando le richieste di creazione e fornendo un metodo per accedere all\'istanza unica.',
    structure: 'Una classe con un costruttore privato, una variabile statica privata per contenere l\'istanza unica, e un metodo statico pubblico per ottenere l\'istanza.',
    participants: [
      'Singleton - definisce il metodo getInstance() che restituisce l\'istanza unica',
      'Instance - l\'istanza unica della classe Singleton'
    ],
    codeExamples: [
      {
        title: 'Singleton Classico',
        description: 'Implementazione base del pattern Singleton con lazy initialization.',
        code: `class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionString: string;

  private constructor() {
    this.connectionString = 'mongodb://localhost:27017';
    console.log('Database connection created');
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): void {
    console.log(\`Executing: \${sql}\`);
  }
}

// Utilizzo
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // true - stessa istanza`,
        language: 'typescript'
      },
      {
        title: 'Singleton con Module Pattern (JavaScript)',
        description: 'Approccio moderno usando i moduli JavaScript.',
        code: `// ConfigManager.js
class ConfigManager {
  constructor() {
    this.config = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3
    };
  }

  getConfig(key) {
    return this.config[key];
  }

  setConfig(key, value) {
    this.config[key] = value;
  }
}

// Esporta un'istanza unica
export default new ConfigManager();

// Utilizzo in altri file
import config from './ConfigManager';
console.log(config.getConfig('apiUrl'));`,
        language: 'javascript'
      }
    ],
    realWorldExamples: [
      'Database Connection Pool - Una sola istanza gestisce tutte le connessioni al database',
      'Logger di sistema - Un solo logger centralizzato per tutta l\'applicazione',
      'Configuration Manager - Configurazione globale accessibile ovunque',
      'Cache Manager - Una sola cache condivisa tra tutti i componenti',
      'Thread Pool - Gestione centralizzata dei thread worker'
    ],
    whenToUse: [
      'Quando deve esserci esattamente una sola istanza di una classe',
      'Quando l\'istanza deve essere accessibile da più parti del codice',
      'Quando l\'istanza unica dovrebbe essere estendibile tramite sottoclassi',
      'Per gestire risorse condivise (database, file, configurazioni)'
    ],
    whenNotToUse: [
      'Quando servono istanze multiple con stato diverso',
      'Quando rende difficile il testing (dependency injection è meglio)',
      'Quando crea accoppiamento stretto nel codice',
      'Quando viola il Single Responsibility Principle'
    ],
    relatedPatterns: ['Factory Method', 'Abstract Factory', 'Prototype']
  },

  'factory-method': {
    id: 'factory-method',
    name: 'Factory Method',
    category: 'creational',
    intent: 'Definire un\'interfaccia per creare un oggetto, ma lasciare che le sottoclassi decidano quale classe istanziare.',
    problem: 'Il codice diventa dipendente da classi concrete specifiche quando crea oggetti direttamente. Questo rende difficile estendere il sistema con nuovi tipi senza modificare il codice esistente.',
    solution: 'Definire un metodo factory in una classe base che le sottoclassi possono sovrascrivere per specificare quale tipo di oggetto creare. Il codice client lavora con l\'interfaccia del factory method, non con classi concrete.',
    structure: 'Una classe Creator astratta con un factory method astratto, e ConcreteCreator che implementano il metodo per creare istanze concrete.',
    participants: [
      'Creator - dichiara il factory method che restituisce un oggetto Product',
      'ConcreteCreator - sovrascrive il factory method per restituire un ConcreteProduct',
      'Product - interfaccia degli oggetti creati dal factory method',
      'ConcreteProduct - implementazione concreta di Product'
    ],
    codeExamples: [
      {
        title: 'Factory Method per Sistema di Notifiche',
        description: 'Creazione di diversi tipi di notifiche basate sul canale.',
        code: `// Product interface
interface Notification {
  send(message: string): void;
}

// Concrete Products
class EmailNotification implements Notification {
  send(message: string): void {
    console.log(\`Sending email: \${message}\`);
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log(\`Sending SMS: \${message}\`);
  }
}

class PushNotification implements Notification {
  send(message: string): void {
    console.log(\`Sending push notification: \${message}\`);
  }
}

// Creator
abstract class NotificationFactory {
  abstract createNotification(): Notification;

  notify(message: string): void {
    const notification = this.createNotification();
    notification.send(message);
  }
}

// Concrete Creators
class EmailNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new EmailNotification();
  }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new SMSNotification();
  }
}

// Utilizzo
const emailFactory = new EmailNotificationFactory();
emailFactory.notify('Your order has shipped!');

const smsFactory = new SMSNotificationFactory();
smsFactory.notify('Verification code: 123456');`,
        language: 'typescript'
      }
    ],
    realWorldExamples: [
      'Framework UI - Creazione di componenti diversi per piattaforme diverse (web, mobile, desktop)',
      'Sistema di logging - Diversi logger per console, file, database, cloud',
      'Parser di documenti - Factory per creare parser XML, JSON, CSV in base al tipo di file',
      'Connessioni database - Factory per creare connessioni MySQL, PostgreSQL, MongoDB',
      'Gestione pagamenti - Factory per creare processori Stripe, PayPal, Apple Pay'
    ],
    whenToUse: [
      'Quando non sai in anticipo quali tipi di oggetti dovrai creare',
      'Quando vuoi delegare la logica di creazione alle sottoclassi',
      'Quando vuoi fornire estensibilità ai tuoi utenti/library',
      'Quando vuoi localizzare la conoscenza delle classi concrete'
    ],
    whenNotToUse: [
      'Quando hai solo un tipo di oggetto da creare',
      'Quando la gerarchia di classi diventa troppo complessa',
      'Quando Simple Factory Pattern è sufficiente'
    ],
    relatedPatterns: ['Abstract Factory', 'Template Method', 'Prototype']
  },

  'abstract-factory': {
    id: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'creational',
    intent: 'Fornire un\'interfaccia per creare famiglie di oggetti correlati senza specificare le loro classi concrete.',
    problem: 'Quando devi creare famiglie di oggetti correlati che devono essere usati insieme (es. UI components per temi diversi), ma vuoi mantenere il codice indipendente dalle classi concrete.',
    solution: 'Dichiarare interfacce per ogni tipo di prodotto nella famiglia. Quindi dichiarare l\'abstract factory con metodi per creare ogni tipo di prodotto. Implementare concrete factory per ogni variante della famiglia.',
    structure: 'AbstractFactory con metodi per creare AbstractProduct, ConcreteFactory che creano ConcreteProduct, e client che usa solo interfacce.',
    participants: [
      'AbstractFactory - interfaccia per creare prodotti astratti',
      'ConcreteFactory - implementa operazioni per creare prodotti concreti',
      'AbstractProduct - interfaccia per un tipo di prodotto',
      'ConcreteProduct - implementazione di un prodotto, creata da una ConcreteFactory'
    ],
    codeExamples: [
      {
        title: 'Abstract Factory per UI Cross-Platform',
        description: 'Creazione di componenti UI per Windows e Mac.',
        code: `// Abstract Products
interface Button {
  render(): void;
  onClick(callback: () => void): void;
}

interface Checkbox {
  render(): void;
  toggle(): void;
}

// Concrete Products - Windows
class WindowsButton implements Button {
  render(): void {
    console.log('Rendering Windows button');
  }
  onClick(callback: () => void): void {
    console.log('Windows button clicked');
    callback();
  }
}

class WindowsCheckbox implements Checkbox {
  render(): void {
    console.log('Rendering Windows checkbox');
  }
  toggle(): void {
    console.log('Windows checkbox toggled');
  }
}

// Concrete Products - Mac
class MacButton implements Button {
  render(): void {
    console.log('Rendering Mac button');
  }
  onClick(callback: () => void): void {
    console.log('Mac button clicked');
    callback();
  }
}

class MacCheckbox implements Checkbox {
  render(): void {
    console.log('Rendering Mac checkbox');
  }
  toggle(): void {
    console.log('Mac checkbox toggled');
  }
}

// Abstract Factory
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete Factories
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Client code
function renderUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  
  button.render();
  checkbox.render();
}

// Utilizzo
const os = 'Windows'; // oppure 'Mac'
const factory = os === 'Windows' ? new WindowsFactory() : new MacFactory();
renderUI(factory);`,
        language: 'typescript'
      }
    ],
    realWorldExamples: [
      'UI Toolkit - Componenti diversi per tema dark/light o piattaforma Windows/Mac/Linux',
      'Database Access - Factory per creare Connection, Command, DataReader per DB diversi',
      'Documenti multi-formato - Factory per creare elementi PDF, HTML, DOC',
      'E-commerce - Factory per creare Payment, Shipping, Notification per diversi paesi',
      'Game Development - Factory per creare Enemy, Weapon, PowerUp per livelli diversi'
    ],
    whenToUse: [
      'Quando il sistema deve essere indipendente da come i prodotti sono creati',
      'Quando il sistema deve funzionare con diverse famiglie di prodotti',
      'Quando vuoi garantire che i prodotti di una famiglia siano usati insieme',
      'Quando vuoi fornire una libreria di prodotti rivelando solo le interfacce'
    ],
    whenNotToUse: [
      'Quando hai una sola famiglia di prodotti',
      'Quando aggiungere nuovi tipi di prodotti è raro',
      'Quando la gerarchia di factory diventa troppo complessa'
    ],
    relatedPatterns: ['Factory Method', 'Singleton', 'Prototype']
  },

  'builder': {
    id: 'builder',
    name: 'Builder',
    category: 'creational',
    intent: 'Separare la costruzione di un oggetto complesso dalla sua rappresentazione, permettendo allo stesso processo di costruzione di creare diverse rappresentazioni.',
    problem: 'Creare oggetti complessi con molti parametri opzionali può portare a costruttori telescopici (costruttori con troppi parametri) o a oggetti parzialmente inizializzati.',
    solution: 'Estrarre il codice di costruzione dell\'oggetto in un oggetto separato chiamato builder. Organizzare la costruzione in passi che possono essere chiamati in sequenza.',
    structure: 'Builder interface con metodi per costruire parti, ConcreteBuilder che implementa i passi, Director che definisce l\'ordine di costruzione, e Product come risultato finale.',
    participants: [
      'Builder - interfaccia astratta per creare parti del prodotto',
      'ConcreteBuilder - implementa i passi e tiene traccia della rappresentazione',
      'Director - costruisce l\'oggetto usando l\'interfaccia Builder',
      'Product - l\'oggetto complesso risultante'
    ],
    codeExamples: [
      {
        title: 'Builder per Query SQL',
        description: 'Costruzione fluida di query SQL complesse.',
        code: `class SQLQuery {
  private selectClause: string = '';
  private fromClause: string = '';
  private whereConditions: string[] = [];
  private orderByClause: string = '';
  private limitClause: string = '';

  toString(): string {
    let query = this.selectClause + ' ' + this.fromClause;
    
    if (this.whereConditions.length > 0) {
      query += ' WHERE ' + this.whereConditions.join(' AND ');
    }
    
    if (this.orderByClause) {
      query += ' ' + this.orderByClause;
    }
    
    if (this.limitClause) {
      query += ' ' + this.limitClause;
    }
    
    return query;
  }
}

class QueryBuilder {
  private query: SQLQuery;

  constructor() {
    this.query = new SQLQuery();
  }

  select(...columns: string[]): this {
    this.query['selectClause'] = \`SELECT \${columns.join(', ')}\`;
    return this;
  }

  from(table: string): this {
    this.query['fromClause'] = \`FROM \${table}\`;
    return this;
  }

  where(condition: string): this {
    this.query['whereConditions'].push(condition);
    return this;
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.query['orderByClause'] = \`ORDER BY \${column} \${direction}\`;
    return this;
  }

  limit(count: number): this {
    this.query['limitClause'] = \`LIMIT \${count}\`;
    return this;
  }

  build(): SQLQuery {
    return this.query;
  }
}

// Utilizzo
const query = new QueryBuilder()
  .select('name', 'email', 'age')
  .from('users')
  .where('age > 18')
  .where('active = true')
  .orderBy('name', 'ASC')
  .limit(10)
  .build();

console.log(query.toString());
// SELECT name, email, age FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10`,
        language: 'typescript'
      },
      {
        title: 'Builder per Oggetti Complessi',
        description: 'Costruzione di un hamburger con opzioni multiple.',
        code: `class Hamburger {
  constructor(
    public bun: string,
    public patty: string,
    public cheese?: string,
    public toppings: string[] = [],
    public sauces: string[] = []
  ) {}

  describe(): string {
    let description = \`\${this.bun} bun with \${this.patty} patty\`;
    if (this.cheese) description += \`, \${this.cheese} cheese\`;
    if (this.toppings.length) description += \`, toppings: \${this.toppings.join(', ')}\`;
    if (this.sauces.length) description += \`, sauces: \${this.sauces.join(', ')}\`;
    return description;
  }
}

class HamburgerBuilder {
  private bun: string = 'regular';
  private patty: string = 'beef';
  private cheese?: string;
  private toppings: string[] = [];
  private sauces: string[] = [];

  setBun(bun: string): this {
    this.bun = bun;
    return this;
  }

  setPatty(patty: string): this {
    this.patty = patty;
    return this;
  }

  addCheese(cheese: string): this {
    this.cheese = cheese;
    return this;
  }

  addTopping(topping: string): this {
    this.toppings.push(topping);
    return this;
  }

  addSauce(sauce: string): this {
    this.sauces.push(sauce);
    return this;
  }

  build(): Hamburger {
    return new Hamburger(
      this.bun,
      this.patty,
      this.cheese,
      this.toppings,
      this.sauces
    );
  }
}

// Utilizzo
const burger = new HamburgerBuilder()
  .setBun('sesame')
  .setPatty('chicken')
  .addCheese('cheddar')
  .addTopping('lettuce')
  .addTopping('tomato')
  .addTopping('onion')
  .addSauce('mayo')
  .addSauce('ketchup')
  .build();

console.log(burger.describe());`,
        language: 'typescript'
      }
    ],
    realWorldExamples: [
      'StringBuilder in Java - costruzione efficiente di stringhe',
      'HTTP Request Builders - librerie come Axios, Fetch per costruire richieste',
      'Form Builders - costruzione di form HTML complessi',
      'Document Builders - creazione di PDF, Word, Excel con configurazioni complesse',
      'Configuration Builders - costruzione di oggetti di configurazione (webpack, babel)'
    ],
    whenToUse: [
      'Quando un oggetto ha molti parametri opzionali nel costruttore',
      'Quando vuoi creare diverse rappresentazioni dello stesso oggetto',
      'Quando la costruzione richiede passi complessi',
      'Quando vuoi isolare il codice di costruzione dalla logica business'
    ],
    whenNotToUse: [
      'Quando l\'oggetto è semplice con pochi parametri',
      'Quando tutti i parametri sono obbligatori',
      'Quando la complessità del builder non è giustificata'
    ],
    relatedPatterns: ['Abstract Factory', 'Composite', 'Singleton']
  },

  'prototype': {
    id: 'prototype',
    name: 'Prototype',
    category: 'creational',
    intent: 'Specificare i tipi di oggetti da creare usando un\'istanza prototipale e creare nuovi oggetti copiando questo prototipo.',
    problem: 'Creare nuovi oggetti identici o simili a oggetti esistenti può essere costoso. Inoltre, il codice non dovrebbe dipendere dalle classi concrete degli oggetti da copiare.',
    solution: 'Delegare il processo di clonazione agli oggetti stessi. Dichiarare un\'interfaccia comune per tutti gli oggetti che supportano la clonazione.',
    structure: 'Prototype interface con metodo clone(), ConcretePrototype che implementa clone(), e client che clona invece di creare nuove istanze.',
    participants: [
      'Prototype - dichiara l\'interfaccia per clonare se stesso',
      'ConcretePrototype - implementa l\'operazione di clonazione',
      'Client - crea nuovi oggetti chiedendo a un prototipo di clonarsi'
    ],
    codeExamples: [
      {
        title: 'Prototype per Clonazione Oggetti',
        description: 'Sistema di clonazione per configurazioni di gioco.',
        code: `interface Prototype {
  clone(): Prototype;
}

class GameCharacter implements Prototype {
  constructor(
    public name: string,
    public health: number,
    public armor: number,
    public weapons: string[],
    public skills: Map<string, number>
  ) {}

  clone(): GameCharacter {
    // Deep clone degli array e Map
    const clonedWeapons = [...this.weapons];
    const clonedSkills = new Map(this.skills);
    
    return new GameCharacter(
      this.name,
      this.health,
      this.armor,
      clonedWeapons,
      clonedSkills
    );
  }

  display(): string {
    return \`\${this.name}: HP=\${this.health}, Armor=\${this.armor}\`;
  }
}

// Prototipi predefiniti
const warriorPrototype = new GameCharacter(
  'Warrior',
  100,
  50,
  ['Sword', 'Shield'],
  new Map([['Strength', 10], ['Defense', 8]])
);

const magePrototype = new GameCharacter(
  'Mage',
  70,
  20,
  ['Staff', 'Spellbook'],
  new Map([['Intelligence', 10], ['Mana', 100]])
);

// Creazione di nuovi personaggi clonando i prototipi
const player1 = warriorPrototype.clone();
player1.name = 'Aragorn';

const player2 = magePrototype.clone();
player2.name = 'Gandalf';
player2.skills.set('Wisdom', 15);

console.log(player1.display());
console.log(player2.display());

// I prototipi originali non sono stati modificati
console.log(warriorPrototype.display());
console.log(magePrototype.display());`,
        language: 'typescript'
      },
      {
        title: 'Prototype con Object.create (JavaScript)',
        description: 'Approccio nativo JavaScript per prototypal inheritance.',
        code: `// Prototipo base
const carPrototype = {
  wheels: 4,
  engine: 'V6',
  
  start() {
    console.log(\`Starting \${this.brand} with \${this.engine} engine\`);
  },
  
  clone() {
    return Object.create(this);
  }
};

// Creazione di nuove auto dal prototipo
const car1 = Object.create(carPrototype);
car1.brand = 'Toyota';
car1.model = 'Camry';

const car2 = Object.create(carPrototype);
car2.brand = 'Honda';
car2.model = 'Accord';
car2.engine = 'V8'; // Override

car1.start(); // Starting Toyota with V6 engine
car2.start(); // Starting Honda with V8 engine

// Modifica del prototipo si riflette su tutti gli oggetti
carPrototype.wheels = 6;
console.log(car1.wheels); // 6
console.log(car2.wheels); // 6`,
        language: 'javascript'
      }
    ],
    realWorldExamples: [
      'JavaScript Object.create() - creazione di oggetti da prototipi',
      'Game Development - clonazione di nemici, armi, power-up con statistiche simili',
      'Editor grafici - duplicazione di forme, simboli, template',
      'Configuration Management - clonazione di configurazioni base per ambienti diversi',
      'Document Templates - clonazione di template email, report, contratti'
    ],
    whenToUse: [
      'Quando il costo di creazione di un nuovo oggetto è maggiore della clonazione',
      'Quando vuoi evitare gerarchie di factory',
      'Quando le istanze di una classe possono avere solo poche combinazioni di stato',
      'Quando vuoi nascondere la complessità della creazione al client'
    ],
    whenNotToUse: [
      'Quando la clonazione è complessa (oggetti con riferimenti circolari)',
      'Quando gli oggetti non hanno molte proprietà da copiare',
      'Quando deep cloning è costoso o difficile da implementare'
    ],
    relatedPatterns: ['Abstract Factory', 'Composite', 'Decorator']
  },

  // Continua con altri pattern...
  // Per brevità, aggiungo solo la struttura base per gli altri pattern
  // Possiamo espanderli progressivamente nei prossimi task

  'adapter': {
    id: 'adapter',
    name: 'Adapter',
    category: 'structural',
    intent: 'Convertire l\'interfaccia di una classe in un\'altra interfaccia che i client si aspettano. Adapter permette a classi di lavorare insieme che altrimenti non potrebbero a causa di interfacce incompatibili.',
    problem: 'Hai bisogno di usare una classe esistente, ma la sua interfaccia non è compatibile con il resto del tuo codice.',
    solution: 'Creare una classe adapter che funge da wrapper, traducendo le chiamate dal client all\'interfaccia della classe esistente.',
    structure: 'Client chiama metodi su Adapter, che delega le chiamate a Adaptee con interfaccia incompatibile.',
    participants: ['Target', 'Adapter', 'Adaptee', 'Client'],
    codeExamples: [],
    realWorldExamples: [
      'Integrazione API di terze parti',
      'Legacy code integration',
      'Database adapters',
      'Payment gateway adapters'
    ],
    whenToUse: ['Quando vuoi usare una classe esistente ma la sua interfaccia non corrisponde'],
    whenNotToUse: ['Quando puoi modificare direttamente la classe originale'],
    relatedPatterns: ['Bridge', 'Decorator', 'Proxy']
  },

  // Aggiungeremo tutti gli altri 17 pattern nei prossimi step
};

// Funzioni helper
export function getPatternsByCategory(category: 'creational' | 'structural' | 'behavioral'): PatternTheory[] {
  return Object.values(patterns).filter(p => p.category === category);
}

export function getPatternById(id: string): PatternTheory | undefined {
  return patterns[id];
}

export function getAllPatterns(): PatternTheory[] {
  return Object.values(patterns);
}
