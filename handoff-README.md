# Learnova — pack visuel & règles (équipe native)

Version bêta, octobre 2026. Ce dossier est la base graphique pour React Native.
Les PNG ont déjà le fond transparent.

## Badges (`badges/`)

| Fichier | Sens | Où l’afficher |
|---|---|---|
| `verified.png` | Compte / enseignant vérifié par Learnova | Juste après le nom |
| `scan.png` | Alerte SCAN (beaucoup de signalements, revue en cours) | Sur le **groupe** en priorité, puis à côté du nom |
| `freeze.png` | Compte ou groupe gelé | Après le nom. Activités fermées, fiche encore visible |
| `ban.png` | Bannissement définitif | Après le nom. Groupe inaccessible |
| `flame.png` / `flame-sm.png` / `flame-md.png` / `flame-lg.png` | Streak élève | Juste après le nom |
| `shield.png` | Niveau de dépense | Sur le profil, **chiffre du niveau au centre du bouclier** |

### Flammes (activité consécutive)

Un jour compte si l’élève : quiz, ouvre un PDF, télécharge, rejoint un groupe, ou entre en compétition.

- **Spark** (petite) : 7 jours d’affilée → `flame-sm.png`
- **Flame** (moyenne, visuel fourni) : 21 jours → `flame-md.png`
- **Inferno** (grande) : 45 jours → `flame-lg.png`

Dès qu’un jour est manqué, le streak retombe à 0.

### Bouclier (dépense)

Le numéro s’affiche **dans** le bouclier.

- Niveau 0 : 0 L-Credits dépensés
- 1 : ≥ 50
- 2 : ≥ 150
- 3 : ≥ 400
- 4 : ≥ 1 000
- 5 : ≥ 2 500

### Modération (enseignants & groupes)

1. Signalements nombreux → **SCAN** (revue). Le groupe reste visible.
2. Revue en cours trop lourde → **freeze**. Plus d’activité, plus de paiement.
3. Infraction confirmée → **ban**. Groupe inaccessible. Les admins décident ensuite si l’enseignant est aussi banni.

SCAN n’est pas un ban. Freeze n’est pas un ban.

## Social (`social/`)

Facebook, WhatsApp, Telegram, globe (site), Snapchat, YouTube, Apple (app iOS à venir).

## Marque

- `logo-light.png` / `logo-dark.png`
- `nova.png` (mascotte)
- Couleurs : navy `#0B1F44`, gold `#C9A227`, cream `#F6F1E4`

## Explorer (navigation bêta)

Deux portes : **GCE** et **Concours (Pending)**.

GCE, filtres successifs : O Level / A Level → matière → année → session → type.

GCE = **deux PDF séparés**

- *GCE Past Questions* (souvent gratuit)
- *Answers to Past Questions* (accès à part)

Concours = **un seul PDF** *Entrance Exam (Concours) Past Questions and Answers* (branche encore Pending).

## Tokens

Voir `tokens.json` dans ce pack.
