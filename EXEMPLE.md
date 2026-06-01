# Exemple d'utilisation - MindMap Book Writer

## Scénario : Écrire un roman fantastique

Voici un exemple concret d'utilisation de MindMap Book Writer pour écrire un roman.

### 1. Structure initiale dans la carte mentale

```
📖 Les Chroniques d'Eloria
    |
    ├── 📚 Chapitre 1 - L'Éveil
    |       ├── 📝 Scène 1 - Le rêve étrange
    |       ├── 📝 Scène 2 - Le réveil brutal
    |       └── 📝 Scène 3 - La découverte du pendentif
    |
    ├── 📚 Chapitre 2 - Le Voyage
    |       ├── 📝 Scène 1 - Départ du village
    |       ├── 📝 Scène 2 - Rencontre avec le mage
    |       └── 📝 Scène 3 - L'attaque des ombres
    |
    └── 📚 Chapitre 3 - La Révélation
            ├── 📝 Scène 1 - Le temple ancien
            └── 📝 Scène 2 - La prophétie
```

### 2. Organisation des fichiers

Le logiciel créera automatiquement cette structure :

```
MonRoman/
├── chapter-001-L'Éveil/
│   ├── scene-001-Le rêve étrange.md
│   ├── scene-002-Le réveil brutal.md
│   └── scene-003-La découverte du pendentif.md
│
├── chapter-002-Le Voyage/
│   ├── scene-001-Départ du village.md
│   ├── scene-002-Rencontre avec le mage.md
│   └── scene-003-L'attaque des ombres.md
│
└── chapter-003-La Révélation/
    ├── scene-001-Le temple ancien.md
    └── scene-002-La prophétie.md
```

### 3. Exemple de contenu Markdown

**Fichier : `scene-001-Le rêve étrange.md`**

```markdown
# Le rêve étrange

*Scène du chapitre: L'Éveil*

---

Lyra se réveilla en sursaut, le front couvert de sueur. Les images du rêve 
étaient encore vivaces dans son esprit : une forêt sombre, un pendentif 
lumineux, et une voix qui l'appelait par un nom qu'elle ne connaissait pas.

**"Aelindra..."**

Ce nom résonnait encore dans ses oreilles. Qui était Aelindra ? Et pourquoi 
ce rêve lui semblait-il si *réel* ?

Elle jeta un coup d'œil par la fenêtre. L'aube se levait à peine sur le 
village de Valcrest. Tout semblait calme et ordinaire. Mais elle savait que 
quelque chose avait changé cette nuit.

> *"Les rêves sont parfois des portes vers d'autres mondes."*  
> — Proverbe ancien d'Eloria

Lyra ne croyait pas vraiment à ces vieilles légendes, mais après ce qu'elle 
venait de vivre...

---

## Notes de l'auteur

- Introduire le sentiment de mystère
- Établir le personnage de Lyra comme pragmatique mais curieuse
- Foreshadowing : le nom "Aelindra" sera révélé au chapitre 8
- Ambiance : aube, calme avant la tempête
```

### 4. Workflow de travail recommandé

#### Phase 1 : Planification (Carte mentale)
1. Créer tous les chapitres
2. Ajouter toutes les scènes sous chaque chapitre
3. Organiser visuellement pour voir la progression
4. Ajuster l'ordre si nécessaire

#### Phase 2 : Écriture (Éditeur)
1. Commencer par la scène 1 du chapitre 1
2. Écrire le contenu complet
3. Sauvegarder
4. Passer à la scène suivante

#### Phase 3 : Révision
1. Utiliser la carte mentale pour naviguer
2. Relire chaque scène
3. Ajuster le contenu
4. Resauvegarder

### 5. Astuces avancées

#### Utiliser les niveaux de titres Markdown

```markdown
# Titre de la scène (H1)
## Section importante (H2)
### Sous-section (H3)
```

#### Marquer des passages importants

```markdown
**Action importante**  
*Dialogue interne*  
> Citation ou flashback

---  
(séparateur de sections)
```

#### Ajouter des notes

```markdown
<!-- NOTE: Vérifier la chronologie avec le chapitre 5 -->
<!-- TODO: Développer la description du personnage -->
<!-- IDÉE: Peut-être ajouter un dialogue ici ? -->
```

#### Organiser avec des listes

```markdown
**Personnages présents dans cette scène:**
- Lyra (protagoniste)
- Le mage mystérieux
- Villageois (figurants)

**Éléments clés:**
1. Révélation du pendentif
2. Première rencontre avec la magie
3. Décision de partir en quête
```

### 6. Exemple de progression

**Jour 1 :** Structure complète du livre (20 chapitres, 60 scènes)  
**Jour 2-30 :** Écriture de 2 scènes par jour  
**Jour 31-40 :** Révision et ajustements  
**Jour 41-45 :** Polissage final

### 7. Intégration avec d'autres outils

Les fichiers Markdown peuvent être :
- **Versionnés** avec Git
- **Convertis** en PDF, EPUB avec Pandoc
- **Partagés** avec d'autres auteurs
- **Sauvegardés** automatiquement sur le cloud (Dropbox, OneDrive)
- **Édités** avec n'importe quel éditeur de texte

### 8. Export vers un format final

Pour compiler votre livre complet :

```powershell
# Installer Pandoc (outil de conversion)
# Puis combiner tous les chapitres :

$chapters = Get-ChildItem -Path "MonRoman" -Recurse -Filter "*.md" | Sort-Object FullName
$chapters | ForEach-Object { Get-Content $_.FullName } | Out-File "MonLivre-Complet.md"

# Convertir en PDF
pandoc MonLivre-Complet.md -o MonLivre.pdf

# Convertir en EPUB
pandoc MonLivre-Complet.md -o MonLivre.epub
```

## Avantages de cette approche

✅ **Visualisation claire** : La carte mentale permet de voir toute la structure d'un coup d'œil  
✅ **Flexibilité** : Facile de réorganiser chapitres et scènes  
✅ **Focus** : Une scène à la fois, pas de distraction  
✅ **Portabilité** : Fichiers Markdown simples et universels  
✅ **Version control** : Compatible avec Git pour suivre les modifications  
✅ **Backup facile** : Simple synchronisation de dossiers  
✅ **Pas de lock-in** : Vos données restent accessibles même sans l'application  

## Limitations à connaître

⚠️ **Pas de correcteur orthographique intégré** : Utilisez un outil externe ou l'export final  
⚠️ **Structure rigide chapitre/scène** : Convient mieux aux romans qu'aux essais  
⚠️ **Pas de formatage avancé** : Markdown de base uniquement  

---

Bonne écriture ! 🎭✍️
