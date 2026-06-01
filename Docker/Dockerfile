# Stage 1: Build Server
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-server
WORKDIR /src

# Copier les fichiers de projet en respectant la structure de dossiers
COPY ["Docker/Server/MindMapBookWriter.Server.csproj", "Docker/Server/"]
COPY ["Shared/MindMapBookWriter.Shared.csproj", "Shared/"]
RUN dotnet restore "Docker/Server/MindMapBookWriter.Server.csproj"

# Copier le reste des fichiers
COPY Docker/Server/ Docker/Server/
COPY Shared/ Shared/
WORKDIR "/src/Docker/Server"
RUN dotnet publish "MindMapBookWriter.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false --verbosity detailed

# Stage 2: Build Client
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-client
WORKDIR /src

# Copier les fichiers de projet en respectant la structure de dossiers
COPY ["Docker/Client/MindMapBookWriter.Client.csproj", "Docker/Client/"]
COPY ["Shared/MindMapBookWriter.Shared.csproj", "Shared/"]
RUN dotnet restore "Docker/Client/MindMapBookWriter.Client.csproj"

# Copier le reste des fichiers
COPY Docker/Client/ Docker/Client/
COPY Shared/ Shared/
WORKDIR "/src/Docker/Client"
RUN dotnet publish "MindMapBookWriter.Client.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime Server
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime-server
WORKDIR /app
COPY --from=build-server /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "MindMapBookWriter.Server.dll"]

# Stage 4: Runtime Client (Nginx)
FROM nginx:alpine AS runtime-client
COPY --from=build-client /app/publish/wwwroot /usr/share/nginx/html
COPY Docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
