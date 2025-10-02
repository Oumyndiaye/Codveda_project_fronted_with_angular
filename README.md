🛍️ GigaShop – Projet Full-Stack
Description

GigaShop est une application web pour vendre et acheter des articles.
Elle inclut :

Backend : Node.js + Express + MongoDB

Frontend : Angular

Authentification : JWT, création et connexion d’utilisateurs

CRUD complet pour les articles

Prérequis

Node.js v18 ou supérieur

Angular CLI

MongoDB installé localement

Installation
1. Cloner le projet
2. Installer les dépendances
Configuration MongoDB

1. Démarrer MongoDB en local.

2. Créer une base Test et un utilisateur root avec mot de passe root.

3. Vérifier que le backend peut se connecter :

Dans backend/app.js :
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://root:root@localhost:27017/Test?authSource=admin',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connexion MongoDB locale réussie !'))
.catch(err => console.log('Erreur de connexion :', err));

Lancer l’application
Backend
npm start

Frontend
ng serve
