---
title: Git et la sensibilité à la casse
lang: fr-FR
date: 2019-08-16 22:43
tags: [git, osx, windows]
hints: [ci, tests]
---

Plusieurs fois, je me suis fait avoir parce que je développe sous mac, 
et qu'il n'est pas sensible à la casse (`fOo` === `foo` === `FOO`). 

Dans le genre de cas où ça peut faire mal, je me suis rendu compte que sur un projet, 
la CI recréait les snapshots de tests à chaque fois car le container Docker (sous linux)
qui éxécutait les tests ne trouvait pas les fichiers, à cause d'une majuscule. 

Autant de tests qui ne servaient à rien, mais ne faisaient pas fail le build !

Un article donc sur comment renommer ses fichiers avec la prise en compte de git :
<url-preview url="https://blog.emmanuelgautier.fr/git-sensibilite-casse/" />
