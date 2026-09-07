# Déploiements

- `.github/workflows/deploy.yml` publie sur GitHub Pages à chaque push sur `main`.
- `.github/workflows/deploy-ionos.yml` construit le site et transfère `dist/`
  vers IONOS à chaque push sur `release` ou une branche `release/*`
  (par exemple `release/1.0`, y compris les sous-branches).
- Ce même workflow déploie les branches `projet/*` dans un sous-dossier IONOS
  portant le nom du projet, créé automatiquement si nécessaire.
  Par exemple, `projet/sncb` publie dans `${IONOS_FTP_SERVER_DIR}sncb/`.
  Le nom du projet doit commencer par une lettre ou un chiffre et ne contenir
  que des lettres ASCII, chiffres, tirets ou underscores, sans sous-branche.

Chaque workflow peut aussi être lancé manuellement sur ses branches autorisées.
Les branches release publient toutes vers le même dossier IONOS, sans transferts
simultanés. La configuration Astro adapte les URL à la cible : préfixe du dépôt
pour GitHub Pages, `SITE_URL` et `BASE_PATH` pour IONOS.
Pour les branches projet, le nom du projet est aussi ajouté à `BASE_PATH` :
`projet/sncb` utilise `/sncb/` par défaut, ou `/intro/sncb/` si `BASE_PATH=/intro/`.
Les déploiements release et projet partagent la même configuration et sont
exécutés sans transferts simultanés.

## Configuration IONOS

Dans **Settings → Secrets and variables → Actions** du dépôt GitHub, ajouter :

| Type | Nom | Valeur |
| --- | --- | --- |
| Secret | `IONOS_FTP_SERVER` | Nom d’hôte SFTP fourni par IONOS, sans protocole ni chemin |
| Secret | `IONOS_FTP_USERNAME` | Identifiant du compte SFTP |
| Secret | `IONOS_FTP_PASSWORD` | Mot de passe du compte SFTP |
| Variable | `IONOS_FTP_SERVER_DIR` | Dossier du site vu depuis le compte FTP, avec `/` final (par exemple `./intro/`, ou `./` si le compte pointe déjà sur le dossier du site) |
| Variable facultative | `IONOS_FTP_PORT` | `22` par défaut (SFTP) |
| Variable facultative | `SITE_URL` | URL publique du site, par exemple `https://formation.example.org` |
| Variable facultative | `BASE_PATH` | Chemin public si le site est dans un sous-dossier, par exemple `/intro/` ; `/` par défaut |

Le domaine IONOS doit pointer vers le dossier de destination choisi.
Le chemin FTP et le chemin public sont distincts : un dossier FTP `./intro/`
peut correspondre à la racine `/` du domaine.

Le déploiement utilise **SFTP sur le port 22**, via `lftp`. FTPS est un autre
protocole et ne fonctionne pas sur ce port. Les noms `IONOS_FTP_*` sont conservés
pour réutiliser les secrets existants.

Le transfert ajoute et remplace les fichiers du build, sans supprimer les autres
fichiers du serveur.

Les valeurs du fichier `.env` local ne sont pas transmises à GitHub Actions :
configurer les secrets et variables dans les paramètres du dépôt.


# Astro Starter Kit: Basics

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |


## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build).
