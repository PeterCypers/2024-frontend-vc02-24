# 2024-frontend-vc02-24

## Web-luik frontend voor SDP2 Groep VC02

Dit JavaScript repo zal werken als frontend server voor de Web applicatie van Delaware.

## de groepsleden:
- Tiemen Deroose
- Mohisha Van Damme
- Bas Stokmans
- Jasper Vandenbroucke
- Peter Cypers

## Requirements

- [NodeJS v20.6 or higher](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

Voor gebruikers van [Chocolatey](https://chocolatey.org/):

```powershell
choco install nodejs -y
choco install yarn -y
```

## Alvorens opstarten/testen van dit project

Maak een nieuwe `.env` (development) file aan met deze template.

```ini
VITE_API_URL=http://localhost:9000/api
```

## Project opstarten

- Installeer alle dependencies: `yarn`
- Maak een `.env` file aan (zie boven)
- Start de development server: `yarn dev`