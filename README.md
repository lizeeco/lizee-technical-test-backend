# Test technique backend Lizee

## Description
Il s'agit d'une API simple qui permet de gérer des commandes pour une marque. La stack est: NestJS + TypeORM + Postgres.

En travaillant sur cet exercice, pense à :
- la lisibilité
- la maintenabilité
- les tests unitaires
- la gestion d'erreurs
- la gestion des corner-cases

## Questions

Le but est de développer toutes les fonctionnalités demandées par les questions suivantes. Tu pourras me poser des questions en direct si ce n'est pas clair, si tu veux des précisions ou si tu veux de l'aide.

- La fonction createOrder ainsi que son test laissent un peu à désirer, quels problèmes vois-tu et comment les résoudre ?
- D'ailleurs, il n'est pas possible de choisir la quantité de produits lorsqu'on passe une commande (par exemple 2 t-shirts et 3 robes), comment pourrais-tu ajouter cela ?
- Finalement notre super SaaS sera développé en marque blanche. Nous allons donc devoir gérer plusieurs marques. Aujourd'hui, cette API n'a pas notion de marques. Comment pourrais-tu ajouter cette notion ?
- Il faudrait ajouter une API de gestion de catalogue de produits, en particulier, on aimerait pouvoir supprimer un produit du catalogue (c'est-à-dire qu'il ne serait plus disponible à la vente, mais les commandes passées précédemment resteraient inchangées). Comment ferais-tu ?

Il n'y a pas de bonne ou mauvaise réponse, l'objectif est de voir comment tu réfléchis et comment tu justifies tes choix (même si certaines réponses sont plus bonnes que d'autres 😉).

Attention, tu n'as pas à te préoccuper de tout ce qui est authentification, tests E2E, etc. On veut juste voir comment tu réfléchis et comment tu codes.

Si tu as des remarques quelconques sur le code, sur des choses que tu ajouterais, que tu ferais différemment etc. Note-les pour m'en parler pendant l'entretien, on ne les développera pas forcément mais ça m'intéresse !

## Requirements
- Docker / Docker compose
- Node.js 18
- Yarn

## Installation
```bash
$ yarn
```

## Running the app
Start, do the migrations, and seed the database :
```bash
$ yarn init-project
```

Then you can start the server with :
```bash
# watch mode
$ yarn start:dev

# dev mode
$ yarn start
```

## Testing

Only unit tests will be runned, no integration tests are available for now.
```bash
# unit tests
$ yarn test
```

## Migrations
When you update the entities, you need to generate a new migration file using TypeORM CLI. In order to make this easier, you can use the following command :
```bash
$ migrationName=<name> yarn migration:generate
```