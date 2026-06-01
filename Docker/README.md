# MindMap Book Writer - Version Docker

Application web en ASP.NET Core + Blazor WebAssembly pour l'écriture de livre basée sur une carte mentale.

## 📋 Prérequis

- Docker Desktop
- Docker Compose

## 🚀 Installation et démarrage

### Démarrage rapide
```bash
cd Docker
docker-compose up -d
```

L'application sera accessible à :
- **Interface web** : http://localhost:5001
- **API Backend** : http://localhost:5000

### Arrêt
```bash
docker-compose down
```

### Arrêt et suppression des données
```bash
docker-compose down -v
```

## 🏗️ Architecture

```
Docker/
├── Server/                  # Backend ASP.NET Core
│   ├── Controllers/         # API REST
│   │   └── BookController.cs
│   ├── Hubs/               # SignalR (temps réel)
│   │   └── BookHub.cs
│   ├── Services/           # Services métier
│   │   └── BookService.cs
│   └── Program.cs
├── Client/                  # Frontend Blazor WASM
│   ├── Pages/              # Pages Blazor
│   │   └── Index.razor
│   ├── Services/           # Services API
│   │   ├── BookApiService.cs
│   │   └── SignalRService.cs
│   └── wwwroot/            # Ressources statiques
├── Dockerfile              # Image Docker multi-stage
├── docker-compose.yml      # Orchestration
└── nginx.conf              # Configuration reverse proxy
```

## 🎨 Fonctionnalités

✅ **Application web** accessible depuis n'importe quel navigateur
✅ **Multi-utilisateurs** avec synchronisation temps réel (SignalR)
✅ **API REST** complète pour l'édition
✅ **Éditeur Markdown** dans le navigateur
✅ **Responsive** : fonctionne sur mobile et tablette
✅ **Containerisé** : déploiement simplifié

## 🔌 API REST

### Endpoints

#### GET `/api/book`
Récupère la structure complète du livre
```json
{
  "title": "Mon Livre",
  "chapters": [...]
}
```

#### POST `/api/book`
Sauvegarde la structure du livre
```json
{
  "title": "Mon Livre",
  "chapters": [...]
}
```

#### GET `/api/book/chapter/{chapterId}/scene/{sceneId}`
Récupère le contenu d'une scène (Markdown)

#### POST `/api/book/chapter/{chapterId}/scene/{sceneId}`
Sauvegarde le contenu d'une scène

### SignalR Hub `/bookhub`

**Événements** :
- `SendBookUpdate` : Notifie les autres clients d'une mise à jour de structure
- `SendSceneUpdate` : Notifie les autres clients d'une modification de scène

## 💾 Volumes Docker

Les données sont persistées dans un volume Docker :
```yaml
volumes:
  book-data:  # Contient book-structure.json et les fichiers .md
```

## 🚢 Déploiement en production

### Avec Docker Swarm
```bash
docker stack deploy -c docker-compose.yml mindmap-book
```

### Avec Kubernetes
```bash
# Créez les manifests K8s à partir du docker-compose
kompose convert
kubectl apply -f .
```

### Variables d'environnement

```bash
# Server
ASPNETCORE_URLS=http://+:5000
ASPNETCORE_ENVIRONMENT=Production

# Client (build-time)
API_BASE_URL=http://yourserver:5000
```

## 🔧 Développement

### Démarrage en mode développement
```bash
# Terminal 1 : Server
cd Docker/Server
dotnet watch run

# Terminal 2 : Client
cd Docker/Client
dotnet watch run
```

### Hot Reload
Les deux projets supportent le hot reload :
- **Server** : Rechargement automatique de l'API
- **Client** : Rechargement automatique du Blazor WASM

## 🌐 Accès distant

Pour accéder depuis d'autres machines du réseau :

1. Modifiez `docker-compose.yml` :
```yaml
services:
  server:
    ports:
      - "0.0.0.0:5000:5000"
  client:
    ports:
      - "0.0.0.0:5001:80"
```

2. Redémarrez :
```bash
docker-compose down
docker-compose up -d
```

3. Accédez via : `http://[IP-DU-SERVEUR]:5001`

## 📊 Monitoring

### Logs
```bash
# Logs en temps réel
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f server
docker-compose logs -f client
```

### Santé des conteneurs
```bash
docker-compose ps
```

## 🔒 Sécurité

⚠️ **Important pour la production** :
- Activez HTTPS
- Configurez l'authentification
- Restreignez les CORS
- Utilisez des variables d'environnement pour les secrets
- Activez les rate limits sur l'API

## 📄 Licence

MIT License - Voir LICENSE.txt
