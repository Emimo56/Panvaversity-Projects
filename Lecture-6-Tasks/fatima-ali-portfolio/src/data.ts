export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  tech: string[];
  category: 'uhg' | 'citi' | 'charter' | 'infoplus' | 'other';
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  category: 'languages' | 'frameworks' | 'databases' | 'cloud' | 'testing';
}

export interface InteractiveScenario {
  id: string;
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  roleLink: string; // matches experience id
}

export const experiences: Experience[] = [
  {
    id: 'uhg-2',
    role: 'Software Engineer',
    company: 'Aegis Healthcare Systems (Enterprise Team)',
    period: '10/2025 – Present',
    location: 'Remote',
    category: 'uhg',
    summary: 'Led enterprise-level microservice upgrades and architecture modernization, specializing in Spring Boot 4 transition and secure configurations.',
    tech: ['Java', 'Spring Boot 4', 'Spring Boot 3', 'MongoDB', 'Vault', 'Splunk', 'REST Client', '@Qualifier', 'MongoTemplate'],
    highlights: [
      'Led a critical Spring Boot 3 to 4 microservice migration, refactoring complex configurations and custom REST clients using Vault-based timeouts and @Qualifier annotations to secure and streamline enterprise transactions.'
    ]
  },
  {
    id: 'uhg-1',
    role: 'Software Engineer',
    company: 'Aegis Healthcare Systems (Enterprise Team)',
    period: '11/2024 – 10/2025',
    location: 'Remote',
    category: 'uhg',
    summary: 'Engineered scalable Kotlin backend services and high-throughput Apache Kafka event streaming solutions inside Kubernetes container environments.',
    tech: ['Spring Boot', 'Kotlin', 'Groovy', 'Apache Kafka', 'MongoDB Compass', 'Postman', 'Docker', 'Kubernetes', 'OpenLens', 'Offset Explorer'],
    highlights: [
      'Built reliable Kotlin microservices integrating Kubernetes sidecar containers and Apache Kafka event flows, implementing robust Groovy testing to guarantee zero-regression database persistence.'
    ]
  },
  {
    id: 'citi',
    role: 'Software Engineer',
    company: 'Apex Global Finance (Core Banking Systems)',
    period: '07/2022 – 10/2024',
    location: 'Onsite / Hybrid',
    category: 'citi',
    summary: 'Architected generic configuration-driven banking services integrated with automated testing pipelines and advanced MongoDB aggregations.',
    tech: ['Spring Boot', 'Spring Data MongoDB', 'MongoDB Compass', 'Selenium Java Client Library', 'Appium Java Client Library', 'Appium Inspector', 'Postman', 'Mockito', 'SLF4J', 'Aggregation Pipelines'],
    highlights: [
      'Architected a generalized, configuration-driven Spring Boot service communicating with 25+ external platforms via high-performance MongoDB aggregation pipelines and automated Selenium/Appium frameworks.'
    ]
  },
  {
    id: 'charter',
    role: 'Software Engineer',
    company: 'Spectrum Broadcom Corp (Voice & Video Systems)',
    period: '04/2020 – 06/2022',
    location: 'Silverwood, OR',
    category: 'charter',
    summary: 'Designed high-availability telecom provisioning APIs and device scrubbing services integrated with real-time billing validation.',
    tech: ['Java 8', 'Spring Boot', 'REST API', 'SOAP', 'React JS', 'Redux', 'JUnit', 'Mockito', 'Git', 'Bitbucket', 'Postman', 'Maven', 'HTML5', 'CSS3', 'JavaScript ES6', 'IntelliJ', 'Jenkins', 'Jira', 'Hibernate', 'Spring JPA', 'Spring MVC', 'Spring AOP'],
    highlights: [
      'Designed and engineered high-availability provisioning APIs for telecom Voice/Video systems, introducing an automated REST-based scrubbing service with real-time billing validations.'
    ]
  },
  {
    id: 'infoplus',
    role: 'Software Engineer Intern',
    company: 'LogiFlow Commerce Platforms',
    period: '06/2019 – 09/2019',
    location: 'Silverwood, OR',
    category: 'infoplus',
    summary: 'Built secure warehouse commerce inventory modules and integrated automated testing frameworks to improve platform stability.',
    tech: ['Java 8', 'Hibernate', 'JUnit', 'Git', 'Bitbucket', 'MySQL Workbench', 'SQLWorkbench', 'SourceTree', 'Jira', 'Bamboo', 'OpsGenie'],
    highlights: [
      'Developed high-quality inventory platform features using Java 8 and Hibernate, validating stability via comprehensive automated test coverages during user acceptance testing.'
    ]
  }
];

export const skills: Skill[] = [
  // Languages
  { name: 'Java (8 / 17 / 21)', level: 'Expert', category: 'languages' },
  { name: 'Kotlin', level: 'Advanced', category: 'languages' },
  { name: 'SQL', level: 'Expert', category: 'languages' },
  { name: 'Groovy', level: 'Advanced', category: 'languages' },
  { name: 'JavaScript (ES6+)', level: 'Advanced', category: 'languages' },
  { name: 'HTML5 & CSS3', level: 'Advanced', category: 'languages' },

  // Frameworks
  { name: 'Spring Boot (3.x / 4.x)', level: 'Expert', category: 'frameworks' },
  { name: 'Spring Data MongoDB', level: 'Expert', category: 'frameworks' },
  { name: 'Spring JPA / Hibernate', level: 'Expert', category: 'frameworks' },
  { name: 'Spring MVC & AOP', level: 'Advanced', category: 'frameworks' },
  { name: 'React JS & Redux', level: 'Intermediate', category: 'frameworks' },
  { name: 'REST API & SOAP', level: 'Expert', category: 'frameworks' },

  // Databases & Messaging
  { name: 'MongoDB & Compass', level: 'Expert', category: 'databases' },
  { name: 'MongoDB Aggregation', level: 'Expert', category: 'databases' },
  { name: 'Apache Kafka', level: 'Advanced', category: 'databases' },
  { name: 'MySQL', level: 'Advanced', category: 'databases' },
  { name: 'HashiCorp Vault', level: 'Advanced', category: 'databases' },

  // Cloud & Infrastructure
  { name: 'Kubernetes / OpenLens', level: 'Advanced', category: 'cloud' },
  { name: 'Docker', level: 'Advanced', category: 'cloud' },
  { name: 'Splunk Logs', level: 'Expert', category: 'cloud' },
  { name: 'Jenkins & Bamboo', level: 'Advanced', category: 'cloud' },
  { name: 'Git & Bitbucket', level: 'Expert', category: 'cloud' },
  { name: 'Maven', level: 'Expert', category: 'cloud' },

  // Testing & Automation
  { name: 'JUnit & Mockito', level: 'Expert', category: 'testing' },
  { name: 'Selenium WebDriver', level: 'Advanced', category: 'testing' },
  { name: 'Appium (Mobile Automation)', level: 'Advanced', category: 'testing' },
  { name: 'Appium Inspector', level: 'Advanced', category: 'testing' },
  { name: 'Groovy Spock Testing', level: 'Advanced', category: 'testing' },
  { name: 'Postman API Testing', level: 'Expert', category: 'testing' }
];

export const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'sc-1',
    title: 'Spring Boot Major Version Migration',
    problem: 'Upgrading complex enterprise systems from Spring Boot 3 to Spring Boot 4 without breaking custom REST clients, security contexts, database mappings, or runtime behavior.',
    solution: 'Independently navigated major breaking changes, refactored Custom Spring Beans using dynamic Vault-based settings, resolved bean injection conflict issues using custom @Qualifier attributes, and enforced environment-specific collections in MongoDB to isolate development flows.',
    techStack: ['Java 21', 'Spring Boot 4', 'MongoDB', 'Vault', '@Qualifier', 'Splunk'],
    roleLink: 'uhg-2'
  },
  {
    id: 'sc-2',
    title: 'Complex Data Transformations & Reporting',
    problem: 'Combining, parsing, and formatting response structures from 25+ distinct microservices and remote IoT devices to generate structured reports efficiently.',
    solution: 'Designed an agile microservice that read its API/UI parameters from a configuration collection. Instead of heavy Java memory loops, parsed and aggregated responses directly through custom multi-stage MongoDB aggregation pipelines, saving computational overhead.',
    techStack: ['Spring Boot', 'Spring Data MongoDB', 'MongoDB Aggregation Framework', 'SLF4J'],
    roleLink: 'citi'
  },
  {
    id: 'sc-3',
    title: 'Asynchronous Event Delivery & Verification',
    problem: 'Ensuring absolute reliability for publishing, consuming, and persisting highly sensitive asynchronous event messages across systems.',
    solution: 'Developed Kotlin microservices consuming Kafka events with custom headers. Monitored offsets with Offset Explorer, and simulated and tested failover conditions using file-drop simulations, verifying actual container state and logging in OpenLens.',
    techStack: ['Kotlin', 'Apache Kafka', 'Groovy Spock', 'Kubernetes (OpenLens)', 'Offset Explorer'],
    roleLink: 'uhg-1'
  },
  {
    id: 'sc-4',
    title: 'Automated Account Device Scrubbing',
    problem: 'Removing incorrect device-to-account associations that blocked customer provisioning, without risking accidental data loss for active accounts.',
    solution: 'Architected the "Scrub Device" REST API in Spectrum Broadcom\'s Service Activation Tool, building automated cross-checks against real-time billing databases to ensure no active paid services existed before executing the scrub routine.',
    techStack: ['Java 8', 'Hibernate / Spring JPA', 'REST API', 'Splunk', 'React / Redux'],
    roleLink: 'charter'
  },
  {
    id: 'sc-5',
    title: 'Warehouse Commerce Inventory Flow Stability',
    problem: 'Ensuring absolute stability and transaction consistency in multi-user inventory warehouse operations during peak order volumes.',
    solution: 'Designed and optimized warehouse database queries using Hibernate JPA, wrote comprehensive integration tests, and led user acceptance testing (UAT) to prevent race conditions and inventory mismatches.',
    techStack: ['Java 8', 'Hibernate', 'JUnit', 'MySQL Workbench', 'Bamboo'],
    roleLink: 'infoplus'
  }
];
