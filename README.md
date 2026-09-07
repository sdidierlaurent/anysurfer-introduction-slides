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
| Secret | `IONOS_FTP_SERVER` | Nom d’hôte FTP fourni par IONOS, sans `ftp://` ni chemin |
| Secret | `IONOS_FTP_USERNAME` | Identifiant du compte FTP |
| Secret | `IONOS_FTP_PASSWORD` | Mot de passe du compte FTP |
| Variable | `IONOS_FTP_SERVER_DIR` | Dossier du site vu depuis le compte FTP, avec `/` final (par exemple `./intro/`, ou `./` si le compte pointe déjà sur le dossier du site) |
| Variable facultative | `IONOS_FTP_PROTOCOL` | `ftps` par défaut ; `ftp` si nécessaire selon le compte IONOS |
| Variable facultative | `IONOS_FTP_PORT` | `21` par défaut |
| Variable facultative | `SITE_URL` | URL publique du site, par exemple `https://formation.example.org` |
| Variable facultative | `BASE_PATH` | Chemin public si le site est dans un sous-dossier, par exemple `/intro/` ; `/` par défaut |

Le domaine IONOS doit pointer vers le dossier de destination choisi.
Le chemin FTP et le chemin public sont distincts : un dossier FTP `./intro/`
peut correspondre à la racine `/` du domaine.

Utiliser un compte compatible FTP/FTPS : cette action ne prend pas en charge SFTP.
La synchronisation suit les fichiers publiés via `.ftp-deploy-sync-state.json` ;
conserver ce fichier sur le serveur. Les fichiers précédemment déployés puis
retirés du build sont supprimés lors du déploiement suivant.

Documentation de l’action : [FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action).

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
