# Crochet Library

Projet en cours de réalisation...
Accessible via le lien dans la section "About"

## Introduction
Pourquoi ce projet ?
Je cherchais une idée de projet me permettant d'aborder différentes notions back et front telles que : bases de données, CRUD, API, framework, ...

En tant que crocheteuse addict, j'ai des photos de mes projets stockées dans mon téléphone, des notes prises à la va-vite dans un carnet, des liens de pattern enregistrés sur mon navigateur ou sur mon téléphone. Concernant les fils utilisés ? La plupart du temps je ne m'en souviens plus ! Tout ça est bien éparpillé !

Il m'est donc venu l'idée de créer une interface me permettant de regrouper tout les informations par projet réalisé. Le but de cette interface est dans un premier temps de :
- Visualiser tous mes projets
- Ajouter des projets
- Modifier les informations
- Supprimer un projet

Concernant les évolutions, j'ai déjà quelques idées ! Mais concentrons nous d'abord sur l'essentiel !


## Stack
J'ai choisi d'utiliser les techno suivantes :
- BDD : 
    - PostgreSQL (Supabase)
    - Base de donnée relationnelle

- Back-end :
    - Node.js
    - Express
    - Library "pg" (requêtes SQL)

- Front-end :
    - Svelte
    - Cloudinary (CDN pour les photos)

Notes :
J'ai choisi d'utiliser Supabase uniquement pour stocker mes données et créer mes tables. Elle est connectée via une connection string au back

Voici un apercu de mes tables :
![](front/src/assets/img/bdd.png)



