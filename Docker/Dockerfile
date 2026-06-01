# Stage 1: Build Server
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-server
WORKDIR /src

COPY ["Docker/Server/MindMapBookWriter.Server.csproj", "Server/"]
COPY ["Shared/MindMapBookWriter.Shared.csproj", "Shared/"]
RUN dotnet restore "Server/MindMapBookWriter.Server.csproj"

COPY Docker/Server/ Server/
COPY Shared/ Shared/
WORKDIR "/src/Server"
RUN dotnet build "MindMapBookWriter.Server.csproj" -c Release -o /app/build
RUN dotnet publish "MindMapBookWriter.Server.csproj" -c Release -o /app/publish

# Stage 2: Build Client
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-client
WORKDIR /src

COPY ["Docker/Client/MindMapBookWriter.Client.csproj", "Client/"]
COPY ["Shared/MindMapBookWriter.Shared.csproj", "Shared/"]
RUN dotnet restore "Client/MindMapBookWriter.Client.csproj"

COPY Docker/Client/ Client/
COPY Shared/ Shared/
WORKDIR "/src/Client"
RUN dotnet publish "MindMapBookWriter.Client.csproj" -c Release -o /app/publish

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
