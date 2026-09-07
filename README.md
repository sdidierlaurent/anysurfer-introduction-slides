# Déploiements

- `.github/workflows/deploy.yml` publie sur GitHub Pages à chaque push sur `main`.
- `.github/workflows/deploy-ionos.yml` construit le site et transfère `dist/`
  vers IONOS à chaque push sur `release` ou une branche `release/*`
  (par exemple `release/1.0`, y compris les sous-branches).

Chaque workflow peut aussi être lancé manuellement sur ses branches autorisées.
Les branches release publient toutes vers le même dossier IONOS, sans transferts
simultanés. La configuration Astro adapte les URL à la cible : préfixe du dépôt
pour GitHub Pages, `SITE_URL` et `BASE_PATH` pour IONOS.

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
pour réutiliser les secrets existants. L’ancienne variable `IONOS_FTP_PROTOCOL`
n’est plus utilisée et peut être supprimée.

Le transfert ajoute et remplace les fichiers du build, sans supprimer les autres
fichiers du serveur. L’ancien fichier `.ftp-deploy-sync-state.json` n’est plus utilisé.
La clé SSH du serveur est acceptée à la première connexion du runner ; un changement
pendant le job est refusé.

Les valeurs du fichier `.env` local ne sont pas transmises à GitHub Actions :
configurer les secrets et variables dans les paramètres du dépôt.

Documentation : [SFTP chez IONOS](https://www.ionos.fr/assistance/hebergement/configurer-et-gerer-lacces-ftp/transferer-des-fichiers-via-sftp-avec-filezilla/).

# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
