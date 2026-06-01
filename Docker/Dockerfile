# Stage 1: Build Server
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-server
WORKDIR /src

# Copier tous les fichiers projet d'abord pour le restore
COPY ["Docker/Server/MindMapBookWriter.Server.csproj", "Docker/Server/"]
COPY ["Shared/MindMapBookWriter.Shared.csproj", "Shared/"]

# Restore des dépendances
WORKDIR /src/Docker/Server
RUN dotnet restore "MindMapBookWriter.Server.csproj"

# Copier tous les fichiers source
WORKDIR /src
COPY Docker/Server/ Docker/Server/
COPY Shared/ Shared/

# Build et publish
WORKDIR /src/Docker/Server
RUN dotnet publish "MindMapBookWriter.Server.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore \
    /p:UseAppHost=false

# Stage 2: Build Client
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-client
WORKDIR /src

# Copier tous les fichiers projet d'abord pour le restore
COPY ["Docker/Client/MindMapBookWriter.Client.csproj", "Docker/Client/"]
COPY ["Shared/MindMapBookWriter.Shared.csproj", "Shared/"]

# Restore des dépendances
WORKDIR /src/Docker/Client
RUN dotnet restore "MindMapBookWriter.Client.csproj"

# Copier tous les fichiers source
WORKDIR /src
COPY Docker/Client/ Docker/Client/
COPY Shared/ Shared/

# Build et publish
WORKDIR /src/Docker/Client
RUN dotnet publish "MindMapBookWriter.Client.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore \
    /p:UseAppHost=false

# Stage 3: Runtime Server
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime-server
WORKDIR /app
COPY --from=build-server /app/publish .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "MindMapBookWriter.Server.dll"]

# Stage 4: Runtime Client (Nginx)
FROM nginx:alpine AS runtime-client
COPY --from=build-client /app/publish/wwwroot /usr/share/nginx/html
COPY Docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
